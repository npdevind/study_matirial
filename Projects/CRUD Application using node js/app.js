const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");
const web = require("./routes/web");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    session({
        secret: "mySecretKey",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(flash());
app.use((req, res, next) => {
    res.locals.successMessages = req.flash("success");
    res.locals.errorMessages = req.flash("error");
    next();
});

const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("upload", path.join(__dirname, "public/upload"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use("/admin", web);

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
