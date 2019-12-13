const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    required: "L'email est requis"
  },
  name: {
    type: String,
    required: "Le nom est requis"
  },
  passwordHash: {
    type: String,
    required: "vous devez renseigner un mdp"
  },
  salt: {
    type: String,
    required: "vous devez renseigner un mdp"
  },
  group_name: {
    type: String,
    required: "Le nom du group est requis"
  },
  id_group: {
    type: String,
    default: null
  },
  secret_santa:{
    type: Boolean,
    default: false
  },
  recipient_name: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('User', userSchema);