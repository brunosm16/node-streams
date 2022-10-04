/**
 * Instead of creating a class for generating random numbers,
 * it's used a simplified approach
 */

import { Readable } from "stream";
import Chance from "chance";

const chance = new Chance();

let emittedBytes = 0;

const printURL = (chunk) => {
  console.log(`new data arrived`);
  console.log(`${chunk.toString()}`);
  console.log("\n");
};

const randomURLStream = new Readable({
  read(size) {
    const url = chance.url({ length: size });

    this.push(url, "utf-8");

    const endStream = chance.bool({ likelihood: 30 });

    emittedBytes += url.length;

    if (endStream) this.push(null);
  },
});

randomURLStream
  .on("data", (chunk) => printURL(chunk))
  .on("end", () =>
    console.log(`Random URL Stream Ended | Emitted Bytes : ${emittedBytes} ` )
  );
