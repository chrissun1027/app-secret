const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: {
        type: String,
        required: "Le nom est requis"
    },
    userList: {
        type: Array,
        default: null
    }
});

module.exports = mongoose.model('Group', groupSchema);
