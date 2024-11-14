const router = require("express").Router();
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("../controllers/users.controllers");
const verifyAuth = require("../middlewares/verifyAuth");
const queryValidator = require("../middlewares/queryValidator");

router.use(verifyAuth);

router.get("/", getUsers);
router.get("/search", queryValidator, searchUsers);
router.get("/:uuid", getUserById);

module.exports = router;
