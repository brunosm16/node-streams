import { basename } from "path";

export default (contentType, encoding, filename) => ({
  "Content-Type": contentType,
  "Content-Encoding": encoding,
  "X-filename": basename(filename),
});
