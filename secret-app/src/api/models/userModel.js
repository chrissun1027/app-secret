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