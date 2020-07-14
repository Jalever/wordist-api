'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');

class EventTrackingController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      accesstoken: 'string',
      title: 'string',
      tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
      content: 'string',
    };
  }

  async log() {
    const { ctx } = this;

    console.warn('ctx');
    console.log(ctx);
    console.log('\n');


    const { url, params, response } = ctx.request.body;
    console.warn('url');
    console.log(url);
    console.log('\n');
    const nowTime = new Date();
    const userNew = {
      url,
      params,
      response,
      create_time: nowTime,
    };

    await ctx.service.eventTracking.register(userNew);
  }
}

module.exports = EventTrackingController;
