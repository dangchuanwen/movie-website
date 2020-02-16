const sql_file_path = "F:/demo/list.sql";

const path = require("path");
const fs = require("fs");
const readline = require("readline");

const { con } = require("./mysql");

const handle = readline.createInterface({
  input: fs.createReadStream(sql_file_path)
});

let prefix = "",
  insert_sql,
  count = 0,
  insert_num = 1000,
  start_time = new Date().getTime();

function select(sql) {
  return new Promise((resolve) => {
    con.query(sql, function(err, result) {
      if (err) {
        resolve(err.message);
      } else {
        resolve(result);
      }
    });
  })
}
function insert(sql) {
  sql = sql.slice(0, sql.length - 1) + ";";
  return new Promise((resolve, reject) => {
    con.query(sql, null, function(err) {
      
      if (err) {
        const { message, sql } = err;
        fs.appendFile( path.join(__dirname, "/log.txt"), `${message}\n`, () => {});
      } 
      resolve();

    });
  });
}
function addIgnoe(line) {
  return line.replace(/insert /, "insert ignore ");
}
function getTabName(line) {
  return line.match(/into (.*) \(name/)[1];
}

function getPrefix(line) {
  return line.match(/(.*)values/)[1] + "values";
}

handle.on("line", line => {
  // 添加 ignore 忽略重复数据
  line = addIgnoe(line);

  // 只执行一次，获取前缀
  if (!prefix) {
    prefix = getPrefix(line);
    insert_sql = prefix;
  }

  // 判断是否换表
  const last_table_name = getTabName(prefix);
  const now_table_name = getTabName(line);
  if (now_table_name !== last_table_name) {
    // 立即插入
    insert(insert_sql);
    count = 0;
    prefix = getPrefix(line);
    insert_sql = prefix;
  } else {
    insert_sql += `${line.match(/values(\(.*\))/)[1]},`;    
    
    count ++;
    if (count === insert_num) {
      insert(insert_sql);
      count = 0;
      insert_sql = prefix;
    }
  }
});

handle.on("close",async () => {
  if (count > 0) {
    await insert(insert_sql);
    const select_sql = `select sum(num) as num from (select count(*) as num from movie union select count(*) as num from tv_play union select count(*) as num from comic union select count(*) as num from variety_show) as t;`;
    let data = await select(select_sql);
    let end_time = new Date().getTime();
    let use_time = end_time - start_time;
    let num = 0;
    if (data instanceof Array) {
      num = data[0].num;
    }
    console.log(`全部插入结束, 用时：${ use_time / 1000 } 秒, 共插入：${ num }条数据`);
  }
});
