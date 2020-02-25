const Mysql = require("../mysql");
const config = require("../database/config");

function filter(value) {
  return value === "all" ? "%" : value;
}
function getTableName(program_type) {
  switch(program_type) {
    case "电影": return "movie";
    case "动漫": return "comic";
    case "综艺": return "variety_show";
    case "电视剧": return "tv_play";
    default: return "";
  }
}

class Program extends Mysql {
  constructor() {
    super(config);
  }
  async getProgramWallDatas({ program_type, program_classification, publish_year, publish_area, last_id, num }) {
    const table_name = getTableName(program_type);
    const sql = `select * from ${ table_name } where 
                 program_type='${program_type}' and
                 program_classification like '%${ filter(program_classification) }%' and
                 release_year like '${ publish_year }' and
                 program_area like '${ publish_area }' and
                 id > ${ last_id } 
                 limit ${num}
                `;
    const results = await this.query(sql);
    return Promise.resolve(results);
  }
  async searchProgram(key_word) {
    const tabs = ["movie", "tv_play", "comic", "variety_show"];
    let promises = [];
    let datas = [];
    tabs.forEach(tab => {
      const sql = `select name from (select name from ${tab} where name like '%${key_word}%') temp group by name;`;
      let promise = this.query(sql);
      promises.push(promise);
    });
    let results = await Promise.all(promises);
    if (results && results.length > 0) {
      results.forEach((result, index) => {
        //  data为一个表中查到的的数据
        result.forEach(item => {
          item.type = tabs[index];
          datas.push(item);
        });
      });
    }
    // 排序，关键字靠前的在前面, 长度短靠前
    datas.sort((prev, next) => {
      return prev.name.indexOf(key_word) - next.name.indexOf(key_word) || prev.name.length - next.name.length;
    });
    return Promise.resolve(datas);
  }
  async getProgramInfo(id, type) {
    const sql = `select * from ${ type } where id=${id} limit 1`;
    const result = await this.query(sql);
    return Promise.resolve(result);
  }
}

module.exports = new Program();