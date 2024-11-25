const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post("/add-data", (req, res) => {
  const { id, title, cover, status, type, official, translationBy, rating, popularity, genres, synopsis, epubLink, pdfLink } = req.body;
});