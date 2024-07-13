const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");
const web = require("./routes/web");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");

app.use("/admin", web);

app.set("views", path.join(__dirname, "views"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT;
db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to pg admin");
    app.listen(PORT, () => {
        console.log(`Server listing on port : ${PORT}`);
    });
});
