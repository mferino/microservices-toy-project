const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// constants
const PORT = 4003;

const app = express();

app.use(bodyParser.json());

app.post("events", (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
