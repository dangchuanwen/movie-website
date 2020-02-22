const res = {
  status: 0,
  msg: "ok",
  datas: [
    {
      name: "电影",
      key: "movie",
      classifications: [
        { name: "全部类型" },
        { name: "喜剧片" },
        { name: "剧情片" },
        { name: "论理片" },
        { name: "科幻片" },
        { name: "爱情片" },
        { name: "动作片" },
        { name: "恐怖片" },
        { name: "惊悚" },
        { name: "战争片" }
      ]
    },
    {
      name: "电视剧",
      key: "tv_play",
      classifications: [
        { name: "全部类型" },
        { name: "国产剧" },
        { name: "美国剧" },
        { name: "韩国剧" },
        { name: "泰国剧" },
        { name: "日本剧" },
        { name: "海外剧" },
        { name: "香港剧" }
      ]
    },
    {
      name: "综艺",
      key: "variety_show",
      classifications: [{ name: "全部类型" }, { name: "动漫" }]
    },
    {
      name: "动漫",
      key: "comic",
      classifications: [{ name: "全部类型" }, { name: "综艺" }]
    }
  ]
};

module.exports = res;
