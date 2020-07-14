'use strict';
const Service = require('egg').Service;

class EventTrackingService extends Service {
  // 注册event handler
  async register(params) {
    await this.app.mysql.insert('event-tracking', params);
  }
}
module.exports = EventTrackingService;
