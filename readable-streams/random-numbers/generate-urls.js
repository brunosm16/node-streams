import { Readable } from "stream";

import Chance from "chance";

const chance = new Chance();

export class GenerateURLs extends Readable {
  constructor(options) {
    super(options);
    this.emittedBytes = 0;
  }

  _read(size) {
    console.log(size);
    const randomNumber = chance.url({ length: size });

    this.push(randomNumber, "utf-8");

    const endStream = chance.bool({ likelihood: 30 });

    if (endStream) this.push(null);
  }
}
