module.exports = {
  apps : [{
    name: 'fullstack-demo',
    // 指定解释器
    interpreter: './node_modules/.bin/ts-node',
    // 解释器参数 -P 表示项目路径，会自动使用项目的 tsconfig.json
    interpreter_args: '-r tsconfig-paths/register',
    script: 'bin/index.ts',
    cwd: "./",

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    watch: [
      "src",
      "bin",
      "app.ts"
    ],
    ignore_watch: [
      "node_modules",
      "logs",
      "public"
    ],
    instances: -1,
    exec_mode: "cluster",
    autorestart: true,
    restart_delay: 60,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    out_file: "./logs/pm2/app.log",
    error_file: "./logs/pm2/err.log"
  }],

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
