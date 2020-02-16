
const movie = require("./programs/movie");
const tv_play = require("./programs/tv_play");
const variety_show = require("./programs/variety_show");
const comic = require("./programs/comic");

module.exports = {
  getMovieDatasStart: movie,
  getTvPlayDatasStart: tv_play,
  getVarietyShowDatasStart: variety_show,
  getComicDatasStart: comic
}