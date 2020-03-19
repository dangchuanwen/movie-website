import types from "./mutations-type";
import request from "@/utils/request";
const state = {
  program_info: {}
};

const mutations = {
  [types.SET_PROGRAM_INFO](state, new_info) {
    state.program_info = new_info;
  }
};

const actions = {
  async getOneOfTvPlayProgramInfo({ commit }, { id }) {
    let data = await request({
      method: "get",
      url: "/api/tvPlayProgramInfo",
      params: {
        id
      }
    });
    if (data && data.data && data.data.datas) {
      commit(types.SET_PROGRAM_INFO, data.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
