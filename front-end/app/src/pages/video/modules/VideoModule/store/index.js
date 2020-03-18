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
  async getOneOfTvPlayProgramInfo({ commit }, { id, plot }) {
    let data = await request({
      method: "get",
      url: "/api/tvPlayProgramInfo",
      params: {
        id,
        plot
      }
    });
    if (data && data.data && data.data.datas) {
      commit(types.SET_PROGRAM_INFO, data.data.datas[0]);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
