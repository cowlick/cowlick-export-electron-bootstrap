"use strict";
import * as fs from "fs";
import * as path from "path";
import * as commandpost from "commandpost";
import {bootstrap} from "./Bootstrap";

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"));

const root = commandpost
  .create<{}, {}>("cowlick-export-electron-bootstrap")
  .version(packageJson.version, "-v, --version")
  .action(() => {
    return bootstrap(process.cwd());
  });

commandpost
  .exec(root, process.argv)
  .then(() => {
    process.stdout.write("");
    process.exit(0);
  }, err => {
    console.error("uncaught error", err);
    if (err.stack) {
      console.error(err.stack);
    }
    process.stdout.write("");
    process.exit(1);
  });
