/**
 * 将节目数据写入文件中，写入的格式为 (k1, k2, k3...)values(v1, v2, v3)
 * 参数包含的有关节目的信息：
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
 * 额外需要写入的信息(参数中不携带的)：
 *      fragment_number => 更新到多少集，equal to m3u8_links.length
 *      fragment_order => 第几集, equal to index of m3u8_links
 *      language => 节目语言，解析 url 中的语言，若不按语言分，则为空
 */


 
const fs = require("fs");
const path = require("path");

/**
 * 将记录（一条或多条）追加写入到文件中
 * @param { String } content 写入的内容
 * @param { String } path 文件路径 
 * @return { VoidFunction }  
 */
function writeFile(content, path) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, content, 'utf8', (err) => {
      if(err) {
        reject(err);
        return;
      }
      resolve();
    });
  });  
}

/**
 * 
 * @param { Object } program_info 节目信息
 * @param { Array } keys 需要写入的值的键
 * @return { String } 返回的插入记录 
 */
function _createInsertNote(program_info, keys) {
  let note = '';
  
  let keysString = "(",
      valuesString = "(";

  keys.forEach(key => {
    const val = program_info[key];
    keysString += `${key},`;
    valuesString += `'${val}',`;
  });
  
  keysString = keysString.slice(0, keysString.length - 1);
  valuesString = valuesString.slice(0, valuesString.length - 1);
  
  keysString += ")";
  valuesString += ")";

  note = `${keysString}values${valuesString}`;
  
  return note;
}


/**
 * 生成插入的记录
 * @param { Object } program_info 节目信息
 * 
 */
function createInsertNote(program_info) {
  const keys = [
    'name',
    'program_type',
    'poster_url',
    'fragment_number',
    'fragment_order',
    'director_name',
    'main_performer',
    'program_classification',
    'program_area',
    'program_language',
    'release_year',
    'program_introduce',
    'program_score',
    'm3u8_link',
    'language',
    'is_show'
  ];
  const note = _createInsertNote(program_info, keys);
  return note;
}





/**
 * 以节目的名字为基本单位写入文件, 意味着一个名字只有一条记录
 * @param { Object } program_info 节目信息
 */
function writeToFileBaseName(program_info) {
  const program = Object.assign({}, program_info);
  program.fragment_number = Array.isArray(program.m3u8_links) && program.m3u8_links.length || 1;
  program.fragment_order = 1;
  program.language = (program.language.length > 0 && program.language[0]) || "";
  program.m3u8_link = program.m3u8_links[0];
  
  const content = createInsertNote(program) + "\n";
  return writeFile(content, path.resolve(__dirname, "./baseName.sql"));
}






/**
 * 以节目的集数或语言为单位写入文件，意味着一个名字可能有多条记录
 * @param { Object } program_info 节目信息
 */
function writeToFileBaseOrder(program_info) {
  let content = "";
  const { m3u8_links, language } = program_info;
  const program = Object.assign({}, program_info);
  program.fragment_number = Array.isArray(program.m3u8_links) && program.m3u8_links.length || 1;
  m3u8_links.forEach((link, index) => {
    program.fragment_order = index + 1;
    program.language = (language.length > 0 && language[index]) || "";
    program.m3u8_link = link;
    content += createInsertNote(program) + "\n";
  });
  return writeFile(content, path.resolve(__dirname, "./baseOrder.sql"));
}


async function writeToFile(program_infos) {
  for (let program of program_infos) {
    try {
      await writeToFileBaseOrder(program);
      await writeToFileBaseName(program);
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = writeToFile;