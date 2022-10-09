import axios from "axios";

const makeHeader = (fileName) => ({
  "Content-Type": "application/octet-stream",
  "X-filename": fileName,
});

export const upload = (fileName, host, contentStream) => {
  const headers = makeHeader(fileName);
  return axios.post(host, contentStream, { headers });
};
