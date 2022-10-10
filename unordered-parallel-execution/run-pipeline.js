import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
import { basename, join } from "path";
import split from "split";
import getDirName from "../utils/get-dir-name.js";
import { ParallelStream } from "./parallel-stream.js";
import { LimitedParallelStream } from "./limited-parallel-stream.js";
import { urlChecker } from "./url-checker.js";

const __dirname = getDirName(import.meta.url);

const onFinishPipeline = (err, fileName) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`URL's from ${fileName} checked`);
};

const getStreamByType = ({ type, concurrency }) => {
  if (type === "limited") {
    return new LimitedParallelStream(urlChecker, concurrency);
  }

  return new ParallelStream(urlChecker);
};

export function runPipeline(streamType, from, dest) {
  const stream = getStreamByType(streamType);

  const fromFolder = join(__dirname, from);

  const destFolder = join(__dirname, dest);

  const fileName = basename(fromFolder);

  pipeline(
    createReadStream(fromFolder),
    split(),
    stream,
    createWriteStream(destFolder),
    (err) => onFinishPipeline(err, fileName)
  );
}
