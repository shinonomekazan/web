import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const server = http.createServer((req, res) => {
	// no cache
	function getPath() {
		const url = new URL(req.url, `http://${req.headers.host}`);
		if (url.pathname.startsWith("/files/")) {
			return `./${url.pathname.substring(1)}`;
		}
		switch (url.pathname) {
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
			case "/achievement.html":
			case "/training.html":
			case "/history.html":
				return `./html/${url.pathname.substring(1)}`;
			case "/css/main.css":
			case "/js/index.js":
			case "/favicon.ico":
			case "/android-touch-icon.png":
			case "/apple-touch-icon.png":
				return `./${url.pathname.substring(1)}`;
			default:
				if (req.url.substring(-1) === "/") {
					return `./public/${url.pathname.substring(1)}index.html`;
				}
				return `./public/${url.pathname.substring(1)}`;
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
				break;
			default:
				res.writeHead(200, {
					"Content-Type": "text/html",
				});
		}
		res.end(data);
	});
});
server.listen(3000);
