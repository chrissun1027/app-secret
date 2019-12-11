const mongoose = require('mongoose');
const postModel = require('../models/userModel');
const User = mongoose.model("User");

exports.list_all_users = (req, res) => {
  User.find({}, (error, users) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(users);
    }
  })
}

exports.create_a_user = (req, res) => {
  let new_user = new User(req.body);

  new_user.save((error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(201);
      res.json(user);
    }
  })
}

exports.get_a_user = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(user);
    }
  })
}

exports.update_a_user = (req, res) => {
  User.findOneAndUpdate({_id: req.params.user_id}, req.body, {new: true}, (error, user) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json(user);
    }
  })
}

exports.delete_a_user = (req, res) => {
  User.remove({_id: req.params.user_id}, (error) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."});
    }
    else {
      res.status(200);
      res.json({message: "Utilisateur supprimé"});
    }
  })
}
