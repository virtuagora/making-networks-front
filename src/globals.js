import store from '@/store';
// import http from '@/http';

const globals = {
  methods: {
    getValue(value) {
      if (value === undefined) return null;
      if (value === null) return null;
      return value;
    },
    isOptional(value) {
      if (value === null || value === '') {
        return null;
      }
      if (typeof value !== 'undefined' && value.length === 0) {
        return [];
      } return value;
    },
    isInputEmpty(value) {
      if (value === null || value === '') {
        return true;
      }
      if (typeof value !== 'undefined' && value.length === 0) {
        return true;
      } return false;
    },
    isObject(val) {
      return val !== null && typeof val === 'object' && Array.isArray(val) === false;
    },
    startLoading() {
      store.commit('setLoading', true);
    },
    stopLoading() {
      store.commit('setLoading', false);
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    // sizeFile(bytes) {
    //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    //   if (bytes == 0) return '-';
    //   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    //   return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
    // },
    // updateOrganizacion(id) {
    //   console.log('Updating organizacion...');
    //   http
    //     .get(`/organizacion/${id}`)
    //     .then((response) => {
    //       store.commit('setOrganizacion', response.data);
    //       console.log('GET OK - Got organizacion');
    //     })
    //     .catch((error) => {
    //       console.log('Fetching data failed.', error);
    //     });
    // },
  },
  computed: {
    apiUrl() {
      return process.env.VUE_APP_API_URL;
    },
    currentLanguage() {
      return document.documentElement.lang;
    },
  },
};

export default globals;
