import { promises as fs } from "fs";
import { Writable } from "stream";

export class WriteFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true });
  }

  _write(chunk, encoding = "utf-8", cb) {
    fs.mkdir(chunk.path, { recursive: true })
      .then(() => fs.writeFile(chunk.pathFile, chunk.content, encoding))
      .then(() => cb())
      .catch(cb);
  }
}
