let datas = [
  {
    score: Math.random(10) * 10,
    link_url: "http://v.usfun.top:1024/inc/play.php?mid=g6nnahH5R0X6SB",
    name: "中国机长",
    movie_img_url:
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
