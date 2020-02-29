'use strict';

const Controller = require('egg').Controller;

class ArticlesController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  // 获取全部articles数据
  async all() {
    const { ctx } = this;

    const result = await ctx.service.articles.all();
    ctx.body = {
      code: '',
      message: '',
      data: result,
    };
  }

  // 创建
  create() {
    const { ctx } = this;

    ctx.validate(
      {
        title: {
          type: 'string',
          format: /\d+/,
          required: true,
        },
      },
      ctx.request.body
    );

    const result = ctx.service.articles.create(ctx.request.body);
    ctx.body = {
      code: '',
      message: result,
      data: [],
    };
  }
}

module.exports = ArticlesController;
