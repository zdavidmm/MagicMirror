# MagicMirror Setup

This repo contains configuration files and helper scripts to run MagicMirror² on a
Raspberry Pi in portrait mode. It includes several useful modules out of the box
and a one-command installer.

## Hardware prerequisites

- Raspberry Pi with Raspberry Pi OS Lite flashed to an SD card.
- Display connected via HDMI (rotated for portrait with `display_hdmi_rotate=1`).
- Network access for installing dependencies and fetching external data.

## Quick start

Run the installer on a fresh Raspberry Pi OS installation:

```bash
curl -L https://example.com/install.sh | bash
```

This script updates the OS, installs Node 20 LTS, clones MagicMirror and modules,
and sets everything up under PM2 so it runs on boot.

## Configuration

1. Copy `.env.example` to `.env` and fill in your API keys:
   - `GOOGLE_MAPS_API_KEY`
   - `OPENWEATHER_API_KEY`
2. Tweak any module settings in `config/config.js`.
3. Customize styles in `css/custom.css`.

## Module layout (portrait)

- Clock
- MLB Dodgers scoreboard
- Commute times (home to Microsoft RTC and Dad's)
- Weather chart
- Calendar events
- Daily Magic: The Gathering card
- JaST stock ticker (MSFT/TQQQ/QQQ)
- Google Maps traffic mini-map
- Full-screen rotating wallpaper (Bing)

Positions can be changed in `config/config.js`.

## Display rotation

If your monitor is mounted upside-down, set `display_hdmi_rotate=3` in
`/boot/config.txt` instead of `1`.

## Development

- `install.sh` is shellcheck compliant.
- JavaScript is linted with ESLint using `.eslintrc.json`.
- Prettier manages code formatting via `.prettierrc`.

MIT License. See `LICENSE` for details.
