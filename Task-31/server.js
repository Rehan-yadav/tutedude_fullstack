const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const routes = {
    "/home": "home.html",
    "/about": "about.html",
    "/contact": "contact.html"
};

const server = http.createServer((req, res) => {

    if (req.method !== "GET") {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("405 Method Not Allowed");
        return;
    }

    const requestedPath = new URL(req.url, `http://${req.headers.host}`).pathname;

    if (requestedPath === "/style.css") {

        const cssPath = path.join(__dirname, "public", "style.css");

        fs.readFile(cssPath, (err, data) => {

            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 Internal Server Error");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);

        });

        return;
    }

    const fileName = routes[requestedPath] || "404.html";

    const statusCode = routes[requestedPath] ? 200 : 404;

    const filePath = path.join(__dirname, "pages", fileName);

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 Internal Server Error");
            return;
        }

        res.writeHead(statusCode, {
            "Content-Type": "text/html"
        });

        res.end(data);

    });

});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
