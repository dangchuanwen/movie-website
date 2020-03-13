
const movie = require("./movie");
const tv_play = require("./tv_play");
const variety_show = require("./variety_show");
const comic = require("./comic");

module.exports = {
  getMovieDatasStart: movie,
  getTvPlayDatasStart: tv_play,
  getVarietyShowDatasStart: variety_show,
  getComicDatasStart: comic
}