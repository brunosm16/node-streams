import axios from "axios";
import { PassThrough } from "stream";

const makeHeader = (fileName) => ({
  "Content-Type": "application/octet-stream",
  "X-filename": fileName,
});

export function uploadStream(fileName, host) {
  const conn = new PassThrough();

  const headers = makeHeader(fileName);

  axios.post(host, conn, { headers }).catch((err) => conn.emit(err));

  return conn;
}
