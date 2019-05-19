<template>
    <p>Naking Networks yay</p>
</template>

<script>
export default {
  data() {
    return {
      showMobileNav: false,
    };
  },
  methods: {
    toggleMobileNav() {
      this.showMobileNav = !this.showMobileNav;
    },
    closeMobileNav() {
      this.showMobileNav = false;
    },
    logout() {
      this.showMobileNav = false;
      this.$http
        .post('/user/logout')
        .then(() => {
          this.$store.dispatch('logout');
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    authenticated() {
      return this.$store.state.isAuthenticated;
    },
    user() {
      return this.$store.state.user;
    },
    audio() {
      return this.$store.state.audio;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
// .image.avatar {
//   // border: 1px solid #fff;
//   height: 100%;
//   // width: 2.4rem;
// }
// nav.navbar {
//   background-image: url("../assets/img/wood-header-01.jpg");
//   background-size: cover;
//   background-position: center-center;
//   box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 1);
//   font-family: "Caudex";
//   font-weight: 700;
//   font-size: 1.15rem;
//   // text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.384);
// }
</style>
