/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  return {
    keys: appInfo.name + '_jaleverchen',
    jwt: {
      secret: '123456', // 自己设置的值
      getToken(ctx) {
        if (
          ctx.headers.authorization &&
          (ctx.headers.authorization.split(' ')[0] === 'Bearer' ||
          ctx.headers.authorization.split(' ')[0] === 'Token')
        ) {
          return ctx.headers.authorization.split(' ')[1];
        } else if (ctx.query && ctx.query.token) {
          return ctx.query.token;
        }
        return null;
      },
    },
    middleware: [ 'errorHandler', 'auth' ],
    rememberMe: 20 * 1000, // 选择记住我之后，session有效时长24 * 60 * 60 * 1000
    errorHandler: {
      match: '/api',
    },
    // 权限限制
    auth: {
      // noAuth节点配置的是无需验权就能访问的path
      noAuth: [ '/login.htm', '/api/user/login', '/register.htm', '/api/user/register' ],
      // noPermission节点配置的是各个角色无权限访问的path
      noPermission: {
        admin: [],
        manager: [ '/admin' ],
        user: [ '/admin', '/edit' ],
      },
    },
    cluster: {
      listen: {
        port: 7001,
        hostname: '127.0.0.1',
      },
    },
    security: {
      csrf: false,
      ctoken: false,
      domainWhiteList: [ 'http://127.0.0.1:7001', 'http://192.168.1.101:7001' ],
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    mysql: {
      // 单数据库信息配置
      client: {
        host: 'jalever.top', // host
        port: '3306', // 端口号
        user: 'root2', // 用户名
        password: 'root2root2', // 密码
        database: 'jaleverDB', // 数据库名
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    logger: {
      appLogName: `${appInfo.name}-web.log`,
      coreLogName: 'egg-web.log',
      agentLogName: 'egg-agent.log',
      errorLogName: 'common-error.log',
    },
  };
};
