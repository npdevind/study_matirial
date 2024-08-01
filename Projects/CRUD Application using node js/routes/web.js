const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/user", userController.userList);

router.get("/add-user", userController.addUser);

router.post("/add-new-user", userController.addNewUser);

router.get("/user/delete/:id?", userController.deleteUser);

router.get("/user/edit/:id?", userController.editPageOpen);

router.post("/update-user", userController.updateUser);

module.exports = router;
