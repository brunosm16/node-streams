import path from "path";
import { fileURLToPath } from "url";

export default (currentDir) => {
  const __filename = fileURLToPath(currentDir);

  return path.dirname(__filename);
};
