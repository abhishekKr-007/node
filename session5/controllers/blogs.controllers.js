const Blog = require("../models/blog.model");

const createNewBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    // OR
    // const newBlog = await Blog.create(req.body);
    res.status(201).send(newBlog);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!", error });
  }
};

module.exports = { createNewBlog };
