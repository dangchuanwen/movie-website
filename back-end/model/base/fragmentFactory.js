let isEndOfUse = true;

function continueToUse() {
  isEndOfUse = false;
  clearTimeout(readyToQuery.timer);
}

function query(sql) {
  console.log(sql);
}

function readyToQuery(sql) {
  isEndOfUse = true;
  readyToQuery.timer = setTimeout(() => {
    if (isEndOfUse) {
      query(sql);
    }
  }, 0);
}

function select(cols) {
  continueToUse();

  const table_name = this.table_name;
  const fragment = "select " + cols.join(",") + " ";

  readyToQuery(`${ fragment } from ${ table_name }`);

  return {
    from(table_names) {
      return from(fragment, table_names);
    }
  }
}

function hijackGet(tables) {
  const handler = {
    get: function(target, key) {
      return `${ target.name }.${ key }`;
    }
  }
  return tables.map(table => new Proxy(table, handler));
}

function from(last_fragment, table_names) {
  continueToUse();

  const fragment = `from ${table_names.join(",")}` + " ";

  readyToQuery(last_fragment + fragment);

  const tables = table_names.map(item => ({ name: item }) );
  const proxy_tables = hijackGet(tables);
  return {
    where(fn) {
      let fn_result = fn( ...proxy_tables  );
      return where(last_fragment + fragment, fn_result);
    }
  }
}

function where(last_fragment, condition_arr) {
  continueToUse();

  let fragment = "where ";
  condition_arr.forEach(condition => {
    if (condition[1] === "=") {
      condition[2] = `'${condition[2]}'`;
    }
    fragment += condition.join("") + " and ";
  });
  fragment = fragment.slice(0, fragment.length - 4);
  
  readyToQuery(last_fragment + fragment);
}

module.exports = {
  select
}
