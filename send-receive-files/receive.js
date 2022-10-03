import { createReadStream, createWriteStream } from "fs";
import { createServer } from "http";
import { basename, join } from "path";
import { createGunzip } from "zlib";
import { PORT } from "./constants.js";
import getDirName from "../utils/get-dir-name.js";

const __dirname = getDirName(import.meta.url);

const onFinish = (res) => {
  res.writeHead(201, { "Content-Type": "text/plain" });
  res.end("Receive server finished");
  console.log("Files received");
};

const server = createServer((req, res) => {
  const file = req.headers["x-filename"];

  const filename = basename(file);

  const pathToSave = join(__dirname, "files-received", filename);

  req
    .pipe(createGunzip())
    .pipe(createWriteStream(pathToSave))
    .on("finish", () => onFinish(res));
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
