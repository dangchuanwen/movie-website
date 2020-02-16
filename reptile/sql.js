
function map(table_name, maps) {
  let sql = `insert into ${ table_name } `;
  
  let keys = "(";
  let values = "(";
  
  for (let key in maps) {
    keys += `${ key },`;
    values += `"${ String(maps[key]).replace(/('|")/g, "’") }",`;
  }  
  keys = keys.slice(0, keys.length - 1);
  values = values.slice(0, values.length - 1);

  keys += ")";
  values += ")";

  sql = sql + keys + "values" + values + ";";
  return sql;
}
function insert(table_name) {
  if (!table_name) {
    throw new Error("Please give table_name");
  }
  return {
    map: function(maps) {
      if (!maps) {
        throw new Error("Please give maps.");
      }
      return map(table_name, maps);
    }
  }  
}

module.exports = {
  insert
}





