const express = require('express');
const router = express.Router();
const dataHandler = require('../utilities/dataHandler');
const posts = dataHandler.readPosts();

router.get('/', (req, res) => {
    res.json(posts);
});

router.post('/', (req, res) => {
    const newPost = req.body;
    if (!newPost || !newPost.title || !newPost.content) {
        return res.status(400).send({ error: "Insufficient Data" });
    }
    newPost.id = posts.length + 1;
    posts.push(newPost);
    dataHandler.writePosts(posts);
    res.status(201).json(newPost);
});


module.exports = router;
