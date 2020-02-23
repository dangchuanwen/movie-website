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
}

module.exports = new Program();