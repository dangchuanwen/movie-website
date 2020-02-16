const Mysql = require("../mysql");
const config = require("../database/config");
const { queryCustomDatas } = require("../utils");
class HotRecommend extends Mysql {
  constructor() {
    super(config);
    this.queryCustomDatas = queryCustomDatas;
  }
  async getHotRecommend() {
    const datas = await this.queryCustomDatas("hot_recommend");
    return Promise.resolve(datas);
  }
}

module.exports = new HotRecommend();