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
exports.get_users_by_id_group = (req, res) => {
  User.find({id_group: req.params.id_group}, (error, user) => {
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

exports.get_users_by_group_name = (req, res) => {
  User.find({group_name: req.params.group_name}, (error, user) => {
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
exports.santa_update = (res, username, usernameDonee) => {
  User.findOneAndUpdate({name: username}, {recipient_name: usernameDonee}, {new: true}, (error, user) => {
      if (error) {
          res.status(500);
          console.log(error);
      } else {
          res.status(200);
      }
  })
  User.findOneAndUpdate({name: usernameDonee}, {secret_santa: true}, {new: true}, (error, user) => {
      if (error) {
          res.status(500);
          console.log(error);
      } else {
          res.status(200)
      }
  })
}

exports.appointDonee = (res, userList, username) => {
  let listDonee = [];
  let recipient = null;

  User.findOne({name: username}, (error, user) => {
      if (error) {
          res.status(500);
          console.log(error);
      } else {
          recipient = user.recipient_name;
          res.status(200);
      }
  }).then(() => {
      if (recipient == null) {
          userList.forEach((valueOfItem) => {
              User.findOne({name: valueOfItem}, (error, user) => {
                  if (!user.secret_santa && user.name != username) {
                      listDonee.push(user.name);
                  }
              }).then(() => {
                  let usernameDonee = listDonee[Math.floor(Math.random() * listDonee.length)]
                  this.santa_update(res, username, usernameDonee);
              })
          })
      }
  })
}
