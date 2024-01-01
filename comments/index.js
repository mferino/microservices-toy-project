const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

// constants
const PORT = 4001;

const commentsByPostId = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: "pending" });

    commentsByPostId[req.params.id] = comments;

    await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: "pending", 
        }
    });

    res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
    console.log(`Received event: ${req.body.type}`);

    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { id, postId, status, content } = data;

        const comments = commentsByPostId[postId];

        const comment = comments.find(c => c.id === id);
        comment.status = status;

        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentUpdated",
            data: {
                id,
                status,
                postId,
                content,
            }
        });
    }

    res.send({});
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
