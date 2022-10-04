const printChunk = (chunk) => {
  console.log("#######\n");
  console.log(`Chunk read`);
  console.log(`${chunk.toString()} | Bytes : ${chunk.length}`);
  console.log("\n#######\n");
};

process.stdin.on("readable", () => {
  let chunk = null;

  while ((chunk = process.stdin.read()) !== null) {
    printChunk(chunk);
  }
}).on('end', () => console.log('Read process ended'));
