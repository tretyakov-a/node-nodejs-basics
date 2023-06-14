import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import "./files/c.js";
import { getConstants } from "../constants.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const { __dirname, __filename } = getConstants(import.meta.url);

const random = Math.random();

const filePath = path.join(
  __dirname,
  random > 0.5 ? "files/a.json" : "files/b.json"
);
const unknownObject = require(filePath);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
