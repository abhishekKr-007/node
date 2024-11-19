const { getById } = require("../services/blogs.service");

const findBlogWithId = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const reqBlog = await getById(blogId);
    if (!reqBlog)
      return res
        .status(404)
        .send({ message: `Blog with id: ${blogId} could not be found!` });
    req.blog = reqBlog;
    next();
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId")
      return res.status(422).send({ message: "Invalid blogId!" });
    res
      .status(500)
      .send({ message: `Something went wrong. Please try again!`, error });
  }
};

module.exports = findBlogWithId;
