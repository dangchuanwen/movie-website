let datas = [
  {
    program_score: Math.random(10) * 10,
    link_url: "",
    name: "中国机长",
    poster_url:
      "https://p.ssl.qhimg.com/d/dy_8256348c102f6662b463b0f2b59ddff1.jpg"
  }
];

for (let i = 0; i < 10; i++) {
  datas.push(datas[0]);
}

module.exports = {
  status: 0,
  msg: "ok",
  datas
};
