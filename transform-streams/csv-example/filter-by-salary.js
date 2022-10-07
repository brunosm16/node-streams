import { Transform } from "stream";

export class FilterBySalary extends Transform {
  constructor(comparatorSalary, options = {}) {
    options.objectMode = true;
    super(options);

    this.comparatorSalary = comparatorSalary;
  }

  _transform(record, encoding, cb) {
    if (record.SALARY >= this.comparatorSalary) {
      this.push(record);
    }
    cb();
  }
}
