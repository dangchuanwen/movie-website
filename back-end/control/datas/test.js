const Mysql = require("../../model/mysql");
const config = require("../../model/database/config");
const path = require("path");
const fs = require("fs");
const programTypes = require("./programTypes");

function deleteSame(arr) {
  let new_arr = [];
  arr.forEach(item => {
    if (new_arr.findIndex(name => name === item) === -1) {
      new_arr.push(item);
    }
  });
  return new_arr;
}
function splitSpace(str) {
  if (str === "") {
    return [];
  }
  let res = [];
  let s = "";
  for (let i = 0, len = str.length; i < len; i++) {
    if (str.charCodeAt(i) === 160 || str.charCodeAt(i) === 32) {
      res.push(s);
      s = "";
    } else {
      s += str[i];
    }
  }
  res.push(s);
  return res;
}
const mysql = new Mysql(config);
const tabs = ["movie", "tv_play", "variety_show", "comic"];
const colums = ["program_classification", "program_area", "release_year"];
const keys = ["program_classification", "publish_area", "publish_year"];

async function getColumnKind(tab, colum) {
  const sql = `select ${colum} from ${tab} group by ${colum} order by ${colum} desc`;
  const results = await mysql.query(sql);
  let store = [];
  results.forEach(item => {
    store.push(...splitSpace(item[colum]));
  });
  store = deleteSame(store);
  if (colum === "release_year") {
    let year = new Date().getFullYear();
    store = store.filter(item => item.length === 4 && item <= year);
  }
  store = store.map(item => ({ name: item }));
  store.unshift({
    name: "全部类型"
  });
  return Promise.resolve(store);
}

async function start() {
  for (let i = 0; i < tabs.length; i ++) {
    const tab = tabs[i];
    let classifications = [];
    for (let index = 0; index < colums.length; index++) {
      let colum = colums[index];
      let datas = await getColumnKind(tab, colum);
      classifications.push({
        key: keys[index],
        datas
      });
    }
    programTypes[i].classifications = classifications;
  }
  return Promise.resolve();
}

start().then(() => {
  let datas = JSON.stringify(programTypes);
  fs.appendFile(path.join(__dirname, "data.js"), datas, () => {});
})
