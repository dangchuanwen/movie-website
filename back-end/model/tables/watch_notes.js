const Mysql = require("../mysql");
const config = require("../database/config");

const { mergeSeriesQuery } = require("../utils");

class WatchNotes extends Mysql {
  constructor() {
    super(config);
    this.table_name = "watch_notes";
  }

  async storeProgress({ currentTime, duration, id, token }) {
    // 首先判断下 该用户是否看过这个节目, 判断 token and program_id 字段
    let saw = false;
    let sql = `select id from watch_notes 
              where token='${token}' 
              and program_id=${id}`;
    let result = await this.query(sql);
    if (result && result.length > 0) {
      saw = true;
    }
    const timestamp = new Date().getTime();
    // 判断有没有看过
    if (saw) {
      // 看过, 更新
      sql = `update watch_notes 
            set watch_time_length=${currentTime}, 
                timestamp='${timestamp}'  
            where program_id=${id} and token='${token}'`;
    } else {
      // 没看过，插入
      sql = `insert into watch_notes (program_id, watch_time_length, time_length, token, timestamp) 
            values(${id}, ${currentTime}, ${duration}, '${token}', '${timestamp}')`;
    }

    result = await this.query(sql);
    return result ? {} : false;
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

      // 去重，除去名字相同的
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
        const { program_id } = result;
        const sql = `select * from program where id = ${program_id}`;
        return this.query(sql);
      });
      concurrentQueryResults.forEach((result, index) => {
        // 删除 watch_notes 表的id
        delete list[index].id;
        // 删除 table_name 表的 time_length 冲突了
        delete result[0].time_length;
        Object.assign(list[index], result[0]);
      });

      // 将 timestamp 解析成日期，并创建 map, Key为日期, Value为某一天的所有记录
      let map = {};
      list.forEach(item => {
        const timestamp = Number(item.timestamp);
        const date = new Date(timestamp);
        const form_date = `${date.getFullYear()}.${date.getMonth() +
          1}.${date.getDate()}`;
        // 加一个前缀 'date' 作为Key
        const key = "date" + form_date;
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
            item.link_url = `/video?id=${item.id}`;
            item.progress = (item.watch_time_length / item.time_length).toFixed(
              2
            );
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
