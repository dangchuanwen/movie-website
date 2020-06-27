/** 将生成的sql文件中的记录批量插入到数据库中 */
const fs = require("fs");
const path = require("path");
const readLine = require("readline");

const input = fs.createReadStream(path.resolve(__dirname, './log.txt'));
const rl = readLine.createInterface({
  input,
});


rl.on("line", (line) => {
  console.log('ing', line);  
});
rl.on("close", () => {
  console.log('end');
});
