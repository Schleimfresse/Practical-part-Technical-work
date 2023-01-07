// Init - start -

import http from "http";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import url from "url";
const __filename: string = url.fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
dotenv.config();
const port: number = process.env.PORT;
if (process.env.NODE_ENV === "development") {
}
if (process.env.NODE_ENV === "production") {
}
import ejs from "ejs";
// Init - end -

// routes

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);

	if (parsedUrl.pathname === "/") {
		// Read the start page file
		ejs.renderFile(__dirname + "/public/views/index.ejs", { data: { content: "TEXT" } }, (err: Error, data: object) => {
			if (err) {
				res.end(err);
			} else {
				res.end(data);
			}
		});
	}
});

server.listen(port, () => {
	console.log(`app listening at Port: ${port}`);
});
