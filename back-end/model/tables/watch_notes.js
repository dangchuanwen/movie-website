const Mysql = require("../mysql");
const config = require("../database/config");

const { mergeSeriesQuery } = require("../utils");

class WatchNotes extends Mysql {
  constructor() {
    super(config);
    this.table_name = "watch_notes";
  }
  async getLatestWeekNotes(token) {
    const last_week_timestamp = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    const sql = `select * from ${this.table_name} where token='${token}' and timestamp > ${last_week_timestamp}`;
    let list = await this.query(sql);
    if (list) {
      let concurrentQueryResults = await mergeSeriesQuery(list, result => {
        const { program_id, table_name } = result;
        const sql = `select * from ${ table_name } where id=${program_id}`;
        return this.query(sql);
      });
      concurrentQueryResults.forEach((result, index) => {
        delete list[index].id;
        Object.assign(list[index], result[0]);
      });
      return Promise.resolve(list);
    } else {
      return Promise.resolve(false);
    }
  }
}

module.exports = new WatchNotes();
