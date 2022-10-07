import { Transform } from "stream";

export class CountRecords extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);

    this.rows = 0;
  }

  _transform(record, encoding, cb) {
    this.rows += 1;
    cb();
  }

  _flush(cb) {
    this.push(this.rows.toString(10));
    cb();
  }
}
