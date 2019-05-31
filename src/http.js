import axios from 'axios';
import { Toast } from 'buefy/dist/components/toast';
import translations from './i18n';
import store from '@/store';
// import router from '@/router'
// axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000;

const getTranslation = () => translations[document.documentElement.lang];

axios.interceptors.request.use(
  (config) => {
    if (store.state.userToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${store.state.userToken.access_token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

axios.interceptors.response.use(
  response => response,
  (error) => {
    console.error(error.response.data);
    if (error.response) {
      Toast.open({
        message: `<i class="fas fa-exclamation-triangle"></i> ${getTranslation().globals.errors[error.response.data.code]}`,
        type: 'is-danger',
      });
    }
    return Promise.reject(error);
  },
);

export default axios;
