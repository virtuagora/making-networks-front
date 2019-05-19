import axios from 'axios';
// import store from '@/store'
// import router from '@/router'
// axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000;


// axios.interceptors.request.use(
//   (config) => {
//     if (store.state.session) {
//       config.headers.Authorization = `Bearer ${store.state.session.token}`;
//     }
//     return config;
//   },
//   err => Promise.reject(err),
// );

// axios.interceptors.response.use(
//   response => response,
//   (error) => {
//     console.error(error.response.data);
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           store.commit('logout');
//           router.push({
//             name: 'login',
//             query: {
//               redirect: router.currentRoute.fullPath,
//             },
//           });
//           break;
//         case 403:
//           router.push({
//             name: '403',
//           });
//           break;
//         // default:
//         //     r    outer.replace({
//         //         name: 'error'
//         //     })
//       }
//     }
//     return Promise.reject(error.response.data);
//   },
// );

export default axios;
