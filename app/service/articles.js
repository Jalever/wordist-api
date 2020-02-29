'use strict';

const Service = require('egg').Service;

class ArticlesService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = '';
  }

  // 获取全部articles数据
  async all() {
    const results = await this.app.mysql.select('articles');
    return results;

  }

  // 创建
  async create(params) {
    const {
      title,
    } = params;

    // insert a record title 'Hello World' to 'posts' table
    const result = await this.app.mysql.insert('articles', {
      title,
    });

    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;

  }


}

module.exports = ArticlesService;
