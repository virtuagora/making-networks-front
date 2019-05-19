import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    isAuthenticated: false,
    user: {},
    firstFecth: false,
    lastTimeUpdated: Date.now(),
  },
  mutations: {
    setLoading(state, loading) {
      // eslint-disable-next-line
      state.isLoading = loading;
    },
    setAuthenticated(state, isAuthenticated) {
      // eslint-disable-next-line
      state.isAuthenticated = isAuthenticated;
    },
    setUser(state, user) {
      // eslint-disable-next-line
      state.user = user
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    user: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
  },
  actions: {
    login(context, userData) {
      context.commit('setAuthenticated', true);
      context.commit('setUser', userData);
    },
    updateUser(context, userData) {
      context.commit('setUser', userData);
    },
    logout(context) {
      context.commit('setAuthenticated', false);
      context.commit('setUser', {});
    },
  },
});
