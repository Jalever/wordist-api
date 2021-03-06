'use strict';

const Controller = require('egg').Controller;

class WordsheetController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {};
  }

  // GET: get all words of single wordsheet
  async all() {
    const { ctx } = this;

    ctx.validate(
      {
        article_id: {
          type: 'string',
          format: /\d+/,
          required: true,
        },
      },
      ctx.query
    );

    const results = await ctx.service.wordsheet.all(ctx.query);

    ctx.body = results
  }

  //   create
  async create() {
    const { ctx } = this;
    // ctx.validate(
    //   {
    //     name: {
    //       type: 'string',
    //       format: /\d+/,
    //       required: true,
    //     },
    //     type: {
    //       type: 'string',
    //       values: /\d+/,
    //       required: false,
    //     },
    //     definition: {
    //       type: 'string',
    //       format: /\d+/,
    //       required: false,
    //     },
    //     example: {
    //       type: 'string',
    //       format: /\d+/,
    //       required: false,
    //     },
    //     article_id: {
    //       type: 'string',
    //       format: /\d+/,
    //       required: true,
    //     },
    //   },
    //   ctx.request.body
    // );

    const isSuccess = await ctx.service.wordsheet.create(ctx.request.body);
    ctx.body = {
      isSuccess,
    };
    ctx.status = 201;
  }

  //   delete
  async delete() {
    const { ctx } = this;

    const isSuccess = await ctx.service.wordsheet.delete(ctx.request.body);
    ctx.body = {
      isSuccess,
    };
    // ctx.status = 201;
  }

  // async update() {
  //   console.log('--------------update--------------');
  //   const { ctx } = this;
  //   const id = ctx.params.id;

  //   ctx.validate(this.createRule);
  //   await ctx.service.topics.update(Object.assign({ id }, ctx.request.body));
  //   ctx.status = 204;
  // }
}

module.exports = WordsheetController;
