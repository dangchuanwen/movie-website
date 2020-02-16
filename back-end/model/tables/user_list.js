const Mysql = require("../mysql");
const config = require("../database/config");

class User extends Mysql {
  constructor() {
    super(config);
    this.table_name = "user_list";
  }
  async check(token) {
    const sql = `select id from ${ this.table_name } where token='${ token }' limit 1`;
    const result = await this.query(sql);
    if (result.length > 0) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
  async addUser(token) {
    const sql = `insert into ${ this.table_name } (token)values('${ token }')`;
    const result = await this.query(sql);
    console.log(typeof result);
    if (typeof result !== "string") {
      return Promise.resolve("success");
    } else {
      return Promise.resolve("fail");
    }
  }
}

module.exports = new User();