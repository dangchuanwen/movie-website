const request = require("superagent");
const parseString = require("xml2js").parseString;

/**
 * 提取节目介绍中的中文，去掉html标签
 * @param { String } program_introduce 节目介绍
 * @return { String } 返回的内容
 */
function parseProgramIntroduce(program_introduce) {
  program_introduce = program_introduce.replace("\n", "");
  program_introduce = program_introduce.replace("&nbsp;", "");
  let res = program_introduce.replace(/<.*?>/g, "");
  return res;
}
/**
 * 拼接 URL
 * @param { Number } page 页码数
 * @return { String } 拼接后的要爬取的URL
 */
function getURL(page) {
  return `http://cj.123ku2.com:12315/inc/123kum3u8.php?ac=videolist&t=&pg=${page}&h=&ids=&wd=`;
}

let page = 78;

async function run() {
  const URL = getURL(page);
  const res = await request.get(URL);
  console.log(`爬取第${page}页`);
  if (!res || !res.text) {
    console.log("爬取错误, 结束程序");
    return;
  }

  const xml = res.text;
  parseString(xml, (err, res) => {
    if (err) {
      return;
    }
    const videos = res.rss.list[0].video;
    videos.forEach((video) => {
      const introduce = video.des[0];
      console.log(parseProgramIntroduce(introduce));
      console.log();
    });
  });

  page++;
  setTimeout(() => {
    run();
  }, 500);
}

run();
