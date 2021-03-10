const fs = require("fs");
const path = require("path");
const envsub = require("envsub");

module.exports = async (options) => {
  const buildDir = options.buildDir || path.resolve("build/");
  const envs = Object.entries(process.env).map(([key, value]) => {
    return { name: key, value };
  });
  const file = path.join(buildDir, "index.html");
  await envsub({ templateFile: file, outputFile: file, options: { envs } });
};
