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
			case "/work.html":
			case "/about.html":
			case "/announcement.html":
			case "/contact.html":
			case "/css/main.css":
			case "/js/index.js":
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
		switch (path.extname(f).toLowerCase()) {
			case ".css":
				res.writeHead(200, {
					"Content-Type": "text/css"
				});
				break;
			case ".js":
				res.writeHead(200, {
					"Content-Type": "text/javascript"
				});
			default:
				res.writeHead(200, {
					"Content-Type": "text/html"
				});
		}
		res.end(data);
	});
});
server.listen(3000, "localhost");
