import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import FsOperationFailedError from "./error.js";
import { getConstants } from "../constants.js";

const { __dirname, FILES_DIR_NAME, ERRORS } = getConstants(import.meta.url);
const WRONG_FILE_NAME = "wrongFilename.txt";
const PROPER_FILE_NAME = "properFilename.md";

async function isFileExists(source) {
  try {
    await fsPromises.access(source, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const rename = async () => {
  const oldPath = path.join(__dirname, FILES_DIR_NAME, WRONG_FILE_NAME);
  const newPath = path.join(__dirname, FILES_DIR_NAME, PROPER_FILE_NAME);

  if (await isFileExists(newPath)) {
    throw new FsOperationFailedError(rename.name);
  }

  try {
    await fsPromises.rename(oldPath, newPath);
  } catch (err) {
    if (err.code === ERRORS.NO_ENTITY) {
      throw new FsOperationFailedError(rename.name);
    }
    console.error(err);
  }
};

rename().catch((err) => console.error(err));
