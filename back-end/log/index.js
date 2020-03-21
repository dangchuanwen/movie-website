const fs = require("fs");
const path = require("path");

function logFileExist() {
  return new Promise((resolve, reject) => {
    fs.exists(path.join(__dirname, "log.txt"), function(exists) {
      resolve(exists);
    });
  });
}

function createLogFile() {
  return new Promise((resolve) => {
    fs.writeFile(path.join(__dirname, "log.txt"), "", function(err) {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

async function log(content) {
  const exists = await logFileExist();
  if (!exists) {
    await createLogFile();
  }
  fs.appendFile(path.join(__dirname, "log.txt"), `${content} ${ new Date() }\n`, () => {});
}

module.exports = log;