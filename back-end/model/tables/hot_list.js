const Mysql = require("../mysql");
const config = require("../database/config");
const { queryCustomDatas } = require("../utils");
class HotList extends Mysql {
  constructor() {
    super(config);
    this.queryCustomDatas = queryCustomDatas;
  }
  async getHotList() {
    let datas = await this.queryCustomDatas("hot_list");
    return Promise.resolve(datas);
  }
}

module.exports = new HotList();
