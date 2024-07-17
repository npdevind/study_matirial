const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/get-product-list", async (req, res) => {
    const getProductList = await db.query(`select * from product`);
    if (getProductList.rows.length === 0) res.send("no data found");
    else
        res.send({
            status: true,
            data: getProductList.rows,
        });
});

module.exports = router;
