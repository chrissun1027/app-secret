const mongoose = require('mongoose');
const groupModel = require('../models/groupModel');
const userController = require('../controllers/userController');
const Group = mongoose.model("Group");

exports.create_group = (req, res) => {
    let new_group = new Group(req.body);

    new_group.save((error, group) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        } else {
            res.status(201);
            res.json(group);
        }
    })
}

exports.get_all_groups = (req, res) => {
    Group.find({}, (error, groups) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        } else {
            res.status(200);
            res.json(groups);
        }
    })
}

exports.get_a_group = (req, res) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    var objId = new ObjectId((req.params.group_id.length < 12) ? "123456789012" : req.params.group_id);

    Group.find({$or: [{name: req.params.group_id}, {_id: objId}]}, req.body, {new: true}, (error, group) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        } else {
            res.status(200);
            res.json(group);
        }
    })
}


exports.add_group_userList_item = (req, res) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    var objId = new ObjectId((req.params.group_id.length < 12) ? "123456789012" : req.params.group_id);
    Group.findOneAndUpdate({$or: [{name: req.params.group_id}, {_id: objId}]}, {$push: req.body}, {new: true}, (error, group) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Modifie uniquement user list."});
        } else {
            res.status(200);
            res.json(group);
        }
    })
}

exports.remove_group_userList_item = (req, res) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    var objId = new ObjectId((req.params.group_id.length < 12) ? "123456789012" : req.params.group_id);
    Group.findOneAndUpdate({$or: [{name: req.params.group_id}, {_id: objId}]}, {$pull: req.body}, {new: true}, (error, group) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Modifie uniquement user list."});
        } else {
            res.status(200);
            res.json(group);
        }
    })
}

exports.delete_group = (req, res) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    var objId = new ObjectId((req.params.group_id.length < 12) ? "123456789012" : req.params.group_id);
    Group.remove({$or: [{name: req.params.group_id}, {_id: objId}]}, (error) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        } else {
            res.status(200);
            res.json({message: "Groupe supprimé"});
        }
    })
}

exports.draw_donee = (req, res) => {
    Group.find({userList: req.params.user_name}, (error, group) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        } else {
            group.forEach((item) => {
                userController.appointDonee(res, item.userList, req.params.user_name);
            })
            res.json({message: "Someone has been chosen."})
            res.status(200);
        }
    })
}
