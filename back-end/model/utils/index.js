/**
 * 二次并发查询，根据每条数据的信息进行二次查询
 * @param {Array(第一次查询获取的数组)} results 
 * @param {Function(result: 数组中的一条数据) => {}} query 
 */
function mergeSeriesQuery(results, query) {
  let promises_store = [];
  results.forEach(result => {
    promises_store.push(query(result));
  });
  return Promise.all(promises_store);
}
async function queryCustomDatas(table) {
  // 返回自定义表的数据, 表中必须有 tabl_name 字段
  const sql = `select * from ${table}`;
  let list = await this.query(sql);

  let promises_store = mergeSeriesQuery(list, (result) => {
    // 二次查询
    const { program_id } = result;
    const sql = `select * from list where id=${ program_id } limit 1`;
    return this.query(sql);
  });

  let promises_datas = await promises_store;
  promises_datas.forEach((result, index) => {
    delete result[0].poster_url;
    delete list[index].id;
    Object.assign(list[index], result[0]);
    // 添加 belong 和 link_url 字段
    const item = list[index];
    item.belong = item.table_name;
    item.link_url = `/video?id=${item.id}`;
  });
  return Promise.resolve(list);
}


module.exports = {
  queryCustomDatas,
  mergeSeriesQuery
}
