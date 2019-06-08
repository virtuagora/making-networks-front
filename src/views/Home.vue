<template>
  <section id="home">
    <div id="hero" class="hero is-dark is-medium is-mobile">
      <div class="hero-body">
        <div class="container">
            <br class="is-hidden-desktop">
            <div class="logo-container">
            <img src="/iso-cn.svg" class="image logo-cn" alt="">
            </div>
          <div class="subtitle is-4 is-size-5-touch has-text-centered-touch">{{$t('home.subtitle')}}</div>
          <div class="title is-1 is-size-3-touch has-text-centered-touch">{{$t('globals.title')}}</div>
          <div class="buttons">
            <router-link :to="{name: 'map'}" class="button is-dark is-inverted is-outlined">
              <i class="fas fa-map"></i>&nbsp; {{$t('home.buttons.seeMap')}}
            </router-link>
            <router-link :to="{name: 'login'}" class="button is-primary is-outlined" v-if="!user">
              <i class="fas fa-sign-in-alt"></i>&nbsp; Join
            </router-link>
          </div>
        </div>
      </div>
      <vue-particles color="FFFFFF" :hoverEffect="false" :clickEffect="false"></vue-particles>
    </div>
    <div class="section">
      <div class="container">
      <h1 class="title is-3">Latest initiatives</h1>
      <initiative-carousel></initiative-carousel>
      </div>
    </div>
  </section>
</template>

<script>
import InitiativeCarousel from '@/components/utils/InitiativeCarousel.vue'
export default {
  components: {
    InitiativeCarousel
  },
  computed: {

  },
};
</script>

<style lang="scss" scoped>
#hero{
  position: relative;
  .hero-body{
    z-index: 10;
    border-bottom: 1px solid rgba(255, 255, 255, 0.397);
    .buttons{
      justify-content: center;
      @include from($desktop) {
        justify-content: left;
      }
    }
  }
}

#particles-js {
  // background-size: cover;
  position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
}
.logo-container{
  width: 50px;
  margin: 0 auto 20px;
  @include from($desktop) {
      float: left;
      height: 130px;
      margin-right: 30px;
      width: 80px;
    }
}
.logo-cn{
}
</style>
