const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", function (req, res) {
    res.send("Hai");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listing on port : ${PORT}`);
});
