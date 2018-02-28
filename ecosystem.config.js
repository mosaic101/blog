module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : 'blog',
      script    : 'src/bin/www',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'ubuntu',
      host : 'xxxxxxxxxxx',
      ref  : 'origin/master',
      repo : 'https://www.github.com/mosaic101/blog.git',
      path : '/home/ubuntu/data',
      'post-deploy' : 'cnpm install && pm2 reload ecosystem.config.js --env test'
    }
  }
}
