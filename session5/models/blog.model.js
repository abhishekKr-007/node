const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  authors: { type: [String], default: [] },
  content: { type: String, default: "" },
  publishedAt: { type: Date, default: null },
});

const blogModel = mongoose.model("Blog", blogSchema, "blogs"); //collection name is optional, if not provided, it will default to plural form of the model name

module.exports = blogModel;
