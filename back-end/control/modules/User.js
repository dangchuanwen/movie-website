const Response = require("../Response");
const User = require("../../model/tables/user");
const WatchNotes = require("../../model/tables/watch_notes");
async function login(ctx) {
  const md5 = require("md5");
  const token = ctx.cookies.get("token");
  const user_agent = ctx.request.header['user-agent'];
  const timestamp = new Date().getTime();
  const existence = await User.check(token);
  let new_token;
  let message = "";

  if (!existence) {
    new_token = md5(timestamp + user_agent);
    let result = await User.addUser(new_token);
    if (result === "success") {
      message = "this is a new user and it registers successfully!";
    } else {
      message = "this is a new user but it registers failly!";
    }
  } else {
    new_token = token;
    message = "this is a old user.";
  }
  // 不管是否新用户，都要刷新到期时间
  ctx.cookies.set("token", new_token, {
    expires: new Date(timestamp + 30 * 24 * 60 * 60 * 1000), //一个月到期
    httpOnly: true
  });
  ctx.body = Response(message);
}

async function watchHistory(ctx) {
  let token = ctx.cookies.get("token");
  if (!token) {
    token = 'dd';
  } 
  const datas = await WatchNotes.getLatestWeekNotes(token);
  ctx.body = Response(datas);
}

async function allWatchHistory(ctx) {
  let token = "dd";
  if (!token) {
    token = 'dd';
  } 
  const datas = await WatchNotes.getAllWatchNotes(token);
  ctx.body = Response(datas);
}

module.exports = {
  login,
  watchHistory,
  allWatchHistory
}