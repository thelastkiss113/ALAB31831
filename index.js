console.log("Starting server...");

const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;

    // Default route
    if (url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1 style="color: red">Hello World!</h1>');
        res.write('<p>I wonder what else we can send...</p>');
        res.end();
    }
    // Goodbye route
    else if (url === '/goodbye') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>Goodbye</h1>');
        res.write('<p>World!</p>');
        res.end();
    }

    // 404 for unknown routes
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>Oops!</h1>');
        res.write("<p>That page doesn't exist.</p>");
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
