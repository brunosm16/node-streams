import { createReadStream, createWriteStream } from "fs";
import { UpperCaseStream } from "./upper-case-stream.js";


import getDirName from "../utils/get-dir-name.js";
import { join } from "path";

const upperCaseStream = new UpperCaseStream();

const __dirname = getDirName(import.meta.url);

const file = join(__dirname, "files", "normal-text.txt");

const dest = join(__dirname, "files", "uppercase-text.txt")

createReadStream(file).pipe(upperCaseStream).pipe(createWriteStream(dest));
