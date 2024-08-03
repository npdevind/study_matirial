import express from "express";
const router = express.Router();
import * as blogController from "../controller/blogController.js";
import * as blogMiddleware from "../middleware/blogCategory.js";

router.get("/blog-category", blogController.getBlogCategoryList);

router.post("/add-blog-category", blogMiddleware.validationForAdd, blogController.addNewBlogCategory);

router.post("/update-blog-category", blogMiddleware.validationForUpdate, blogController.updateBlogCategory);

export default router;
