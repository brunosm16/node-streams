import { createReadStream } from "fs";
import { basename, join } from "path";
import { createBrotliCompress } from "zlib";
import { PassThrough } from "stream";
import { upload } from "./upload.js";
import getDirName from "../../utils/get-dir-name.js";

const __dirname = getDirName(import.meta.url);

const fileDir = join(__dirname, "files-to-send", "sample.txt");
const fileName = `${basename(fileDir)}.br`;

const contentStream = new PassThrough();

const host = "http://localhost:3000";

const onSuccess = (response) => {
  console.log(`Server status : ${response.status}`);
};

const onError = (err) => {
  console.error(err);
  process.exit(1);
};

upload(fileName, host, contentStream)
  .then((response) => onSuccess(response))
  .catch((err) => onError(err));

createReadStream(fileDir).pipe(createBrotliCompress()).pipe(contentStream);
