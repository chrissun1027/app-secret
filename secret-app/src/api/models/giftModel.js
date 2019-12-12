const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let giftSchema = new Schema({
    name: {
        type: String,
        default:null
    },
    name_donor: {
        type: String,
        required: "Le nom de donneur est requis"
    },
    name_donee: {
        type: String,
        required: "Le nom de receveur est requis"
    }
});

module.exports = mongoose.model('Gift', giftSchema);