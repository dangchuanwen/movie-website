// 模块 store
import program_type_module from "../modules/ProgramTypeModule/store";
import classification_module from "../modules/ClassificationModule/store";
import movie_wall_module from "../modules/MovieWallModule/store";

const state = {};

const mutations = {};

const actions = {};

const modules = {
  program_type_module,
  classification_module,
  movie_wall_module
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules
};
