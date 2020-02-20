'use strict';
const Service = require('egg').Service;

class UsersService extends Service {
  // 注册event handler
  async register(user) {
    // 是否已经注册
    const isExist = await this.app.mysql.get('users', {
      username: user.username,
    });
    if (isExist) return false;

    const result = await this.app.mysql.insert('users', user);
    // 判断插入成功
    return result.affectedRows === 1;
  }

  // 登录
  async login(username, password) {
    const user = await this.app.mysql.get('users', { username });

    if (!user || user.password !== password) return false;
    return user;
  }

  // 获取所有的users数据
  async getAllUsers() {
    const results = await this.app.mysql.select('users');
    return results;
  }

  // 根据username得到role
  async getRoleByUsername(username) {
    const results = await this.app.mysql.get('users', { username });
    return results ? results.role : false;
  }
}
module.exports = UsersService;
