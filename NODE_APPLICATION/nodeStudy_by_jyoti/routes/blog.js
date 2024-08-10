const express = require("express");
const { blogList } = require("../controller/blogController");
const router = express.Router();

router.get("/blogs", blogList);
module.exports = router;