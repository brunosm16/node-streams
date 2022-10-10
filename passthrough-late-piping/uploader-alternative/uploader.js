import { createReadStream } from "fs";
import { createGzip } from "zlib";
import { join, basename } from "path";
import { uploadStream } from "./upload-stream.js";
import getDirName from "../../utils/get-dir-name.js";

const __dirname = getDirName(import.meta.url);
const fileDir = join(__dirname, "files-to-send", "sample.txt");
const fileName = `${basename(fileDir)}.gz`;

const host = "http://localhost:3000";

const onError = (err) => {
  console.err(`Error occurred : ${err}`);
  process.exit(1);
};

createReadStream(fileDir)
  .pipe(createGzip())
  .pipe(uploadStream(fileName, host))
  .on('data', (chunk) => console.log(chunk))
  .on("error", (err) => onError(err));
