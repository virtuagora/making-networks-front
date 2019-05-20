<template>
  <nav class="tags is-large floating-navbar" v-if="user">
    <b-dropdown aria-role="list" position="is-bottom-left">
      <img class="image" :src="userAvatarUrl" slot="trigger" role="button">
      <b-dropdown-item custom aria-role="menuitem">
        Logged as
        <b>{{user.display_name}}</b>
      </b-dropdown-item>
      <hr class="dropdown-divider">
      <b-dropdown-item aria-role="listitem" has-link>
        <a @click="logout" class="has-text-link">
          <i class="fas fa-sign-out-alt"></i>&nbsp;Log out
        </a>
      </b-dropdown-item>
    </b-dropdown>
  </nav>
  <router-link :to="{name: 'login'}" class="floating-navbar has-text-primary" v-else><i class="fas fa-sign-in-alt fa-2x"></i></router-link>
</template>

<script>
export default {
  data() {
    return {
      showMobileNav: false
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
      this.$store.dispatch("logout");
      // this.$http
      //   .post('/v1/logout')
      //   .then(() => {
      //     this.$store.dispatch('logout');
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    }
  }
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
.floating-navbar {
  position: absolute;
  z-index: 1000;
  right: 10px;
  top: 10px;
  img {
    width: 36px;
    border-radius: 100px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
