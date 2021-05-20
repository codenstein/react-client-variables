#!/usr/bin/env node
const fs = require("fs");
const { parse } = require("node-html-parser");
const path = require("path");

// @TODO Add a configuration file that allows for setting up and configuring
//  environment variable libraries.
require("dotenv").config();

const prefix = "REACT_APP_";

// @TODO Add configuration file for build directory path
const buildDir = path.resolve("build/");
const file = path.join(buildDir, "index.html");

const html = fs.readFileSync(file);
const root = parse(html);

const head = root.querySelector("head");
head.insertAdjacentHTML(
  "beforeend",
  (function () {
    const script = [];
    const env = [];
    Object.entries(process.env || {})
      .filter(([key]) => key.startsWith(prefix))
      .forEach(([_key, value]) => {
        const key = _key.substr(prefix.length);
        script.push(`const ${key} = "${value}";`);
        env.push(`"${key}": ${["`${", key, "}`"].join("")}`);
      });

    script.push(`window["$$client-variables"] = { ${env.join(",")} };`);

    return [
      '<script id="react-client-variables" type="text/javascript">',
      script.join(""),
      "</script>",
    ].join("");
  })()
);

fs.writeFileSync(file, root.toString());
