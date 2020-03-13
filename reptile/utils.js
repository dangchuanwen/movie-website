const superagent = require("superagent");
const cheerio = require("cheerio");
const { HOST } = require("./config");
const { createSqlFile } = require("./store/createSqlFile");
const fs = require("fs");
const path = require("path");

let count = 0;

// 等待函数
function wait_a_moment(interval) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

// 获取 $
function get$(href) {
  return new Promise((resolve, reject) => {
    superagent
      .get(href)
      .set({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36"
      })
      .then(res => {
        resolve(cheerio.load(res.text));
      })
      .catch(err => {
        const msg = `请求${href}出错：` + err;
        console.log(msg);
        fs.appendFile(
          path.join(__dirname, "/store/error_href.txt"),
          msg + "\n",
          "utf8",
          err => {
            if (err) {
              console.log("保存错误请求记录失败:" + err);
            }
          }
        );
        resolve(null);
      });
  });
}

// 从豆瓣获取 海报和评分
async function get_poster_and_score_from_douban(name) {
  const url = encodeURI(`https://www.douban.com/search?q=${name}`);
  const $ = await get$(url);
  if (!$) {
    return;
  }
  const first_result = $("div.result")[0];
  const poster = $(first_result)
    .find("div.pic img")
    .attr("src");
  const score = $(first_result)
    .find("span.rating_nums")
    .text();
  return Promise.resolve({
    poster,
    score
  });
}

// 获得下一页的 URL
function getNextPageUrl($) {
  const NEXT_URL = $("span.pagenow").next();
  if (!NEXT_URL) return null;
  return HOST + $(NEXT_URL).attr("href");
}

// 获得当前页所有的影视详情页链接
function getPageInfoLinks($) {
  const A_tags = Array.from($("span.xing_vb4 a"));
  const LINKS = A_tags.map(a => HOST + $(a).attr("href"));
  return LINKS;
}

// 分析某一页
async function analysePage(url, type) {
  const $ = await get$(url);
  if (!$) return;
  const NEXT_PAGE_URL = getNextPageUrl($);
  const INFO_LINKS = getPageInfoLinks($);

  for (let link of INFO_LINKS) {
    await wait_a_moment(100);
    storePageDatas(link, type);
  }

  if (NEXT_PAGE_URL) {
    await analysePage(NEXT_PAGE_URL, type);
  }

  // 将 store/error_href.txt 错误记录的链接重新请求
  handleErrorLink();

  return Promise.resolve();
}

// 处理请求错误的记录, 直到没有错误为止
async function handleErrorLink() {
  const error_links = await getErrorLinks();
  if (error_links.length === 0) {
    return;
  }
  for (let link of error_links) {
    await wait_a_moment(100);
    storePageDatas(link, type);
  }
  handleErrorLink();
}

// 获取 /store/error_href.txt 所有请求错误的记录
function getErrorLinks() {
  const filepath = path.join(__dirname, "/error_href.txt");
  return new Promise(resolve => {
    fs.readFile(filepath, "utf8", function(err, data) {
      if (err) {
        console.log("读取错误: " + err);
        resolve([]);
        return;
      }
      const links = data.match(/http:.+?.html/g);
      if (links && links.length > 0) {
        fs.writeFile(filepath, "", () => {});
        resolve(links);
      } else {
        resolve([]);
      }
    });
  });
}

// 保存详情页的数据
async function storePageDatas(url, program_type) {
  const $ = await get$(url);
  if (!$) return;

  count++;
  console.log(`${program_type}, 正在爬取第${count}条数据`);

  // 名称
  const name = $("div.vodh h2")
    .text()
    .trim();

  const LI_tags = Array.from($("div.vodinfobox li"));

  // 导演
  const director_name = Array.from($(LI_tags[1]).find("a"))
    .map(a => $(a).text())
    .join(" ");

  // 主演
  const main_performer = Array.from($(LI_tags[2]).find("a"))
    .map(a => $(a).text())
    .join(" ");
  
  // 类型
  const program_classification = $(LI_tags[3])
    .find("span")
    .text()
    .trim();

  // 地区
  const program_area = $(LI_tags[4])
    .find("a")
    .text()
    .trim();

  // 语言
  const program_language = $(LI_tags[5])
    .find("a")
    .text()
    .trim();

  // 发布年份
  const release_year = $(LI_tags[6])
    .find("a")
    .text()
    .trim();

  // 简介
  const program_introduce = $($("div.vodplayinfo")[1])
    .text()
    .trim();

  // 海报
  const poster_url = $("div.vodImg img").attr("src");

  // 评分 爬豆瓣受限制，暂时为 8，另写脚本慢爬豆瓣
  const program_score = 8.0;

  // 链接
  const INPUT_tags = Array.from($("div#play_1 input[name='copy_sel']"));
  INPUT_tags.forEach((input, index) => {
    let language = $(input).next().text().match(/HD(.*)\$/);
    const m3u8_link = $(input).attr("value");
    const fragment_order = index + 1;
    const fragment_number = INPUT_tags.length;

    if (language && language.length > 1) {
      language = language[1];
    } else {
      language = "";
    }

    if (language === "高清") {
      language = "";
    }


    createSqlFile({
      name,
      director_name,
      main_performer,
      program_classification,
      program_area,
      program_language,
      program_type,
      release_year,
      program_introduce,
      poster_url,
      program_score,
      m3u8_link,
      fragment_order,
      fragment_number,
      language
    });
  });
}

module.exports = {
  analysePage,
  storePageDatas
};
