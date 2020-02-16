const store = require("../store");
function result(msg, status, datas) {
  return JSON.stringify({
    msg,
    status,
    datas
  });
}
function Response (datas) {
  if (!datas) {
    const error_message = store.get("error_message");
    return result(error_message, 1, []);
  } else {
    return result("ok", 0, datas);
  }
}

module.exports = Response;