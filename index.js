const express = require('express');
const app = express();
const commentsRouter = require('./routes/comments');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.get('/api', (req, res) => {
    res.json({
        message: 'API is working!',
        routes: {
            comments: '/api/comments',
            users: '/api/users',
            posts: '/api/posts'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
