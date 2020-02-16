const { select } = require("./fragmentFactory");
const Mysql = require("../mysql");

class Base extends Mysql{
  constructor({ host, user_name, password, database, table_name }) {
    super(host, user_name, password, database);
    
    this.table_name = table_name;
    this.select = select;
  }
}

module.exports = Base;
