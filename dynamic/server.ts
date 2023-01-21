// Init - start -

import http from "http";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import bodyParser from "body-parser";
import url from "url";
import ejs from "ejs";
import Datastore from "nedb";
import crypto from "crypto";
const __filename: string = url.fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
dotenv.config();
const port: number = process.env.PORT;
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
if (process.env.NODE_ENV === "development") {
}
if (process.env.NODE_ENV === "production") {
}
const Database = new Datastore({ filename: "data.db", autoload: true });
// Init - end -

// routes

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);

	if (parsedUrl.pathname === "/") {
		Database.find({}, (err, docs) => {
			ejs.renderFile(
				__dirname + "/public/views/index.ejs",
				{ data: { content: JSON.stringify(docs) } },
				(err: Error, data: object) => {
					if (err) {
						res.end(err);
					} else {
						res.end(data);
					}
				}
			);
		});
	}

	if (parsedUrl.pathname === "/add") {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString();
		});
		req.on("end", () => {
			try {
				req.body = JSON.parse(body);
				console.log(req.body);
			} catch (err) {
				console.log(err);
			}
			Database.insert({ data: req.body.text, id: crypto.randomUUID(), date: new Date().getTime() }, () => {});
		});
	}
});

server.listen(port, () => {
	console.log(`app listening at Port: ${port}`);
});
