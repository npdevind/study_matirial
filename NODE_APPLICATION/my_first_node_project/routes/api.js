const express = require("express");
const router = express.Router();

router.get("/home", async function (req, res) {
    res.send("I am home api");
});

router.get("/dashboard", async function (req, res) {
    res.send("I am dashboard api");
});

router.get("/product", async function (req, res) {
    res.send("I am Product api");
});

module.exports = router;
