import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const server = http.createServer((req, res) => {
	// no cache
	function getPath() {
		switch (req.url) {
			case "/":
			return "./html/index.html";
			case "/index.html":
			case "/work.html":
			case "/about.html":
			case "/announcement.html":
			case "/contact.html":
			case "/success.html":
			return "./html/" + req.url.substr(1);
			case "/files/teikan.pdf":
			case "/files/meibo.pdf":
			return "./" + req.url.substr(1);
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
	const ext = path.extname(f).toLowerCase();
	fs.readFile(f, (err, data) => {
		if (err) {
			res.writeHead(500);
			res.end(err.message);
			return;
		}
		switch (ext) {
			case ".pdf":
				res.writeHead(200, {
					"Content-Type": "application/pdf"
				});
				break;
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
server.listen(3000);
