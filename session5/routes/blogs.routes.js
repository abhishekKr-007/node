const router = require("express").Router();
const {
  createNewBlog,
  getBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blogs.controllers");
const findBlogWithId = require("../middlewares/findBlogWithId");

router.post("/new", createNewBlog);
router.get("/", getBlogs);

router
  .route("/:blogId")
  .all(findBlogWithId)
  .get(getBlogById)
  .patch(updateBlogById)
  .delete(deleteBlogById);

// router.get("/:blogId", getBlogById);
// router.patch("/:blogId", updateBlogById);
// router.delete("/:blogId", deleteBlogById);

module.exports = router;
