require("dotenv").config();
const connect = require("./api/_config/db.config");
const cors = require("cors");
const apiConfig = require("./api/_config/apiConfig");
const bodyParser = require("body-parser");
const router = require("./api/_config/router");
const path = require("path");

//Connexion à la base de données
connect().catch((err) => console.log(err));

//Configuration de express
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.APP_URL, credentials: true }));

//Configuration des routes
app.get(apiConfig.apiPath + "/ping", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use(apiConfig.apiPath + "/results", router.results);
app.use(apiConfig.apiPath + "/users", router.users);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = app;
