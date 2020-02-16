const config = require("../config");
const fs = require("fs");
const path = require("path");
const { insert } = require("../sql");

function getTabName(program_type) {
  let table_name = "";
  switch(program_type) {
    case "电影": 
      table_name = config.MOVIE.TABLE_NAME;
      break;
    case "电视剧":
      table_name = config.TV_PLAY.TABLE_NAME;
      break;
    case "综艺":
      table_name = config.VARIETY_SHOW.TABLE_NAME;
      break;
    case "动漫":
      table_name = config.COMIC.TABLE_NAME;
  }
  if (!table_name) {
    throw new Error("表名不正确：" + table_name);
  }
  return table_name;
}
function createSqlFile(data) {
  const table_name = getTabName(data.program_type);
  const sql = insert(table_name).map(data);
  fs.appendFile(path.join(__dirname, "/list.sql"), sql + "\n", "utf8", err => {
    if (err) {
      console.log("写入sql文件失败:" + err);
    }
  });
}

module.exports = {
  createSqlFile
};

