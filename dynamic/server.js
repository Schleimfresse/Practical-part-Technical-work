// Init - start -
import http from "http";
import path from "path";
import dotenv from "dotenv";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const port = process.env.PORT;
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
        ejs.renderFile(__dirname + "/public/views/index.ejs", { data: { content: "TEXT" } }, (err, data) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
            else {
                res.end(data);
            }
        });
    }
});
server.listen(port, () => {
    console.log(`app listening at Port: ${port}`);
});
//# sourceMappingURL=server.js.map