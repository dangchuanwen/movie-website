let datas = [
  {
    id: 2,
    belong: "movie",
    program_score: Math.random(10) * 10,
    link_url: "/video?id=1&belong=comic",
    name: "中国机长",
    poster_url:
      "https://p.ssl.qhimg.com/d/dy_8256348c102f6662b463b0f2b59ddff1.jpg"
  }
];

for (let i = 0; i < 10; i++) {
  datas[0].id = i;
  datas.push(datas[0]);
}

module.exports = {
  status: 0,
  msg: "ok",
  datas
};
