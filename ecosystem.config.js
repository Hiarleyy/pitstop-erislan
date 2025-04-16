module.exports = {
    apps: [
      {
        name: 'Insilico-deploy',
        script: 'app.js'
      }
    ],
    deploy: {
      production: {
        user: 'node',
        host: 'seu-host',
        ref: 'origin/main',
        repo: 'git@github.com:seu-usuario/seu-repo.git',
        path: '/var/www/insilico',
        'post-deploy': 'npm install && pm2 reload ecosystem.config.js --only Insilico-deploy'
      }
    }
  };
  