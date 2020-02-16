import request from "./request";

export async function login() {
  await request({
    method: "get",
    url: "/api/login"
  });
}
