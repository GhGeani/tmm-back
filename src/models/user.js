const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Sorry, but you must have a username.'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email address is required'],
    // eslint-disable-next-line no-useless-escape
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    min: [5, 'This password is too small, try something else. (at least 5)'],
  },
});

userSchema.path('username').validate(async (username) => {
  const result = await mongoose.models.user.findOne({ username });
  if (result) {
    return false;
  }
  return true;
}, 'This username is already in use');

userSchema.path('email').validate(async (email) => {
  const result = await mongoose.models.user.findOne({ email });
  if (result) {
    return false;
  }
  return true;
}, 'This email is already taken.');

userSchema.path('username').validate((username) => {
  const len = username.length;
  if (len < 3 || len > 15) {
    return false;
  }
  return true;
}, 'Username must contain between 3 and 15 chars.');

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const userModel = mongoose.model('user', userSchema);

// eslint-disable-next-line func-names
userModel.comparePassword = async function (pass, hashedPass) {
  const result = await bcrypt.compare(pass, hashedPass);
  return result;
};

module.exports = userModel;
