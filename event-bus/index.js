const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// constants
const PORT = 4005;

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
    const event = req.body;

    events.push(event);

    // Posts
    axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
        console.log(err.message);
    });

    // // Comments
    // axios.post("http://localhost:4001/events", event).catch((err) => {
    //     console.log(err.message);
    // });

    // // Query
    // axios.post("http://localhost:4002/events", event).catch((err) => {
    //     console.log(err.message);
    // });

    // // Moderation
    // axios.post("http://localhost:4003/events", event).catch((err) => {
    //     console.log(err.message);
    // });

    res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
    res.send(events);
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

