module.exports = (app) => {
  const userController = require('../controllers/userController');

  app.route('/users')
  .get(userController.list_all_users)
  .post(userController.create_a_user);

  app.route('/users/:user_id')
  .get(userController.get_a_user)
  .put(userController.update_a_user)
  .delete(userController.delete_a_user);

  app.route('/users_by_id_group/:id_group')
  .get(userController.get_users_by_id_group);

  app.route('/users_by_group_name/:group_name')
  .get(userController.get_users_by_group_name);

  
}
