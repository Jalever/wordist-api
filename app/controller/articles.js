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
    ctx.body = result;
  }

  // POST: 创建
  create() {
    const { ctx } = this;

    // console.warn('ctx: ');
    // console.log(ctx);
    // console.warn('ctx.request.body: ');
    // console.log(ctx.request.body);
    // console.log("\n");

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
