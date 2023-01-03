require("dotenv").config();
const connect = require("./_config/db.config");
const apiConfig = require("./_config/apiConfig");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./_config/router");

//Connexion à la base de données
connect().catch((err) => console.log(err));

//Configuration de express
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));

//Configuration des routes
app.use(apiConfig.apiPath + "/results", router.results);
app.use(apiConfig.apiPath + "/users", router.users);

app.get(apiConfig.apiPath, (req, res) => {
  res.status(200).send("Hello World!");
});

module.exports = app;