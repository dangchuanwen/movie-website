const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'movie'
});

connection.connect();

function insert(sql) {
  return new Promise((resolve) => {
    const con = connection;
    con.query(sql, function(error, results) {
      if (error) {
        console.log(error);
        resolve(false);   
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  con: connection,
  insert
}



