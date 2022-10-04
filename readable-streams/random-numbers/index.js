import { GenerateURLs } from "./generate-urls.js";

const urlGenerator = new GenerateURLs();

const printUrl = (chunk) => {
  console.log(`new data arrived`);
  console.log(`${chunk.toString()}`);
  console.log("\n");
};

urlGenerator
  .on("data", (chunk) => printUrl(chunk))
  .on("end", () => console.log(`urlGenerator stream ended | emittedBytes : ${urlGenerator.emittedBytes}`));
