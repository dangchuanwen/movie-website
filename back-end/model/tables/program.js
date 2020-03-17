const Mysql = require("../mysql");
const config = require("../database/config");

function filter(value) {
  return value === "all" ? "%" : value;
}

class Program extends Mysql {
  constructor() {
    super(config);
  }

  async getProgramWallDatas({ program_type, program_classification, release_year, publish_area, last_id, num }) {
    const sql = `select * from list where 
                 program_type='${program_type}' and
                 program_classification like '%${ filter(program_classification) }%' and
                 release_year like '${ filter(release_year) }' and
                 program_area like '${ filter(publish_area) }' and
                 id > ${ last_id } 
                 limit ${num}
                `;
    let results = await this.query(sql);
    
    // 为每条数据添加 link_url 字段
    if (results && results.length > 1) {
      results.forEach(item => {
        item.link_url = `/video?id=${item.id}`;
      });
    }
    return Promise.resolve(results);
  }

  async searchProgram(key_word) {
    if (!key_word) {
      return [];
    }
    let promises = [];
    let datas = [];
    const likes = [`'${key_word}%'`, `'%${key_word}'`];
    likes.forEach(like => {
      const sql = `select name from list where name like ${like} limit 10`;
      promises.push(this.query(sql));
    });
    let results = await Promise.all(promises);
    results.forEach(result => {
      datas.push(...result);
    });
    // 排序，关键字靠前的在前面, 长度短靠前
    datas.sort((prev, next) => {
      return prev.name.indexOf(key_word) - next.name.indexOf(key_word) || prev.name.length - next.name.length;
    });
    // 返回前 8个数据
    datas = datas.slice(0, 8);
    return Promise.resolve(datas);
  }

  async getProgramInfo(id) {
    const sql = `select * from program where id=${id} limit 1`;
    const result = await this.query(sql);
    if (result && result.length > 0) {
      // 添加 src, belong, type属性
      result.forEach(item => {
        item.src = item.m3u8_link;
        item.type = item.program_type;
      });
    }
    return Promise.resolve(result);
  }

  async getOnePlotProgramInfo(name, plot) {
    
    const sql = `select * from program where name='${ name }' and fragment_order=${plot} limit 1`;
    
    const result = await this.query(sql);
    if (result && result.length > 0) {
      // 添加src, type属性
      result.forEach(item => {
        item.src = item.m3u8_link;
        item.type = item.program_type;
      });
    }

    return Promise.resolve(result);
  }

  async getSearchResult({ key_word, last_id, num }) {
    const sql = `select * from list where name like '%${key_word}%' and id > ${last_id} order by id limit ${num}`;
    const result = await this.query(sql);
    return Promise.resolve(result);
  }
}

module.exports = new Program();