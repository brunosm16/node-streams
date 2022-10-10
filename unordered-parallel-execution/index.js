import { runPipeline } from "./run-pipeline.js";

const limitedStream = {
  type: "limited",
  concurrency: 3,
};

const notLimitedStream = {
  type: "not-limited",
};

runPipeline(
  limitedStream,
  "limited-stream/urls.txt",
  "limited-stream/url-checks-results.txt"
);

runPipeline(
  notLimitedStream,
  "not-limited-stream/urls.txt",
  "not-limited-stream/url-checks-results.txt"
);
