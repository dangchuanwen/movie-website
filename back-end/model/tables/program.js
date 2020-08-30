const Mysql = require("../mysql");
const config = require("../database/config");

function filter(value) {
  return value === "all" ? "%" : value;
}

class Program extends Mysql {
  constructor() {
    super(config);
  }

  async getProgramWallDatas({ token, program_type, program_classification, release_year, publish_area, last_id, num }) {
    let sql = `select * from list where
                 is_show=1 and 
                 program_type='${program_type}' and
                 program_classification like '%${ filter(program_classification) }%' and
                 release_year like '${ filter(release_year) }' and
                 program_area like '${ filter(publish_area) }' and
                 id > ${ last_id } 
                 limit ${num}
                `;
    let results = await this.query(sql);
    let datas = results;
    // 查询当前节目用户观看的集数，为每条数据添加 link_url 字段
    if (results && results.length > 1) {
      for (let item of results) {       
          const { name } = item;
          sql = `select watch_notes.program_id, 
                program.fragment_order as plot,
                program.language  
                from watch_notes, program 
                where program.name='${name}' 
                and program.id=watch_notes.program_id 
                and watch_notes.token='${token}'
                order by watch_notes.id desc limit 1`;
          results = await this.query(sql);
          if (results && results.length > 0) {
            const { language, plot, program_id } = results[0];
            // 重写节目的 id
            item.id = program_id;
            if (language) {
              item.link_url = `/video?id=${item.id}&language=${language}`;
            } else {
              item.link_url = `/video?id=${item.id}&plot=${plot}`;
            }
          } else {
            item.link_url = `/video?id=${item.id}&plot=1`;
          }
      }
    }
    return Promise.resolve(datas);
  }

  async searchProgram(key_word) {
    if (!key_word) {
      return [];
    }
    let promises = [];
    let datas = [];
    const likes = [`'${key_word}%'`, `'%${key_word}'`];
    likes.forEach(like => {
      const sql = `select name from list where is_show=1 and name like ${like} limit 10`;
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

  async getOnePlotProgramInfo({ id, token }) {
    let datas = [];
    let sql = `select * from program where id=${id}`;
    let result = await this.query(sql);
    datas = result;
    if (!result) {
      return false;
    }

    if (datas && datas.length > 0) {

      // 添加src, type属性
      const item = datas[0];
      item.src = item.m3u8_link;
      item.type = item.program_type;
      
      // 添加 plots, languages属性
      let plots = [];
      let languages = [];
      for (let i = 1; i <= item.fragment_number; i ++) {
        plots.push(i);
      }
      if (item.language) {
        // 查询所有的语言
        sql = `select language from program where name='${item.name}' group by language order by id asc`;
        result = await this.query(sql);
        if (result && result.length > 0) {
          result.forEach(row => {
            if (row.language) {
              languages.push(row.language);
            }
          });
        }
      }
      item.plots = plots;
      item.languages = languages;
      
      // 查询用户是否观看以及观看时长
      sql = `select * from watch_notes where token='${token}' and program_id=${item.id} `;
      result = await this.query(sql);
      if (result && result.length > 0) {
        const currentTime = result[0].watch_time_length;
        const duration = result[0].time_length;
        item.currentTime = currentTime;
        item.duration = duration;
      }

    } 

    return Promise.resolve(datas[0]);
  }

  async getSearchResult({ key_word, last_id, num }) {
    const sql = `select * from program where name like '%${key_word}%' and id > ${last_id} and fragment_order=1 order by id limit ${num}`;
    const result = await this.query(sql);
    if (result && result.length > 0) {
      result.forEach(item => {
        item.link_url = `/video?id=${item.id}`;
      });
    }
    return Promise.resolve(result);
  }

  async getRealId({ id, plot, language }) {
    // 先查询名字
    let sql = `select name from program where id=${id}`;
    let result = await this.query(sql);
    if (result && result.length > 0) {
      const name = result[0].name;
      // 查询真实id, plot or language
      if (plot) {
        sql = `select id from program where name='${name}' and fragment_order=${plot} `;
      } else if (language) {
        sql = `select id from program where name='${name}' and language='${language}' `;
      }
      
      result = await this.query(sql);
      if (result && result.length > 0) {
        return {
          plot,
          id: result[0].id
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}

module.exports = new Program();