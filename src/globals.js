import store from '@/store';
// import http from '@/http';
// import { transform, isEqual, isObject } from 'lodash';
import { transform, isEqual } from 'lodash';

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
    isEmptyObject(obj) {
      return !obj || Object.keys(obj).length === 0;
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
    getSpaceLocalization(space) {
      if (space.localization && space.localization[this.currentLanguage]) {
        return space.localization[this.currentLanguage].name;
      }
      return space.name;
    },
    makeUserAvatar(sub) {
      if (sub) {
        switch (sub.img_type) {
          case 1:
            return `https://www.gravatar.com/avatar/${sub.img_hash}?d=mm&s=256`;
          default:
            return `https://www.gravatar.com/avatar/${sub.img_hash}?d=mm&s=256`;
        }
      }
      return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp';
    },
    /**
     * Deep diff between two object, using lodash
     * @param  {Object} original  Original object not modified
     * @param  {Object} modified  Original object but modified
     * @return {Object} Return a new object who represent the diff
     */
    diffObject(original, modified) {
      // return transform(object, (result, value, key) => {
      //   if (!isEqual(value, base[key])) {
      //     result[key] = isObject(value) && isObject(base[key]) ? this.diffObject(value, base[key]) : value;
      //   }
      // });
      return transform(modified, (result, value, key) => {
        if (!isEqual(value, original[key])) {
          // eslint-disable-next-line no-param-reassign
          result[key] = value;
        }
      });
    },
  },
  computed: {
    apiUrl() {
      return process.env.VUE_APP_API_URL;
    },
    currentLanguage() {
      return document.documentElement.lang;
    },
    user() {
      return this.$store.getters.user;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    userAvatarUrl() {
      if (this.user) {
        switch (this.user.img_type) {
          case 1:
            return `https://www.gravatar.com/avatar/${this.user.img_hash}?d=mm&s=256`;
          default:
            return `https://www.gravatar.com/avatar/${this.user.img_hash}?d=mm&s=256`;
        }
      }
      return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp';
    },
  },
};

export default globals;
