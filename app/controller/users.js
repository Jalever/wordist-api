'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');

class UsersController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      accesstoken: 'string',
      title: 'string',
      tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
      content: 'string',
    };
  }

  async getAllUsers() {
    const { ctx, app, config } = this;
    const token = ctx.header.authorization;

    if (token) {
      const payload = await app.jwt.verify(
        token.split(' ')[1],
        config.jwt.secret
      ); // // 解密，获取payload
      const users = await ctx.service.users.getAllUsers();
      ctx.body = {
        payload,
        data: users,
      };
    } else {
      ctx.body = {
        message: 'token 错误',
        code: -1,
      };
    }
  }

  // 注册
  async register() {
    const { ctx } = this;
    const { username, password, phone } = ctx.request.body;
    const avatar = ctx.request.files ? ctx.request.files[0] : undefined;
    // 默认头像
    let filepathNew =
      this.config.baseDir + '\\app\\public\\avatar\\default.jpg';
    // 如果用户上传了头像
    if (avatar) {
      console.log('file:%j', avatar);
      const filenameNew =
        ctx.helper.uuid() + '.' + avatar.filename.split('.').pop();
      filepathNew =
        this.config.baseDir + '\\app\\public\\avatar\\' + filenameNew;
      // 把临时文件剪切到新目录去
      await fs.rename(avatar.filepath, filepathNew);
    }

    const nowTime = new Date();
    const userNew = {
      username,
      password,
      phone,
      avatar_url: filepathNew.split('\\app')[1],
      create_time: nowTime,
      update_time: nowTime,
    };

    const flag = await ctx.service.users.register(userNew);
    if (flag) {
      // 设置 Session
      ctx.session.user = { username };
      ctx.cookies.set('avatarUrl', userNew.avatar_url, { httpOnly: false });
      ctx.body = {
        code: 'Y',
        message: '注册成功！',
        data: [],
      };
      // ctx.redirect('/');
    } else {
      ctx.body = {
        code: 'N',
        message: '用户名已存在！',
        data: [],
      };
    }
  }

  // 登录
  async login() {
    const { ctx, app, config } = this;
    // ctx.logger.info('req body:: %j', ctx.request.body);
    const { username, password, rememberMe } = ctx.request.body;

    const userToken = {
      username,
      password,
    };

    const token = app.jwt.sign(userToken, config.jwt.secret, {
      expiresIn: '1h', // 60*60*1000
    }); // token签名

    const user = await ctx.service.users.login(username, password);
    if (!user) {
      ctx.body = {
        code: 'N',
        message: '用户名或密码错误！',
      };
    } else {
      // 设置 Session
      ctx.session.user = { username: user.username };
      ctx.cookies.set('avatarUrl', user.avatar_url, { httpOnly: false });
      // 如果用户勾选了 `记住我`，设置 的过期时间
      if (rememberMe * 1) ctx.session.maxAge = this.config.rememberMe;

      ctx.body = {
        code: 'Y',
        message: '登录成功！',
        data: {
          ...user,
          token: `Bearer ${token}`,
        },
      };
      // ctx.redirect('/');
    }
  }
}

module.exports = UsersController;
