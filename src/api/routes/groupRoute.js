module.exports = (app) => {
    const groupController = require('../controllers/groupController');

    app.route('/group')
        .get(groupController.get_all_groups)
        .post(groupController.create_group);

    app.route('/group/:group_id')
        .get(groupController.get_a_group)
        .delete(groupController.delete_group);

    app.route('/group/:group_id/add_user_list')
        .put(groupController.add_group_userList_item);

    app.route('/group/:group_id/remove_user_list')
        .put(groupController.remove_group_userList_item);

    app.route('/group/:group_id/user_list/:user_name')
        .put(groupController.draw_donee);

}
