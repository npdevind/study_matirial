const express = require('express');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
require("dotenv").config();
const db = require("./db");
const web = require("./routes/web");
const user = require("./routes/user");
const blog = require("./routes/blog");
const ejs = require("ejs");
const path = require("path");
//const myMiddleware = require("./middleware/productMiddleware");
const bodyParser = require('body-parser');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Configure session and flash middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Setup flash messages in response locals
app.use((req, res, next) => {
    res.locals.successMessages = req.flash("success");
    res.locals.errorMessages = req.flash("error");
    next();
});

// Use custom middleware
//app.use(myMiddleware);

// Use the web router
app.use("/admin", web);
app.use("/user", user);
app.use("/blog", blog);

// Define root route
app.get('/', (req, res) => {
    res.render('index');
  });

// Set views and view engine
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
// Start the server
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
