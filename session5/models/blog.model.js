const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  content: String,
  publishedAt: Date,
});

const blogModel = mongoose.model("Blog", blogSchema, "blogs"); //collection name is optional, if not provided, it will default to plural form of the model name

module.exports = blogModel;
