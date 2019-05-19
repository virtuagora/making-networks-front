<template>
  <nav class="floating-navbar" v-if="user">
<b-dropdown aria-role="list" position="is-bottom-left" >
            <img class="image" :src="userAvatarUrl" slot="trigger" role="button" />

            <b-dropdown-item aria-role="listitem" has-link >
              <a @click="logout">
              <i class="fas fa-sign-out-alt"></i>&nbsp;Log out
              </a>
              </b-dropdown-item>
        </b-dropdown>
  </nav>
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
        .post('/v1/logout')
        .then(() => {
          this.$store.dispatch('logout');
        })
        .catch((err) => {
          console.error(err);
        });
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
  nav.floating-navbar {
    position: absolute;
    z-index: 1000;
    right: 10px;
    top: 10px;
    img{
      width: 48px;
      border-radius: 100px;
      &:hover{
        cursor: pointer
      }
    }
  }
</style>
