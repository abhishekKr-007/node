const router = require("express").Router();
const {
  createNewBlog,
  getBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  searchBlogs,
} = require("../controllers/blogs.controllers");
const findBlogWithId = require("../middlewares/findBlogWithId");

router.post("/new", createNewBlog);
router.get("/", getBlogs);
router.get("/search", searchBlogs);

router
  .route("/:blogId")
  .all(findBlogWithId)
  .get(getBlogById)
  .patch(updateBlogById)
  .delete(deleteBlogById);

module.exports = router;
