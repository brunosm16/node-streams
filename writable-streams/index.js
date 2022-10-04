import { join } from "path";
import { WriteFileStream } from "./write-file-stream.js";
import getDirName from "../utils/get-dir-name.js";

const wts = new WriteFileStream();

const __dirname = getDirName(import.meta.url);

const filesDir = join(__dirname, "files");

const file1 = {
  path: filesDir,
  pathFile: join(filesDir, "text-1.txt"),
  content: "Lorem Ipsum",
};

const file2 = {
  path: filesDir,
  pathFile: join(filesDir, "text-2.txt"),
  content: "Testing Testing",
};

wts.write(file1);
wts.write(file2);

wts.end(() => console.log("Files created"));
