const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, '../data/posts.json');
const usersFilePath = path.join(__dirname, '../data/users.json');

function readPosts() {
    return JSON.parse(fs.readFileSync(postsFilePath, 'utf8'));
}

function writePosts(posts) {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}

function readUsers() {
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
}

function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

module.exports = {
    readPosts,
    writePosts,
    readUsers,
    writeUsers
};
