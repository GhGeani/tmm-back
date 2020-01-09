const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  description: {
    type: String,
    required: [true, "You don't get the point. You must say something. Like, 'I love potatoes', maybe?"],
  },
  author: {
    type: String,
  },
  date: {
    type: String,
  },
});

const articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;
