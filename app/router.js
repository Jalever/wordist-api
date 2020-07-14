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

<<<<<<< HEAD
=======

  // articles
  router.get('/api/article/all', app.jwt, controller.articles.all);
  router.post('/api/article/create', app.jwt, app.controller.articles.create);

>>>>>>> eac2b2c45854a39b6829eebb801f3da07e79700a
  // wordsheet
  router.get('/api/wordsheet/all', app.jwt, controller.wordsheet.all);
  router.post('/api/wordsheet/create', app.jwt, controller.wordsheet.create);
  router.delete('/api/wordsheet/delete', app.jwt, controller.wordsheet.delete);

  router.post('/api/event-tracking/log', controller.eventTracking.log);


};
