const Mysql = require("../mysql");
const config = require("../database/config");
const { queryCustomDatas } = require("../utils");
class BannerList extends Mysql {
  constructor() {
    super(config);
    this.queryCustomDatas = queryCustomDatas;
  }
  async getBannerList() {
    let datas = await this.queryCustomDatas("banner_list");
    return Promise.resolve(datas);
  }
}

module.exports = new BannerList();
