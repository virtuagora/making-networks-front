<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideNavbar"/>
    <RouterView />
    <b-loading ref="loader" :active="isLoading"></b-loading>
    <Footer v-if="!$route.meta.hideFooter"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',

  components: {
    Navbar,
    Footer,
  },
  beforeCreate() {
    // this.$http.get('/user')
    //   .then((res) => {
    //     this.$store.commit('setUser', res.data);
    //     this.$store.commit('setAuthenticated', true);
    //     const current = this.$router.currentRoute.matched[0].name;
    //     if (current === 'login' || current === 'register') {
    //       this.$router.push({ name: 'home' });
    //     }
    //   }).catch(() => {
    //     this.$store.commit('setAuthenticated', false);
    //   });
  },
  computed: {
    showNavbar() {
      if (this.$route.matched.some(record => record.meta.withNavbar === false)) return false;
      // default
      return true;
    },
    showFooter() {
      if (this.$route.matched.some(record => record.meta.withFooter === false)) return false;
      // default
      return true;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/sass/app.scss";
</style>
