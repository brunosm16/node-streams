// Compressing a file using buffer

import { promises as fs } from "fs";
import { gzip } from "zlib";
import { promisify } from "util";

const gzipPromise = promisify(gzip);

const fileName = process.argv[2];

const runBuffer = async (fileName) => {
  const data = await fs.readFile(fileName);
  const gzipData = await gzipPromise(data);

  await fs.writeFile(`${fileName}.gz`, gzipData);
  console.log('Operation ended successfully')
};

runBuffer(fileName);
