import { join } from "path";

import { concat } from "./concat.js";

import getDirName from "../utils/get-dir-name.js";

const __dirname = getDirName(import.meta.url);

const destPath = join(__dirname, "concat-files", "concated-files.txt");

const fromPath = join(__dirname, "files-to-concat");

const fromArr = [`${fromPath}/sample-1.txt`, `${fromPath}/sample-2.txt`];

const run = async (from, dest) => {
  try {
    await concat(from, dest);
  } catch (err) {
    console.log("Error occurred");
    console.error(err);
    process.exit(1);
  }
};

run(fromArr, destPath);
