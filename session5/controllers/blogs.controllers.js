const Blog = require("../models/blog.model");

const createNewBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    // OR
    // const newBlog = await Blog.create(req.body);
    res.status(201).send(newBlog);
  } catch (error) {
    if (error.name === "ValidationError")
      return res.status(400).send({ message: error.message });
    if (error.code === 11000)
      return res
        .status(409)
        .send({ message: `A blog with this title already exists!` });
    res.status(500).send({ message: "Something went wrong!", error });
  }
};

const getBlogs = async (req, res) => {
  try {
    res.send(await Blog.find());
  } catch (error) {
    res
      .status(500)
      .send({ message: `Something went wrong. Please try again!`, error });
  }
};

const getBlogById = (req, res) => {
  res.send(req.blog);
};

const updateBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      // returnDocument: "after",
      new: true,
    });
    res.status(200).send(updatedBlog);
  } catch (error) {
    res
      .status(500)
      .send({ message: `Something went wrong. Please try again!`, error });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    await Blog.findByIdAndDelete(blogId);
    res.sendStatus(204);
    // res.send(204).send({ message: `Blog was deleted successfully` });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Something went wrong. Please try again!`, error });
  }
};

module.exports = {
  createNewBlog,
  getBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
