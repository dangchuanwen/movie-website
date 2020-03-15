

const path = require("path");
const fs = require("fs");
const readline = require("readline");

const sql_file_path = path.join(__dirname, "./list.sql");

const { insert } = require("./mysql");

const handle = readline.createInterface({
  input: fs.createReadStream(sql_file_path)
});
let num = 0;
let count = 0;
let keys = "";
let values = "";
const table = "program";
let end = false;

handle.on("line",async line => {
  num ++;
  count ++;
  if(keys === "") {
    keys = line.match(/(\(.*\))values/)[1];
  }
  let value = line.match(/values(\(.*\))/)[1];
  if (count === 10000 || end) {
    values = values.slice(0, values.length - 1);
    const sql = `insert ignore into ${table} ${keys} values ${ values }`;
    values = "";
    let count_temp = count;
    let num_temp = num;
    count = 0;
    let result = await insert(sql);
    if (!result) {

    } else {
      console.log(`插入${ count_temp }条数据成功, 当前共插入${ num_temp }条数据`);
    }
  } else {
    values += `${value},`;
  }
  if (end && count > 0 && count < 10000) {
    console.log(`插入结束，共插入${ num }条数据`);
  }

});

handle.on("close",async () => {
  end = true;
});
