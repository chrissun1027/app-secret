const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: "Le nom est requis"
  },
  password: {
    type: String,
    required: "vous devez renseigner un mdp"
  },
  groupName: {
    type: String,
    required: "Le nom du groupe est requis"
  },
  secretSanta:{
    type: Boolean,
    default: false
  },
  recipientName: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('User', userSchema);