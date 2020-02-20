'use strict';
const moment = require('moment');

// uuid格式：年月日时分秒3位毫秒+3位随机数，共20位  ===>   20190312162455043167
exports.uuid = function uuid() {
  let uuid = moment().format('YYYYMMDDHHmmssSSS');
  uuid += (Array(3).join(0) + Math.random() * 100).slice(-3);
  return uuid;
};

exports.generateJWT = function generateJWT(username, password) {
  const { config } = this;
  console.log('this: generateJWT-------------');
  console.log(this);
  console.log('\n\n\n');
  const token = this.jwt.sign({ username, password }, config.jwt.secret);
  return token;
};

