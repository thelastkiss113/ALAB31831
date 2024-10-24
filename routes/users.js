const express = require('express');
const router = express.Router();
const dataHandler = require('../utilities/dataHandler');
const users = dataHandler.readUsers();

router.get('/', (req, res) => {
    res.json(users);
});

router.post('/', (req, res) => {
    const newUser = req.body;
    if (!newUser || !newUser.name) {
        return res.status(400).send({ error: "Insufficient Data" });
    }
    newUser.id = users.length + 1;
    users.push(newUser);
    dataHandler.writeUsers(users);
    res.status(201).json(newUser);
});


module.exports = router;
