const Blog = require("../models/blog.model");

class BlogService {
  create = (payload) => Blog.create(payload);

  getAll = () => Blog.find();

  getById = (blogId) => Blog.findById(blogId);

  updateById = (blogId, payload) =>
    Blog.findByIdAndUpdate(blogId, payload, {
      new: true,
    });

  deleteById = (blogId) => Blog.findByIdAndDelete(blogId);

  searchByTitleOrAuthor = (title, author) => {
    const titleQuery = { title: { $regex: new RegExp(title), $options: "i" } };
    const authorQuery = { authors: { $elemMatch: { email: author } } };

    if (title && author) return Blog.find({ $and: [titleQuery, authorQuery] });
    else if (title) return Blog.find(titleQuery);
    else if (author) return Blog.find(authorQuery);
    else null;
  };
}

module.exports = BlogService;
