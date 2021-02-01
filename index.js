const hbs = require("handlebars");
const fs = require("fs");
const path = require("path");

function promiseMakeDirectory(path) {
	return new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			if (err) {
				// 決め打ち
				fs.mkdir(path, { mode: 0o755 }, (err2) => {
					if (err2) {
						return reject(err2);
					}
					resolve();
				});
				return;
			}
			if (stats.isDirectory()) {
				resolve();
				return;
			}
			reject(new Error("invalid file detected: " + path));
		});
	});
}

function promiseRead(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, { encoding: "utf8" }, (err, data) => {
			if (err) {
				reject(new Error(err));
				return;
			}
			resolve({
				path: path,
				data: data,
			});
		});
	});
}
function promiseWrite(path, body) {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, body, { encoding: "utf8" }, (err) => {
			if (err) {
				reject(new Error(err));
				return;
			}
			resolve(path);
		});
	});
}
function promiseReadDir(dirpath) {
	return new Promise((resolve, reject) => {
		fs.readdir(dirpath, (err, files) => {
			if (err) {
				reject(new Error(err));
				return;
			}
			const ret = [];
			let count = files.length;
			files.forEach((file) => {
				const targetPath = path.resolve(dirpath, file);
				fs.stat(targetPath, (err, stat) => {
					--count;
					if (err) {
						reject(new Error(err));
						return;
					}
					if (stat.isFile()) {
						ret.push(targetPath);
					}
					if (count === 0) {
						resolve(ret);
					}
				});
			});
		});
	});
}

promiseMakeDirectory("html")
	.then(() => {
		const promises = [];
		promises.push(promiseRead("template/parts/footer.html"));
		promises.push(promiseRead("template/parts/head.html"));
		promises.push(promiseRead("template/parts/header.html"));
		return Promise.all(promises);
	})
	.then((parts) => {
		return promiseReadDir("template").then((templates) => {
			return {
				parts,
				templates,
			};
		});
	})
	.then((seed) => {
		seed.parts.forEach((part) => {
			hbs.registerPartial(path.basename(part.path, ".html"), part.data);
		});
		return Promise.all(
			seed.templates.map((template) => {
				return promiseRead(template);
			})
		);
	})
	.then((templates) => {
		return Promise.all(
			templates.map((template) => {
				const html = hbs.compile(template.data);
				// これをファイル出力すればまあ使える
				return promiseWrite(
					// Note: ほんとはprocess.cwd()じゃなくて__dirname使いたいがmjsだと使えない
					path.join(process.cwd(), "html", path.basename(template.path)),
					html()
				);
			})
		);
	})
	.then(() => {
		console.log("finished");
	})
	.catch((err) => {
		console.error(err);
	});
