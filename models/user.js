const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const db = mongoose.connection;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  profileImage: {
    type: String,
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
}

module.exports.isUserInDatabase = async (query) => {
  const user = await User.findOne(query);
  return !!(user);
}

module.exports.createUser = async (newUser, callback) => {
  bcrypt.genSalt(10, async (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      newUser.password = hash;
      await newUser.save();
    })
  })
}
