import handlebars from "handlebars";
import hbs from "handlebars";
import * as fs from "fs";
import * as path from "path";

function promiseRead(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, {encoding: "utf8"}, (err, data) => {
			if (err) {
				reject(new Error(err));
				return;
			}
			resolve({
				path: path,
				data: data
			});
		})
	});
}
function promiseWrite(path, body) {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, body, {encoding: "utf8"}, (err) => {
			if (err) {
				reject(new Error(err));
				return;
			}
			resolve(path);
		})
	})
}

const promises = [];
promises.push(promiseRead("template/parts/footer.html"));
promises.push(promiseRead("template/parts/head.html"));
promises.push(promiseRead("template/parts/header.html"));
const templates = [
	"index.html"
];
Promise.all(promises)
	.then((parts) => {
		parts.forEach((part) => {
			hbs.registerPartial(path.basename(part.path, ".html"), part.data);
		});
		return Promise.all(templates.map((template) => {
			return promiseRead(path.join("template", template));
		}));
	}).then((templates) => {
		return new Promise.all(templates.map((template) => {
			const html = hbs.compile(template.data);
			// これをファイル出力すればまあ使える
			return promiseWrite(
				path.join(__dirname, path.basename(template.path)),
				html()
			);
		}));
	}).then(() => {
		console.log("finished");
	}).catch((err) => {
		console.error(err);
	});
