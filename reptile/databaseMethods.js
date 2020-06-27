/** 将生成的sql文件中的记录批量插入到数据库中 */
const fs = require("fs");
const path = require("path");
const readLine = require("readline");

const onceInsertNum = 1000;

/**
 * 按行读取文件中记录，并将设置的多少行数据交给函数参数处理
 * @param { String } filePath 目标文件
 * @param { Number } onceNum 多少行执行一次函数参数
 * @param { Function } handle 处理函数
 */
function readFileByLine(filePath, onceNum, handle) {
  return new Promise((resolve, reject) => {
    try {
      const input = fs.createReadStream(filePath);
      const rl = readLine.createInterface({
        input,
      });

      let count = 0;
      let store = "";

      rl.on("line", (line) => {
        count++;
        store += line;
        if (count === onceNum) {
          const temp = store;
          count = 0;
          store = "";
          handle(temp);
        }
      });

      rl.on("close", (line) => {
        if (count !== 0) {
          handle(store);
          resolve();
        }
      });

    } catch(err) {
      reject(err);
    }

  });
}

/**
 * 将 baseOrder.sql 中的记录插入到 program 表中
 */
function insertToTable_program() {
  
}

/**
 * 将 baseName.sql 中的记录插入到 list 表中
 */
function insertToTable_list() {}
