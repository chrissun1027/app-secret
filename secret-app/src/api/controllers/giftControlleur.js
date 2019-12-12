const mongoose = require('mongoose');
const giftModel = require('../models/giftModel');
const Gift = mongoose.model("Gift");

exports.list_all_gifts = (req, res) => {
    Gift.find({}, (error, gifts) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            res.status(200);
            res.json(gifts);
        }
    })
}
exports.create_a_gift = (req, res) => {
    let new_gift = new Gift(req.body);

    new_gift.save((error, gift) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            res.status(201);
            res.json(gift);
        }
    })
}


exports.get_gift_by_name_donor = (req, res) => {
    Gift.find({name_donor: req.params.name_donor}, (error, gift) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            res.status(200);
            res.json(gift);
        }
    })
}

exports.get_gift_by_name_donee = (req, res) => {
    Gift.find({name_donee: req.params.name_donee}, (error, gift) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            res.status(200);
            res.json(gift);
        }
    })
}





