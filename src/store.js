import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'creating-networks-vuex',
  storage: window.localStorage,
  reducer: state => ({ userToken: state.userToken, isAuthenticated: state.isAuthenticated }),
  filter: mutation => mutation.type === 'setUserToken',
});

export default new Vuex.Store({
  state: {
    isLoading: false,
    isAuthenticated: false,
    userToken: null,
    firstFecth: false,
    lastTimeUpdated: Date.now(),
    fetchService: {
      initiative: null,
    },
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
    setUserToken(state, userToken) {
      // eslint-disable-next-line
      state.userToken = userToken
    },
    setInitiative(state, initiative) {
      // eslint-disable-next-line
      state.fetchService.initiative = initiative
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    user: (state) => {
      if (state.userToken) return state.userToken.subject;
      return null;
    },
    accessToken: (state) => {
      if (state.userToken) return state.userToken.access_token;
      return null;
    },
    initiative: (state) => {
      if (state.fetchService.initiative) return state.fetchService.initiative;
      return null;
    },
    isAuthenticated: state => state.isAuthenticated,
  },
  actions: {
    login(context, userToken) {
      context.commit('setAuthenticated', true);
      context.commit('setUserToken', userToken);
    },
    logout(context) {
      context.commit('setAuthenticated', false);
      context.commit('setUserToken', null);
    },
  },
  plugins: [vuexLocal.plugin],
});
