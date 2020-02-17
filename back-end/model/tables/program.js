const Mysql = require("../mysql");
const config = require("../database/config");

class Program extends Mysql {
  constructor() {
    super(config);
  }
}

module.exports = new Program();