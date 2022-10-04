import { createServer } from "http";
import Chance from "chance";

const chance = new Chance();

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  while (chance.bool({ likelihood: 50 })) {
    res.write(`${chance.toString()}\n`);
  }
  res.end("\n");
  res.on("finish", () => console.log("server ended execution | data sent"));
});

server.listen(6000, () => console.log("server running on port 6000"));
