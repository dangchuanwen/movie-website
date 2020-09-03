import axios from "axios";
axios.defaults.baseURL = process.env.BASE_URL;
function request(options) {
  return axios(options)
    .then(res => res)
    .catch(error => {
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
