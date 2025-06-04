#!/usr/bin/env bash
set -euo pipefail

# MagicMirror installer

echo "[1/8] Updating system..."
sudo apt-get update && sudo apt-get upgrade -y

echo "[2/8] Installing dependencies..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git build-essential

MM_DIR="$HOME/MagicMirror"
if [ ! -d "$MM_DIR" ]; then
  echo "[3/8] Cloning MagicMirror..."
  git clone https://github.com/MichMich/MagicMirror.git "$MM_DIR"
fi

cd "$MM_DIR"

echo "[4/8] Installing MagicMirror dependencies..."
npm install

MODULES=(
  MMM-MLB-Scoreboard
  MMM-MyCommute
  MMM-GoogleMapsTraffic
  MMM-GoogleCalendar
  MMM-Jast
  MMM-MTG
  MMM-Wallpaper
  MMM-WeatherChart
)

for MODULE in "${MODULES[@]}"; do
  if [ ! -d "modules/$MODULE" ]; then
    echo "[5/8] Installing $MODULE..."
    git clone "https://github.com/$MODULE/$MODULE.git" "modules/$MODULE" || \
      git clone "https://github.com/jclarke0000/$MODULE.git" "modules/$MODULE" || true
    [ -f "modules/$MODULE/package.json" ] && (cd "modules/$MODULE" && npm install)
  fi
done

cp "$OLDPWD/config/config.js" config/config.js || true
cp "$OLDPWD/css/custom.css" css/custom.css || true
cp "$OLDPWD/.env.example" .env

if ! command -v pm2 >/dev/null; then
  echo "[6/8] Installing PM2..."
  sudo npm install -g pm2
fi

echo "[7/8] Setting up PM2..."
cat > ecosystem.config.js <<EOC
module.exports = {
  apps: [
    {
      name: 'magicmirror',
      script: 'npm',
      args: 'start',
      cwd: '$MM_DIR',
      autorestart: true,
      restart_delay: 5000,
    },
  ],
};
EOC
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u "$USER" --hp "$HOME"

CONFIG=/boot/config.txt
if ! grep -q "display_hdmi_rotate=1" "$CONFIG"; then
  echo "[8/8] Setting display rotation..."
  echo 'display_hdmi_rotate=1' | sudo tee -a "$CONFIG"
fi

echo "Installation complete. Reboot recommended."
