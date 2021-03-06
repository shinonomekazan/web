import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const server = http.createServer((req, res) => {
	// no cache
	function getPath() {
		if (req.url.startsWith("/files/")) {
			return "./" + req.url.substr(1);
		}
		switch (req.url) {
			case "/":
				return "./html/index.html";
			case "/index.html":
			case "/work.html":
			case "/about.html":
			case "/announcement.html":
			case "/contact.html":
			case "/success.html":
			case "/logo.html":
			case "/tech.html":
			case "/jobs.html":
				return "./html/" + req.url.substr(1);
			case "/css/main.css":
			case "/js/index.js":
			case "/favicon.ico":
			case "/android-touch-icon.png":
			case "/apple-touch-icon.png":
				return "./" + req.url.substr(1);
			default:
				if (req.url.substr(-1) === "/") {
					return "./public/" + req.url.substr(1) + "index.html";
				}
				return "./public/" + req.url.substr(1);
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
			case ".png":
				res.writeHead(200, {
					"Content-Type": "image/png",
				});
				break;
			case ".svg":
				res.writeHead(200, {
					"Content-Type": "image/svg+xml",
				});
				break;
			case ".ico":
				res.writeHead(200, {
					"Content-Type": "image/x-icon",
				});
				break;
			case ".pdf":
				res.writeHead(200, {
					"Content-Type": "application/pdf",
				});
				break;
			case ".css":
				res.writeHead(200, {
					"Content-Type": "text/css",
				});
				break;
			case ".js":
				res.writeHead(200, {
					"Content-Type": "text/javascript",
				});
			default:
				res.writeHead(200, {
					"Content-Type": "text/html",
				});
		}
		res.end(data);
	});
});
server.listen(3000);
