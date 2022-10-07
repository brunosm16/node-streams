import { Transform } from "stream";

export class UpperCaseStream extends Transform {
  constructor(options) {
    super({ ...options });
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }

  _flush(cb) {
    this.push('-----\n')
    cb();
  }
}
