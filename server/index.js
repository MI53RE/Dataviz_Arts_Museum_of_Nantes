const express = require("express");
const db = require("diskdb");
const sourcedb = db.connect("./databases/", "source");
const cleandb = db.connect("./databases/", "clean");

const app = express();

app.get("/", (request, response) => {
  db.connect("./databases/", "source");
  const data = db.source.find().data;
  response.send(data);
});
