const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });