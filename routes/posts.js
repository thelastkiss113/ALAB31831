const express = require("express");
const router = express.Router();
const { readPosts, writePosts } = require("../utilities/dataHandler");
const error = require("../utilities/error");

//////////////POSTS//////////////
router.get('/', (req, res) => {
  const posts = readPosts();
  const links = [
    {
      href: "posts/:id",
      rel: ":id",
      type: "GET",
    },
  ];

  res.json({ posts, links });
})

router.get('/:id', (req, res, next) => {
  const posts = readPosts();
  const post = posts.find(p => p.id == req.params.id);

  const links = [
    {
      href: `/${req.params.id}`,
      rel: "",
      type: "PATCH",
    },
    {
      href: `/${req.params.id}`,
      rel: "",
      type: "DELETE",
    },
  ];

  if (post) res.json({ post, links });
  else next();
})

// Create Post 
router.post('/', (req, res, next) => {

  const posts = readPosts();
  if (req.body.userId && req.body.title && req.body.content) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content
    };

    posts.push(post);
    writePosts(posts);
    res.json(post);
  } else {
    next(error(400, "Insufficient Data"));
  }
})

// Update a Post
router.patch('/:id', (req, res, next) => {
  const posts = readPosts();
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      // req.body holds the update for the user
      for (const key in req.body) {
        // applying the req.body keys to the existing user keys, overwriting them
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (post) {
    writePosts(posts);
    res.json(post);
  } else {
    next();
  }
})

router.delete("/:id", (req, res, next) => {
  const posts = readPosts();
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      posts.splice(i, 1);
      return true;
    }
  });

  if (post) {
    writePosts(posts);
    res.json(post);
  } else {
    next();
  }
})

module.exports = router;
