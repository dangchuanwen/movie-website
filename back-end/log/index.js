const fs = require("fs");
const path = require("path");
function log(content) {
  fs.appendFile(path.join(__dirname, "log.txt"), `${content} ${ new Date() }\n`, () => {});
}

module.exports = log;