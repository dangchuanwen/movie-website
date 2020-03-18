import axios from "axios";
if (!process && !process.env) {
  axios.defaults.baseURL = "http://movie.isay.xn--6qq986b3xl";
}
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
