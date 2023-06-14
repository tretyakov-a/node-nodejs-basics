import fsPromises from "fs/promises";
import path from "path";
import FsOperationFailedError from "./error.js";
import { getConstants } from "../constants.js";

const { __dirname, FILES_DIR_NAME, ERRORS } = getConstants(import.meta.url);
const FILE_NAME = "fileToRemove.txt";

const remove = async () => {
  const pathToFile = path.join(__dirname, FILES_DIR_NAME, FILE_NAME);
  try {
    await fsPromises.rm(pathToFile);
  } catch (err) {
    if (err.code === ERRORS.NO_ENTITY) {
      throw new FsOperationFailedError(remove.name);
    }
    console.error(err);
  }
};

remove().catch((err) => console.error(err));
