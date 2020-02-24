const Mysql = require("../mysql");
const config = require("../database/config");

class SearchNote extends Mysql {
  constructor() {
    super(config);
  }
  async getMostSearchNames() {
    let datas = [];
    const limit = 5;
    const sql = `select count(*) as num, name from search_note group by name order by num desc limit ${ limit }`;
    const results = await this.query(sql);
    if (results && results.length > 0) {
      results.forEach(item => datas.push(item.name));
    }
    return Promise.resolve(datas);
  }
}

module.exports = new SearchNote();