const express = require('express');
const router = express.Router();
const dataHandler = require('../utilities/dataHandler');
const comments = dataHandler.readComments();

const apiKey = 'perscholas';

router.use((req, res, next) => {
    const key = req.query['api-key'];
    if (key && key === apiKey) {
        next();
    } else {
        return res.status(401).json({ error: 'API Key Required' });
    }
});

router.get('/', (req, res) => {
    res.json(comments);
});

router.post('/', (req, res) => {
    const { userId, postId, body } = req.body;
    if (!userId || !postId || !body) {
        return res.status(400).json({ error: 'Insufficient Data' });
    }
    const newComment = {
        id: comments.length + 1,
        userId,
        postId,
        body
    };
    comments.push(newComment);
    dataHandler.writeComments(comments);
    res.status(201).json(newComment);
});

router.get('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
});

router.patch('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    if (req.body.body) {
        comment.body = req.body.body;
        dataHandler.writeComments(comments);
    }
    res.json(comment);
});

router.delete('/:id', (req, res) => {
    const index = comments.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    comments.splice(index, 1);
    dataHandler.writeComments(comments);
    res.status(204).send();
});

module.exports = router;

