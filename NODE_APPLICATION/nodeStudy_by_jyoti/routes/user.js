const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")

// Route to list all user
router.get("/user-list", userController.userList);

// Route to show add user form, optionally taking an ID parameter
router.get("/add-user/:id?", userController.addUser);

// Route to add and update a user
router.post("/add-update-user", userController.addUpdateUser);
router.get("/delete/:id?", userController.deleteUser);

module.exports = router;