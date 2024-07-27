const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/product", productController.productList);

router.get("/add-product", productController.addProduct);

router.get("/add-edit-product/:id?", productController.addEditProduct);

router.post("/add-new-product", productController.addNewProduct);

router.get("/product/delete/:id?", productController.deleteProduct);

router.get("/product/edit/:id?", productController.editPageOpen);

router.post("/update-product", productController.updateProduct);

module.exports = router;
