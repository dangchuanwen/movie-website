import types from "./mutations-type.js";
import request from "@/utils/request";

const state = {
  http_params_changed: false, // 如果参数改变，这个值立马改变，从而达到监听参数改变
  movie_wall_datas: [],
  http_params: {
    last_id: 0, //最后一个数据的 id
    program_type: "电影", // 节目类型（电影，电视剧，综艺，动漫）
    program_classification: "all", // 分类（喜剧，动作...)
    publish_year: "all", // 发布年份
    publish_area: "all", // 出版地区
    num: 10
  }
};

const mutations = {
  [types.SET_MOVIE_WALL_DATAS](state, new_datas) {
    state.movie_wall_datas = new_datas;
    if (new_datas.length === 0) {
      state.http_params.last_id = 0;
    } else {
      state.http_params.last_id = new_datas[new_datas.length - 1].id;
    }
  },
  [types.ADD_MOVIE_WALL_DATAS](state, new_datas) {
    this.commit(
      `classification/movie_wall_module/${types.SET_MOVIE_WALL_DATAS}`,
      [...state.movie_wall_datas, ...new_datas]
    );
  },
  [types.UPDATE_HTTP_PARAMS](state, { key, value }) {
    state.http_params_changed = !state.http_params_changed;
    // 将数据置空
    this.commit(
      `classification/movie_wall_module/${types.SET_MOVIE_WALL_DATAS}`,
      []
    );
    if (/全部/g.test(value)) {
      state.http_params[key] = "all";
    } else {
      state.http_params[key] = value;
    }
    // 每次都要更新 last_id 为0
    state.http_params.last_id = 0;
    this.dispatch("classification/movie_wall_module/initMovieWallDatas");
  }
};

const actions = {
  async getMovieWallDatas(/*请求参数从state中获得*/ { state }) {
    let data = await request({
      params: state.http_params,
      method: "get",
      url: "/api/movieWallDatas"
    });
    return new Promise(resolve => {
      resolve(data);
    });
  },
  async initMovieWallDatas({ commit, dispatch }) {
    // 初始化 last_id = 0
    let data = await dispatch("getMovieWallDatas");
    return new Promise((resolve, reject) => {
      if (data && data.data && data.data.datas) {
        commit(types.SET_MOVIE_WALL_DATAS, data.data.datas);
        resolve();
      } else {
        reject(data.data.msg);
      }
    });
  },
  async loadMoreMovieWallDatas({ commit, dispatch }) {
    let data = await dispatch("getMovieWallDatas");
    return new Promise((resolve, reject) => {
      if (data && data.data && data.data.datas) {
        commit(types.ADD_MOVIE_WALL_DATAS, data.data.datas);
        resolve(data.data.datas.length > 0);
      } else {
        reject(data.data.msg);
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
