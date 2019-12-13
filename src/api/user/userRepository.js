const { ObjectID } = require('mongodb');
const getMongoDBClient = require('../db/mongodbClient');

module.exports = class UserRepository {
  constructor() {
    this.dbClient = getMongoDBClient();
    this.collection = 'users';
  }

  findByEmail(email) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .findOne({ email }));
  }

  findById(id) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .findOne({ _id: ObjectID(id) }));
  }

  addUser(user) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .insertOne(user));
  }

  editUser(id, user) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .updateOne({ _id: ObjectID(id) }, { $set: user }, { upsert: true }));
  }

  deleteUser(id) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .remove({ _id: ObjectID(id) }));
  }

  changePassword(id, salt, passwordHash) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .updateOne({ _id: ObjectID(id) }, { $set: { salt, passwordHash } }));
  }
};
