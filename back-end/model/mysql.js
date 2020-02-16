const mysql = require("mysql");
const log = require("../log");
const store = require("../store");

let con = null;
class Mysql {
  constructor({ host, user_name, password, database }) {
    if (!con) {
      console.log("初始化链接句柄");
      con = mysql.createConnection({
        host,
        user: user_name,
        password,
        database
      });
      con.connect();
    }
  }
  query(sql) {
    return new Promise(resolve => {
      con.query(sql, function(error, results) {
        if (error) {
          const message = error.message;
          store.set("error_message", message);
          log(`${ message }, the error sql is: ${sql}`);
          resolve(false);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Mysql;
