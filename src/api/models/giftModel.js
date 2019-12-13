const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let giftSchema = new Schema(
    {
        name: {
            type: String,
            default:null
        },
        name_donor: {
            type: String,
            required: "Le nom du donneur est requis"
        },
        name_donee: {
            type: String,
            required: "Le nom du receveur est requis"
        }
    }
);

module.exports = mongoose.model('Gift', giftSchema);