module.exports = {
  apps: [
    {
      name: 'magicmirror',
      script: 'npm',
      args: 'start',
      cwd: process.env.MM_DIR || `${process.env.HOME}/MagicMirror`,
      autorestart: true,
      restart_delay: 5000,
    },
  ],
};
