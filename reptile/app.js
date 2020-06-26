const request = require("superagent");
const parseData = require("./parseData");
const writeToFile = require("./fileMethods");

/** 
 * 拼接 URL
 * @param { Number } page 页码数
 * @return { String } 拼接后的要爬取的URL 
 */
function getURL(page) {
    return `http://cj.123ku2.com:12315/inc/123kum3u8.php?ac=videolist&t=&pg=${page}&h=&ids=&wd=`;
}

let page = 1000;

async function run() {
    const URL = getURL(page);
    const res = await request.get(URL);
    if (!res || !res.text) {
        return;
    }

    const xml = res.text;
    const program_infos = await parseData(xml);
    const { pageCount } = program_infos;
    console.log(program_infos)
    // 将一页的所有节目信息写入到文件中
    await writeToFile(program_infos);

    page ++;
    
    if (page <= pageCount) {
        run();
    }
}

run();