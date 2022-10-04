import { join } from "path";
import { promises as fs } from "fs";
import { Writable } from "stream";
import getDirName from "../utils/get-dir-name.js";

const __dirname = getDirName(import.meta.url);

const filesDir = join(__dirname, "files");

const writeFileStream = new Writable({
  objectMode: true,
  write(chunk, encoding = "utf-8", cb) {
    fs.mkdir(chunk.path, { recursive: true })
      .then(() => fs.writeFile(chunk.pathFile, chunk.content, encoding))
      .then(() => cb())
      .catch(cb);
  },
});

const file1 = {
  path: filesDir,
  pathFile: join(filesDir, "text-3.txt"),
  content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco",
};

writeFileStream.write(file1);
writeFileStream.end(() => console.log("files created"));
