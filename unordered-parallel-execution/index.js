import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
import { basename, join } from "path";
import split from "split";
import getDirName from "../utils/get-dir-name.js";
import { ParallelStream } from "./parallel-stream.js";
import { urlChecker } from "./url-checker.js";

const __dirname = getDirName(import.meta.url);

const fromFileDir = join(__dirname, "urls.txt");

const fileName = basename(fromFileDir);

const onFinishPipeline = (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`URL's from ${fileName} checked`);
};

pipeline(
  createReadStream(fromFileDir),
  split(),
  new ParallelStream(urlChecker),
  createWriteStream("url-checks-result.txt"),
  (err) => onFinishPipeline(err)
);
