const {
  getComicDatasStart,
  getMovieDatasStart,
  getTvPlayDatasStart,
  getVarietyShowDatasStart
} = require("./programs.js");

async function start() {
 await getMovieDatasStart();
 await getTvPlayDatasStart();
 await getVarietyShowDatasStart();
 await getComicDatasStart();
}
start();