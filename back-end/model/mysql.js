const mysql = require("mysql");
const log = require("../log");
const store = require("../store");

class Mysql {
  constructor({ host, user_name, password, database }) {
    this.con = null;
    this.host = host;
    this.user_name = user_name;
    this.password = password;
    this.database = database;
    this.connect();
  }
  connect() {
    if (this.con !== null) {
      return;
    }
    console.log("初始化链接句柄");
    const { host, user_name, password, database } = this;
    this.con = mysql.createConnection({
      host,
      user: user_name,
      password,
      database
    });
    this.con.connect();
    this.con.on("error", (err) => {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Mysql 断线重连");
        this.con.end();
        this.con = null;
        this.connect();
      }
    });
  }
  query(sql) {
    return new Promise((resolve) => {
      this.con.query(sql,  (error, results) => {
        if (error) {
          const message = error.message;
          store.set("error_message", message);
          log(`${message}, the error sql is: ${sql}`);
          if (message === `Cannot enqueue Query after fatal error.`) {
            console.log('重新查询');
            resolve(this.query(sql));
          } else {
            resolve(false);
          }
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Mysql;
