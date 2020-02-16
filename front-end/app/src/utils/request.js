import axios from "axios";

function request(options) {
  return axios(options)
    .then(res => res)
    .catch(error => {
      console.log("请求错误：" + error);
      return Promise.resolve({
        data: {
          status: 1,
          msg: error,
          datas: null
        }
      });
    });
}

export default request;
