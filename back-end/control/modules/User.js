const Response = require("../Response");

async function login(ctx) {
  const User = require("../../model/tables/user");
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
  const WatchNotes = require("../../model/tables/watch_notes");
  let token = ctx.cookies.get("token");

  if (!token) {
    token = 'dd';
  } 
  const datas = await WatchNotes.getLatestWeekNotes(token);
  ctx.body = Response(datas);
}

async function allWatchHistory(ctx) {
  const WatchNotes = require("../../model/tables/watch_notes");
  let token = ctx.cookies.get("token");
  if (!token) {
    token = 'dd';
  } 
  const datas = await WatchNotes.getAllWatchNotes(token);
  ctx.body = Response(datas);
}

async function storeProgress(ctx) {
  const WatchNotes = require("../../model/tables/watch_notes");
  const { id, currentTime, duration } = ctx.query;
  let token = ctx.cookies.get("token");
  if (!token) {
    token = 'dd';
  }
  const datas = await WatchNotes.storeProgress({ id, currentTime, duration, token });
  ctx.body = Response(datas);
}

module.exports = {
  login,
  watchHistory,
  allWatchHistory,
  storeProgress
}