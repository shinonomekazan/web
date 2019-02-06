import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const server = http.createServer((req, res) => {
    // no cache
    function getPath() {
        switch (req.url) {
            case "/":
            return "./index.html";
            case "/index.html":
            case "/css/main.css":
            return "./" + req.url.substr(1);
            default:
            return null;
        }
    }
    const f = getPath();
    if (f == null) {
        res.writeHead(404);
        res.end();
        return;
    }
    fs.readFile(f, {encoding: "utf8"}, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end(err.message);
            return;
        }
        if (path.extname(f).toLowerCase() === ".css") {
            res.writeHead(200, {
                "Content-Type": "text/css"
            });
        } else {
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
        }
        res.end(data);
    });
});
server.listen(3000, "localhost");
