function parseProgramIntroduce(program_introduce) {
  program_introduce = program_introduce.replace(/[(\n)(&nbsp;)]/g, "");
  program_introduce = program_introduce.replace(/[(')(")]/g, "’");
  let res = program_introduce.replace(/<.*?>/g, "");
  return res;
}

const introduce = `dqwdq"dqwdq`;
console.log(parseProgramIntroduce(introduce))