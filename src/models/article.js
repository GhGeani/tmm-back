const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  description: {
    type: String,
    require: [true, "You don't get the point. You must say something. Like, 'I love potatoes', maybe?"],
  },
});

const articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;
