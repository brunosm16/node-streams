import { createGzip } from "zlib";
import { createReadStream } from "fs";
import { request } from "http";
import createHttpHeader from "../utils/createHttpHeader.js";
import getDirName from "../utils/getDirName.js";
import { PORT } from "./constants.js";
import createHttpOptions from "../utils/createHttpOptions.js";

const __dirname = getDirName(import.meta.url);

const fileDir = `${__dirname}/files-to-send/file-1.txt`;

const headers = createHttpHeader(fileDir, "gzip");
const putHttpOptions = createHttpOptions(headers, "localhost", PORT);

const req = request(putHttpOptions, (res) =>
  console.log(`Server response status : ${res.statusCode}`)
);

createReadStream(fileDir)
  .pipe(createGzip())
  .pipe(req)
  .on("finish", () => console.log("File was sent"));
