const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");
const web = require("./routes/web");
const ejs = require("ejs");
const path = require("path");
// const api = require("./routes/api");

app.use("/admin", web);
// app.use("/api/v1", api);

app.set("views", path.join(__dirname, "views"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const PORT = process.env.PORT;
db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to MySQL database!");
    app.listen(PORT, () => {
        console.log(`Server listing on port : ${PORT}`);
    });
});
