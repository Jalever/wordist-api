'use strict';

const Controller = require('egg').Controller;

class TopicsController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      accesstoken: 'string',
      title: 'string',
      tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
      content: 'string',
    };
  }

  //   show single post
  // async show() {
  //   console.log('--------------show--------------');
  //   const { ctx } = this;

  //   ctx.body = await ctx.service.topics.show({
  //     id: ctx.params.id,
  //     mdrender: ctx.query.mdrender !== 'false',
  //     accesstoken: ctx.query.accesstoken || '',
  //   });
  // }

  // show list
  async getWordsheet() {
    const { ctx } = this;

    ctx.validate(
      {
        page: {
          type: 'string',
          format: /\d+/,
          required: false,
        },
        tab: {
          type: 'enum',
          values: [ 'ask', 'share', 'job', 'good' ],
          required: false,
        },
        limit: {
          type: 'string',
          format: /\d+/,
          required: false,
        },
      },
      ctx.query
    );

    ctx.body = await ctx.service.wordsheet.read({
      page: ctx.query.page,
      tab: ctx.query.tab,
      limit: ctx.query.limit,
      mdrender: ctx.query.mdrender !== 'false',
    });
  }

  //   create
  async create() {
    const { ctx } = this;
    ctx.validate(
      {
        name: {
          type: 'string',
          format: /\d+/,
          required: true,
        },
        type: {
          type: 'string',
          values: /\d+/,
          required: false,
        },
        definition: {
          type: 'string',
          format: /\d+/,
          required: false,
        },
        example: {
          type: 'string',
          format: /\d+/,
          required: false,
        },
      },
      ctx.request.body
    );

    const isSuccess = await ctx.service.wordsheet.create(ctx.request.body);
    ctx.body = {
      isSuccess,
    };
    ctx.status = 201;
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

module.exports = TopicsController;
