module.exports = {
  apps: [
    {
      name: "use-global-state",
      script: "npm",
      args: "start",
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      env_production: {
        NODE_ENV: "production",
        PORT: 6789,
      },
    },
  ],
};
