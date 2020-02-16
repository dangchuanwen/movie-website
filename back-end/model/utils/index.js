function mergeSeriesQuery(results, query) {
  let promises_store = [];
  results.forEach(result => {
    promises_store.push(query(result));
  });
  return Promise.all(promises_store);
}
async function queryCustomDatas(table) {
  const sql = `select * from ${table}`;
  let list = await this.query(sql);

  let promises_store = mergeSeriesQuery(list, (result) => {
    // 二次查询
    const { program_id, table_name } = result;
    const sql = `select * from ${ table_name } where id=${ program_id } limit 1`;
    return this.query(sql);
  });

  let promises_datas = await promises_store;
  promises_datas.forEach((result, index) => {
    delete result[0].poster_url;
    delete list[index].id;
    Object.assign(list[index], result[0]);
  });
  return Promise.resolve(list);
}


module.exports = {
  queryCustomDatas,
  mergeSeriesQuery
}
