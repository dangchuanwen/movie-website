const parseString = require("xml2js").parseString;

/**
 * 解析type字段
 * @param {String} type 节目类型
 * @return {Object} 返回{ program_type: val, program_classification: val }
 */
function parseType(type) {
  const lastFont = type.slice(type.length - 1);
  const res = {
    program_type: "",
    program_classification: type,
  };

  if (lastFont === "片") {
    res.program_type = "电影";
  } else if (lastFont === "剧") {
    res.program_type = "电视剧";
  } else {
    if (type.includes("综艺")) {
      res.program_type = "综艺";
    } else if (type.includes("动漫")) {
      res.program_type = "动漫";
    }
  }

  return res;
}


/**
 * 
 * @param {String} m3u8_string 包含语言的链接
 * @returns {Array} 节目的语言选项 
 */
function parseLanguage(m3u8_string) {
  const match = m3u8_string.match(/HD(.*?)\$/g);
  const languages = [];
  if (Array.isArray(match)) {
    match.forEach(item => {
      const language = item.match(/HD(.*?)\$/)[1];
      languages.push(language);
    });
  }
  return languages;
}


/**
 * 解析m3u8链接
 * @param {String} m3u8_string 包含连接的字符串
 * @return {Array} 节目的m3u8链接
 */
function parseM3U8(m3u8_string) {
  const m3u8_links = m3u8_string.match(/http.*?m3u8/g);
  return m3u8_links;
}


/**
 * @param { Number } low 闭区间低位
 * @param { Number } high 闭区间高位
 * @return { Number } 随机评分
 */
function randomScore(low = 8.0, high = 9.5) {
  const deca_low = low * 10;
  const deca_high = high * 10;
  const r = Math.random();
  const deca_score = Math.ceil( 
    (deca_high - deca_low) * r + deca_low 
  );
  const score = (deca_score / 10).toFixed(1);
  return score;  
}

/**
 * 提取节目介绍中的中文，去掉html标签
 * @param { String } program_introduce 节目介绍
 * @return { String } 返回的内容
 */
function parseProgramIntroduce(program_introduce) {
  program_introduce = program_introduce.replace(/[(\n)(&nbsp;)]/g, "");
  program_introduce = program_introduce.replace(/[(')(")]/g, "’");
  let res = program_introduce.replace(/<.*?>/g, "");
  return res;
}

/**
 * 解析xml
 * @param {String} xml 待处理的xml字符串
 * @return {Object} 节目的各种信息（和数据库文档一致）
 *
 * 返回的数据字段：
 *      name => 名字
 *      poster_url => 海报地址，暂时不存在自己的服务器
 *      program_language => 语言
 *      program_area => 国家地区
 *      release_year => 发布年份
 *      main_performer => 主演
 *      director_name => 导演
 *      program_introduce => 节目介绍
 *      program_type => 节目类型(电影，电视剧...)
 *      program_classification => 节目分类(搞笑， 恐怖)
 *      m3u8_links => 视频链接
 *
 *      pageCount => 总共多少页数据
 */
function parse(xml) {
  return new Promise((resolve, reject) => {
    const programs = [];
    let pageCount = 0;
    parseString(xml, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      pageCount = res.rss.list[0].$.pagecount;
      const videos = res.rss.list[0].video;
      
      videos.forEach((video) => {
        let name = video.name[0],
          type = video.type[0],
          poster_url = video.pic[0],
          program_language = video.lang[0],
          program_area = video.area[0],
          note = video.note[0],
          release_year = video.year[0],
          main_performer = video.actor[0],
          director_name = video.director[0],
          program_introduce = video.des[0];

        // 解析 type
        const { program_type, program_classification } = parseType(type);

        // 解析 m3u8链接
        let m3u8_string = video.dl[0].dd[0]._;
        const m3u8_links = parseM3U8(m3u8_string);

        // 评分随机 8.0 - 9.5
        const program_score = randomScore();

        // 解析链接中的语言
        const language = parseLanguage(m3u8_string);

        // 提取节目介绍中的中文，去掉标签内容, 以及替换英文引号为中文引号
        program_introduce = parseProgramIntroduce(program_introduce);
        // 是否显示
        const is_show = program_classification.indexOf("伦理") !== -1 ? 0 : 1;

        /* 其他数据无需解析*/

        // 当前节目解析完毕，添加到 res 中
        programs.push({
          name,
          poster_url,
          program_language,
          program_area,
          release_year,
          note,
          main_performer,
          director_name,
          program_introduce,
          program_type,
          program_classification,
          m3u8_links,
          language,
          program_score,
          is_show
        });

      });
    });
    programs.pageCount = pageCount;
    // 解析完毕，resolve出去, 交给写入程序处理
    resolve(programs);
  });
}

module.exports = parse;
