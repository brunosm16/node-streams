import { Readable, Transform } from "stream";
import { createReadStream, createWriteStream } from "fs";

const addEscapeStream = () =>
  new Transform({
    objectMode: true,
    transform(file, encoding, cb) {
      this.push(`${file}\n`);
      cb();
    },
  });

const readWriteStream = (destStream) =>
  new Transform({
    objectMode: true,

    transform(file, encoding, done) {
      const sourceStream = createReadStream(file);

      sourceStream.pipe(addEscapeStream()).pipe(destStream, { end: false });

      sourceStream.on("error", done);
      sourceStream.on("end", done);
    },
  });

export function concat(fromArr, dest) {
  return new Promise((resolve, reject) => {
    const destStream = createWriteStream(dest);

    const readableStream = Readable.from(fromArr);

    readableStream.pipe(readWriteStream(destStream));

    readableStream.on("error", reject);

    readableStream.on("finish", () => {
      destStream.end();
      resolve();
    });
  });
}
