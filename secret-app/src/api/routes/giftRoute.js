module.exports = (app) => {
    const giftController = require('../controllers/giftController');

    app.route('/gifts')
        .get(giftController.list_all_gifts)
        .post(giftController.create_a_gift);

    app.route('/gift_by_name_donor/:name_donor')
        .get(giftController.get_gift_by_name_donor);

    app.route('/gift_by_name_donee/:name_donee')
        .get(giftController.get_gift_by_name_donee);



}
