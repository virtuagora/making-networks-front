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
      initiativeContext: null,
      userProfile: null,
      video: null,
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
    updateSubjectUserAvatar(state, payload) {
      // eslint-disable-next-line
      Vue.set(state.userToken.subject, 'img_type', payload.imgType);
      Vue.set(state.userToken.subject, 'img_hash', payload.imgHash);
      state.lastTimeUpdated = Date.now();
    },
    setInitiative(state, initiative) {
      // eslint-disable-next-line
      state.fetchService.initiative = initiative.data;
      state.fetchService.initiativeContext = initiative.context;
    },
    setUserProfile(state, userProfile) {
      // eslint-disable-next-line
      state.fetchService.userProfile = userProfile
    },
    setVideo(state, video) {
      // eslint-disable-next-line
      state.fetchService.video = video
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
    initiativeContext: (state) => {
      if (state.fetchService.initiative) return state.fetchService.initiativeContext;
      return null;
    },
    userProfile: (state) => {
      if (state.fetchService.userProfile) return state.fetchService.userProfile;
      return null;
    },
    video: (state) => {
      if (state.fetchService.video) return state.fetchService.video;
      return null;
    },
    isAdmin: (state) => {
      if (state.userToken && state.userToken.subject.roles_list && state.userToken.subject.roles_list.length > 0) {
        return state.userToken.subject.roles_list.includes('Admin');
      }
      return false;
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
