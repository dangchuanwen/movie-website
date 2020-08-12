const request = require("superagent");
const parseData = require("./parseData");
const writeToFile = require("./fileMethods");
const { log } = require("./log");

/**
 * 拼接 URL
 * @param { Number } page 页码数
 * @return { String } 拼接后的要爬取的URL
 */
function getURL(page) {
  return `http://cj.123ku2.com:12315/inc/123kum3u8.php?ac=videolist&t=&pg=${page}&h=&ids=&wd=`;
}

let page = 1;

async function run() {
  try {
    const URL = getURL(page);
    const res = await request.get(URL);
    if (!res || !res.text) {
      return;
    }

    const xml = res.text;
    const program_infos = await parseData(xml);
    const { pageCount } = program_infos;
    // 将一页的所有节目信息写入到文件中
    await writeToFile(program_infos);
    console.log(`第${page}页写入完成`);

    page++;
    if (page <= Number(pageCount)) {
      run();
    }
  } catch(err) {
    console.log("错误终止：" + err.message);
    log(err);
    console.log(`继续爬`);
    page ++;
    run();
  }
}

run();
