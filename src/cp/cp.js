import path from "path";
import { fork } from "child_process";
import { getConstants } from "../constants.js";

const { __dirname, FILES_DIR_NAME } = getConstants(import.meta.url);
const FILE_NAME = "script.js";

const spawnChildProcess = async (args) => {
  const scriptSrc = path.join(__dirname, FILES_DIR_NAME, FILE_NAME);

  const child = fork(scriptSrc, args);

  child.on("error", (err) => {
    console.error(err);
  });

  child.on("close", (code) => {
    console.log(`Child process closed with code ${code}. `);
  });
};

spawnChildProcess(["arg1", "arg2"]);
