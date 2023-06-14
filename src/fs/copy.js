import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import FsOperationFailedError from "./error.js";
import { getConstants } from "../constants.js";

const { __dirname, FILES_DIR_NAME, ERRORS } = getConstants(import.meta.url);

const copyDir = async (src, dest) => {
  await fsPromises.mkdir(dest);
  const files = await fsPromises.readdir(src, { withFileTypes: true });
  await Promise.all(
    files.map((file) => {
      const srcFilePath = path.join(src, file.name);
      const destFilePath = path.join(dest, file.name);
      return file.isDirectory()
        ? copyDir(srcFilePath, destFilePath)
        : fsPromises.copyFile(srcFilePath, destFilePath);
    })
  );
};

const copy = async () => {
  const pathToDir = path.join(__dirname, FILES_DIR_NAME);
  const pathToDirCopy = path.join(__dirname, `${FILES_DIR_NAME}-copy`);
  try {
    await fsPromises.access(pathToDir, fs.constants.F_OK);
    await copyDir(pathToDir, pathToDirCopy);
  } catch (err) {
    if (err.code === ERRORS.NO_ENTITY || err.code === ERRORS.EXIST) {
      throw new FsOperationFailedError(copy.name);
    }
    console.error(err);
  }
};

copy().catch((err) => console.error(err));
