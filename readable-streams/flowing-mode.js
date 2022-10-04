process.stdin
  .on("data", (chunk) => {
    console.log("New data\n");

    console.log(`${chunk.toString()}`);
  })
  .on("end", () => console.log("Flowing mode ended"));
