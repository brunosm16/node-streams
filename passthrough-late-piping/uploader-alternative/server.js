import { createWriteStream } from "fs";
import { createServer } from "http";
import { basename, join } from "path";

const server = createServer((req, res) => {
  const fileName = basename(req.headers["x-filename"]);

  const dest = join("files-received", fileName);

  console.log(`File received : ${fileName}`);

  req.pipe(createWriteStream(dest)).on("finish", () => {
    res.writeHead("201", { "Content-Type": "text/plain" });
    res.end();

    console.log(`File read : ${fileName}`);
  });
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
