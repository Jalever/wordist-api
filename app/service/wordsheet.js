'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  // 申请数据
  async request(url, opts) {
    url = `${this.root}${url}`;
    opts = Object.assign(
      {
        timeout: [ '30s', '30s' ],
        dataType: 'json',
      },
      opts
    );
    return this.ctx.curl(url, opts);
  }

  // async show(params) {
  //   const result = await this.request(`/topic/${params.id}`, {
  //     data: {
  //       mdrender: params.mdrender,
  //       accesstoken: params.accesstoken,
  //     },
  //   });
  //   this.checkSuccess(result);

  //   return result.data.data;
  // }

  // get all words of single wordsheet
  async all() {
    const results = await this.app.mysql.select('wordsheet');
    return results;
  }

  async create(params) {
    const {
      name,
      type,
      definition,
      example,
    } = params;

    // insert a record title 'Hello World' to 'posts' table
    const result = await this.app.mysql.insert('wordsheet', {
      name,
      type,
      definition,
      example,
    });
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }

  async update(params) {
    const result = await this.request('/topics/update', {
      method: 'post',
      data: params,
      contentType: 'json',
    });

    this.checkSuccess(result);
  }

  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg =
        result.data && result.data.error_msg
          ? result.data.error_msg
          : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}

module.exports = TopicService;
