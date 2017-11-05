"use strict";
import {promisify} from "util";
import {readFile} from "fs";
import * as path from "path";
import {exec} from "child_process";
import * as semver from "semver";
import axios from "axios";

const packageName = "cowlick-export-electron";

const readFilePromise = promisify(readFile);
const execPromise = promisify(exec);

const npmInstall = "npm install --no-save";

export async function bootstrap(baseDir: string) {
  let pkg;
  try {
    const file = await readFilePromise(path.join(baseDir, `node_modules/${packageName}/package.json`), "utf8");
    pkg = JSON.parse(file);
  } catch(e) {
    console.log(`${packageName} is not installed.
${npmInstall} ${packageName}`);
    return execPromise(`${npmInstall} ${packageName}`);
  }
  const response = await axios.get(`https://registry.npmjs.org/${packageName}/latest`);
  if(response.status === 200) {
    const latest = response.data;
    if(semver.lt(pkg.version, latest.version)) {
      console.log(`found next version.
${npmInstall} ${packageName}@${latest.version}`);
      return execPromise(`${npmInstall} ${packageName}@${latest.version}`);
    } else {
      console.log(`${packageName}@${latest.version} is already latest.`);
      return Promise.resolve({});
    }
  } else {
    return Promise.reject(response);
  }
}
