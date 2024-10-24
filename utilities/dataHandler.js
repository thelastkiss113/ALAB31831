const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, '../data/posts.js');
const usersFilePath = path.join(__dirname, '../data/users.js');
const commentsFilePath = path.join(__dirname, '../data/comments.js');

/**
 * Reads and returns the list of posts from the posts file.
 * 
 * This function loads the posts data from the specified file path and returns 
 * it as an array of post objects. The file is expected to export the posts data.
 *
 * returns {Array} An array of post objects.
 */
function readPosts() {
    // Load and return the posts data from the specified file path
    return require(postsFilePath);
}

function writePosts(posts) {
    // Write the posts data to the specified file path
    fs.writeFileSync(postsFilePath, `const posts = ${JSON.stringify(posts, null, 2)};\nmodule.exports = posts;`);
}


/**
 * Reads and returns the list of users from the users file.
 * 
 * This function loads the users data from the specified file path and returns 
 * it as an array of user objects. The file is expected to export the users data.
 * 
 * returns {Array} An array of user objects.
 */
function readUsers() {
    // Load and return the users data from the specified file path
    return require(usersFilePath);
}

/**
 * Writes the list of users to the users file.
 * 
 * This function takes the list of users as an array of user objects and writes
 * it to the specified file path. The data is written as a module that exports
 * the list of users.
 * 
 */
function writeUsers(users) {
    fs.writeFileSync(usersFilePath, `const users = ${JSON.stringify(users, null, 2)};\nmodule.exports = users;`);
}


/**
 * Reads and returns the list of comments from the comments file.
 * 
 * This function loads the comments data from the specified file path
 * and returns it as an array of comment objects. The file is expected
 * to export the comments data.
 * 
 */
function readComments() {
    // Load and return the comments data from the specified file path
    return require(commentsFilePath);
}

/**
 * Writes the list of comments to the comments file.
 * 
 * This function takes the list of comments as an array of comment objects and 
 * writes it to the specified file path. The data is written as a module that 
 * exports the list of comments.

 */
function writeComments(comments) {
    // Write the comments data to the specified file path
    fs.writeFileSync(commentsFilePath, `const comments = ${JSON.stringify(comments, null, 2)};\nmodule.exports = comments;`);
}



module.exports = {
    readPosts,
    writePosts,
    readUsers,
    writeUsers,
    readComments,
    writeComments
};
