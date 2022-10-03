import { createWriteStream } from "fs";
import { createServer } from "http";
import { join, basename } from "path";
import { createGunzip } from "zlib";
import { PORT } from "./constants.js";

const server = createServer((req, res) => {
  const file = basename(req.headers["x-filename"]);

  const dest = join("files-received", file);

  req
    .pipe(createGunzip())
    .pipe(createWriteStream(dest))
    .on("finish", () => {
      res.writeHead(201, { "Content-Type": "text-plain" });
      res.end("Server closed\n");
      console.log(`Files successfully sent`);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
