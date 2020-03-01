'use strict';

const Service = require('egg').Service;

class WordsheetService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  // 获取指定article中wordsheet的全部数据
  async all(params) {
    const results = await this.app.mysql.select('wordsheet', {
      where: {
        article_id: params.article_id,
      },
    });
    return results;
  }

  // 获取指定article中新增一个单词
  async create(params) {
    const {
      name,
      type,
      definition,
      example,
      article_id,
    } = params;

    // insert a record title 'Hello World' to 'posts' table
    const result = await this.app.mysql.insert('wordsheet', {
      name,
      type,
      definition,
      example,
      article_id,
    });

    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }

  // 删除指定article中新增一个单词
  async delete(params) {
    const {
      id
    } = params;

    // insert a record title 'Hello World' to 'posts' table
    const result = await this.app.mysql.delete('wordsheet', {
      id
    });

    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }

  // checkSuccess(result) {
  //   if (result.status !== 200) {
  //     const errorMsg =
  //       result.data && result.data.error_msg
  //         ? result.data.error_msg
  //         : 'unknown error';
  //     this.ctx.throw(result.status, errorMsg);
  //   }
  //   if (!result.data.success) {
  //     this.ctx.throw(500, 'remote response error', { data: result.data });
  //   }
  // }
}

module.exports = WordsheetService;
