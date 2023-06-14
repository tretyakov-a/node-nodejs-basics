import path from "path";
import fs from "fs";
import crypto from "crypto";
import { getConstants } from "../constants.js";

const { __dirname, FILES_DIR_NAME } = getConstants(import.meta.url);
const FILE_NAME = "fileToCalculateHashFor.txt";

const calculateHash = async () => {
  const pathToFile = path.join(__dirname, FILES_DIR_NAME, FILE_NAME);
  const hash = crypto.createHash("sha256");
  hash.setEncoding("hex");

  const readStream = fs.createReadStream(pathToFile);

  return await new Promise((resolve, reject) => {
    readStream.on("end", () => {
      hash.end();
      resolve(hash.read());
    });
    readStream.pipe(hash).on("error", (err) => reject(err));
  });
};

calculateHash().then((hash) => console.log(hash));
