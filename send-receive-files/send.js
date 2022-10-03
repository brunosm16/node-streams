import { request } from "http";
import { PORT, HOSTNAME } from "./constants.js";
import createHttpOptions from "../utils/create-http-options.js";
import createHttpHeaders from "../utils/create-http-headers.js";
import getDirName from "../utils/get-dir-name.js";
import { createReadStream } from "fs";
import { createGzip } from "zlib";

const __dirname = getDirName(import.meta.url);
const fileDir = `${__dirname}/files-to-send/file-1.txt`;

const headers = createHttpHeaders("octet-stream", "gzip", fileDir);
const reqOptions = createHttpOptions(HOSTNAME, PORT, "PUT", "/", headers);

const req = request(reqOptions, (res) =>
  console.log(`Response : ${res.statusCode}`)
);

createReadStream(fileDir)
  .pipe(createGzip())
  .pipe(req)
  .on("finish", () => console.log("File sent"));
