const fs = require("fs");
const path = require("path");

/**
 * 记录错误，写入到 log.txt
 * @param { Error } err 错误 
 */
function log(err) {
  const { stack } = err;
  const content = `\n${stack}${new Date()}\n`;
  fs.appendFile(path.resolve(__dirname, "./log.txt"), content, "utf8", (e) => {});
} 

module.exports = { log };