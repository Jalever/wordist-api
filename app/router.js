'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// module.exports = app => {
//   const { router, controller } = app;
//   router.get('/', controller.home.index);
// };

module.exports = app => {
  const { router, controller } = app;
  // user
  router.post('/api/user/register', controller.users.register);
  router.post('/api/user/login', controller.users.login);
  router.get('/api/users/all', app.jwt, controller.users.getAllUsers);


  // wordsheet
  // app.router.resources('topics', '/api/v2/topics', app.controller.topics);
  router.get('/api/wordsheet/all', app.jwt, controller.wordsheet.getWordsheet);
  router.post('/api/wordsheet/create', app.jwt, controller.wordsheet.create);

};
