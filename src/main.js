import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Buefy from 'buefy';
import enValidationMessages from 'vee-validate/dist/locale/en';
import esValidationMessages from 'vee-validate/dist/locale/es';
import ptValidationMessages from 'vee-validate/dist/locale/pt_BR';
import VeeValidate from 'vee-validate';
import VueMapbox from 'vue-mapbox';
import Mapbox from 'mapbox-gl';
import VueParticles from 'vue-particles';

import globals from './globals';
import translations from './i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './http';

const getTranslation = () => translations[document.documentElement.lang];

Vue.mixin(globals);
Vue.use(VueI18n);
Vue.use(VueParticles);
Vue.use(Buefy, getTranslation().globals.buefyOptions);
Vue.use(VueMapbox, { mapboxgl: Mapbox });

// Vue.use(Croppa, { componentName: 'vue-croppa' });
// Ready translated locale messages
// Create VueI18n instance with optionss
const i18n = new VueI18n({
  locale: document.documentElement.lang, // set locale
  fallbackLocale: 'en',
  messages: translations, // set locale messages
});

Vue.use(VeeValidate, {
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
    en: enValidationMessages,
    es: esValidationMessages,
    pt: ptValidationMessages,
  },
});

// Axios configuration
// go to http.js to configure axios according to your needs
Vue.prototype.$http = http;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  http,
  i18n,
  render: h => h(App),
}).$mount('#app');
