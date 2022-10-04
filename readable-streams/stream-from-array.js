import { Readable } from "stream";

const users = [
  {
    name: "Jonh Doe Jr",
    age: 24,
  },
  {
    name: "Jonh Doe Sir",
    age: 84,
  },
  {
    name: "Jonh Doe III",
    age: 14,
  },
];

const usersStream = Readable.from(users);

usersStream.on('data', (chunk) => console.log(chunk.name + chunk.age)).on('end', () => console.log('usersStream ended'))
