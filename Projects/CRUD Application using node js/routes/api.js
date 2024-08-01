const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/get-user-list", async (req, res) => {
    const getUserList = await db.query(`select * from users`);
    if (getUserList.rows.length === 0) res.send("no data found");
    else
        res.send({
            status: true,
            data: getUserList.rows,
        });
});

module.exports = router;
