import express from "express";
const router = express.Router();
import * as blogController from "../controller/blogController.js";

// router.get("/blog", blogController.getBlogList);
router.get("/blog-category", blogController.getBlogCategoryList);

export default router;
