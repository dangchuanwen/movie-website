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

const inc = `<span style="font-size: 14px; font-variant-ligatures: normal; orphans: 2; widows: 2; font-family: Tahoma, Helvetica, Arial, 微
软雅黑, sans-serif; color: rgb(102, 102, 102); background-color: rgb(248, 248, 248);">&nbsp;<span class="briefIntroTxt" style="font-size: 14px; font-variant-ligatures: normal; orphans: 2; widows: 2; font-family: Tahoma, Helvetica, Arial, 微软雅黑, sans-serif; color: rgb(51, 51, 51); line-height: 22px; background-color: rgb(248, 248, 248);">影片讲述了萌萌哒青蛙家族一直快乐的生活
在美丽的大沼泽里，但是一群牛蛙的到来，让青蛙家族'陷入了空前的危机中，在抵抗牛蛙逃亡之时，青蛙小黒萌与妈妈意外走散了，而大沼泽周
围即将建设的人类工厂更让青蛙家族无处安家，不得不集体迁徙，立志找到妈妈的小黑萌无奈跟随着青蛙家族一起去寻找属于它们的桃花源，在
充满着未知与危机的路途上，小黑萌到底能否寻找到妈妈呢？<br />`;
console.log(parseProgramIntroduce(inc))
let s = `123dqdq5dqw~~dqd22~`;
//console.log(s.replace(/[(a-z)(0-9)]/g, ""))


