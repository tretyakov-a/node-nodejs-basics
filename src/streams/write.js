import path from "path";
import fs from "fs";
import { getConstants } from "../constants.js";

const { __dirname, FILES_DIR_NAME } = getConstants(import.meta.url);
const FILE_NAME = "fileToWrite.txt";

const write = async () => {
  const pathToFile = path.join(__dirname, FILES_DIR_NAME, FILE_NAME);
  const writeStream = fs.createWriteStream(pathToFile);

  process.stdin.pipe(writeStream).on("error", (err) => console.error(err));
};

write();
