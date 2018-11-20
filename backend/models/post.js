const mongoose = require('mongoose');

const postSchema =  mongoose.Schema({
  title: { type: String, required: true},
  content: {type: String, required: true},
  imagePath: {type: String, required: true}
});

//'Post' is the name of the collection and "postschema" is the schema name
module.exports = mongoose.model('Post', postSchema);
