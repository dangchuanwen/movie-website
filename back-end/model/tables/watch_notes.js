const Mysql = require("../mysql");
const config = require("../database/config");

const { mergeSeriesQuery } = require("../utils");

class WatchNotes extends Mysql {
  constructor() {
    super(config);
    this.table_name = "watch_notes";
  }
  async getLatestWeekNotes(token) {
    // 最近一周的观看记录
    const last_week_timestamp = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    const sql = `select * from ${this.table_name} where token='${token}' and timestamp > ${last_week_timestamp}`;
    
    let list = await this.query(sql);
    if (list) {
      let concurrentQueryResults = await mergeSeriesQuery(list, result => {
        const { program_id } = result;
        const sql = `select * from program where id=${program_id}`;
        return this.query(sql);
      });

      concurrentQueryResults.forEach((result, index) => {
        delete list[index].id;
        Object.assign(list[index], result[0]);
        // 添加belong 和 link_url 字段
        const item = list[index];
        item.link_url = `/video?id=${item.id}`;
      });

      return Promise.resolve(list);
    } else {
      return Promise.resolve(false);
    }
  }
  async getAllWatchNotes(token) {
    // 全部的历史记录
    const sql = `select * from ${this.table_name} where token='${token}' order by id desc`;
    let list = await this.query(sql);
    if (list) {
      let concurrentQueryResults = await mergeSeriesQuery(list, result => {
        const { program_id, table_name } = result;
        const sql = `select * from ${ table_name } where id = ${program_id}`;
        return this.query(sql);
      });
      concurrentQueryResults.forEach((result, index) => {
        // 删除 watch_notes 表的id
        delete list[index].id;
        // 删除 table_name 表的 time_length 冲突了
        delete result[0].time_length;
        Object.assign(list[index], result[0]);
      });
      // 将 timestamp 解析成日期，并创建 map, 日期为Key, Value为记录数组
      let map = {};
      list.forEach(item => {
        const timestamp = Number(item.timestamp);
        const date = new Date(timestamp);
        const form_date = `${ date.getFullYear() }.${ date.getMonth() + 1 }.${ date.getDate() }`;
        // 加一个前缀 'date' 作为Key
        const key = 'date' + form_date;
        if (!map[key]) {
          map[key] = [];
        }
        map[key].push(item);
      });
      // 将 map 转换成 api 数据格式，然后返回
      let datas = [];
      for (let key of Object.keys(map).sort((a, b) => b - a)) {
        const date = key.slice(4);
        // 添加 belong, link_url, progress属性
        const list = map[key];
        if (list && list.length > 0) {
          list.forEach(item => {
            item.belong = item.table_name;
            item.link_url = `/video?id=${item.id}&belong=${item.belong}`;
            item.progress = (item.watch_time_length / item.time_length).toFixed(2);
          });
        }
        datas.push({
          date,
          list: map[key]
        });
      }
      
      return Promise.resolve(datas);
    } else {
      return Promise.resolve(false);
    }
  }
}

module.exports = new WatchNotes();
