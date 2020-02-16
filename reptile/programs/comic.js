const { analysePage } = require("../utils");

const { URL, NAME } = require("../config").COMIC;

async function getMovieDatasStart() {
  await analysePage(URL, NAME);
  return Promise.resolve();
}

module.exports = getMovieDatasStart;
