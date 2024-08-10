const express = require("express");
const router = express.Router();
const multer  = require('multer')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })

  const upload = multer({ storage:storage  })
const productController = require("../controller/productController");
const myMiddleware = require("../middleware/productMiddleware");

// Route to list all products
router.get("/product", productController.productList);

// Route to show add product form, optionally taking an ID parameter
router.get("/add-product/:id?", productController.addProduct);

// Route to add a new product, using custom middleware

// router.post("/add-new-product", myMiddleware, (req, res, next) => {
//     // Example of preventing based on conditions
   
//         // Prevent further processing and respond with an error or redirect
//         return res.status(400).send("Validation failed, cannot add product.");
   

//     // Proceed with adding the new product
//     productController.addNewProduct(req, res, next);
// });

// Route to update an existing product
router.post("/update-product",upload.single('image'), productController.updateProduct);

// Route to delete a product, optionally taking an ID parameter
router.get("/delete-product/:id?", productController.deleteProduct);

router.post('/add-new-product', upload.single('image'),productController.addNewProduct);

module.exports = router;
