import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

export default (file, dest) => {
  createReadStream(file)
    .pipe(createGzip())
    .pipe(createWriteStream(dest))
    .on("finish", () => console.log("Compress ended"));
};
