import { createReadStream } from "fs";

import { FilterBySalary } from "./filter-by-salary.js";

import { CountRecords } from "./count-records.js";

import csvParser from "csv-parser";

const parser = csvParser({ columns: true });

createReadStream("employees.csv")
  .pipe(parser)
  .pipe(new FilterBySalary(10000))
  .pipe(new CountRecords())
  .on("data", (chunk) => {
    console.log(chunk);
  });
