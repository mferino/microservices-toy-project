const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const PORT = 4001;

const app = express();
app.use(bodyParser.json());

app.get("/posts/:id/comments", (req, res) => {});
app.post("/posts/:id/comments", (req, res) => {});

app.list(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
