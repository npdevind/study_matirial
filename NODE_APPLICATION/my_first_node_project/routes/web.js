const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/product", productController.productList);

router.get("/add-product", productController.addProduct);

router.post("/add-new-product", productController.addNewProduct);

module.exports = router;
