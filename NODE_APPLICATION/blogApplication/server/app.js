import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import web from "./routes/web.js";
import api from "./routes/api.js";
import path from "path";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(web);
app.use("/api/v1", api);

app.set("views", path.join("views"));
app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listing on port : ${PORT}`);
});
