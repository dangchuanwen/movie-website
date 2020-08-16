// 读取 baseName.sql, baseOrder.sql 生成插入语句的sql文件

const fs = require("fs");
const readline = require("readline");
const path = require("path");
const { log } = require("./log");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "movie",
});

con.connect();

function insert(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) {
        log(err);
        reject();
      } else {
        resolve();
      }
    });
  });
}

function appendFile(fileName, content) {
  return new Promise((resolve, reject) => {
    fs.appendFile(fileName, content, (err) => {
      if (err) {
        log(err);
      }
      resolve();
    });
  });
}

/**
 * 按行读取数据文件，生成插入语句的 sql文件
 * @param {String} fileName 数据文件名
 * @param {Number} onceCount 一个 insert 语句插入的数据数量
 * @param {String} tabName 表名
 */
function generateInsertSql(fileName, onceCount, tabName) {
  const fRead = fs.createReadStream(fileName);
  const readHandle = readline.createInterface({
    input: fRead,
  });
  let keys = "";
  let count = 0;
  let insertSql = "";
  readHandle.on("line", (line) => {
    if (!keys && line) {
      keys = line.match(/\(.*?\)/)[0];
    }

    const match = line.match(/values(\(.*\))/);
    if (Array.isArray(match) && match[1]) {
      const values = match[1];
      if (count === 0) {
        insertSql = `insert ignore into ${tabName} ${keys}values`;
      }
      insertSql += values + ",";
      count++;

      if (count === onceCount) {
        const copyInsertSql = insertSql.slice(0, insertSql.length - 1) + ";";
        insert(copyInsertSql).then(() => {
          console.log("插入完成");
        }, () => {
          appendFile(path.join(__dirname, "./temp.txt"), copyInsertSql);
        });
        count = 0;
      }
    }
  });
  readHandle.on("close", () => {});
}

generateInsertSql(path.join(__dirname, "./baseName.sql"), 1000, "program_info");
