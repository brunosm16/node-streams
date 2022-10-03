import getDirName from "../utils/getDirName.js";
import compress from "./compress.js";

const file = process.argv[2];

const __dirname = getDirName(import.meta.url);

const fileDir = `${__dirname}/text/${file}`;
const fileDest = `${__dirname}/gz/${file}.gz`;

compress(fileDir, fileDest);
