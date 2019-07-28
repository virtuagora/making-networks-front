<template>
  <section id="home">
    <div id="hero" class="hero is-dark is-medium is-mobile">
      <div class="hero-body">
        <div class="container">
          <br class="is-hidden-desktop">
          <div class="logo-container">
            <img src="/iso-cn.svg" class="image logo-cn" alt>
          </div>
          <div class="subtitle is-italic is-4 is-size-5-touch has-text-centered-touch">"{{getSubtitle()}}"</div>
          <div class="title is-1 is-size-3-touch has-text-centered-touch">{{$t('globals.title')}}</div>
          <div class="buttons">
            <router-link :to="{name: 'map'}" class="button is-dark is-inverted is-outlined">
              <i class="fas fa-map"></i>
              &nbsp; {{$t('home.buttons.seeMap')}}
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
        <h1 class="title is-3">A few initiatives</h1>
        <initiative-carousel></initiative-carousel>
      </div>
    </div>
    <div class="hero is-medium is-link is-bold">
      <div class="hero-body">
        <div class="container">
          <img src="/YO-NET.svg" class="float-logo" alt>
          <div class="columns">
            <div class="column is-8">
              <h1 class="title is-1 is-size-3-touch">{{$t("home.question[0]")}}</h1>
              <p>{{$t("home.answer[0]")}}</p>
            </div>
          </div>
          <div class="columns huge-margin">
            <div class="column is-8 is-offset-2 has-text-centered has-text-left-touch">
              <h1 class="title is-1 is-size-3-touch">{{$t("home.question[1]")}}</h1>
              <p>{{$t("home.answer[0]")}}</p>
              <br>
              <div class="buttons is-centered">
                <router-link
                  :to="{name: 'login'}"
                  class="button is-primary is-fullwidth is-medium"
                  v-if="!user"
                >
                  <i class="fas fa-sign-in-alt"></i>&nbsp; Join today!
                </router-link>
                <router-link
                  :to="{name: 'map'}"
                  class="button is-primary is-fullwidth is-medium"
                  v-else
                >
                  <i class="fas fa-map-marked-alt"></i>&nbsp; Explore
                </router-link>
              </div>
            </div>
          </div>
        </div>
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
  methods: {
    getSubtitle: function(){
      let ammount = this.$t('home.subtitle').length
      return this.$t('home.subtitle')[Math.floor(Math.random() * (ammount))]
    }
  },
  computed: {

  },
};
</script>

<style lang="scss" scoped>
#hero {
  position: relative;
  background-image: url("/map-bg-2.png");
  background-position: center center;
  background-size: cover;
  .hero-body {
    z-index: 10;
    border-bottom: 1px solid rgba(255, 255, 255, 0.397);
    .buttons {
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
.logo-container {
  width: 50px;
  margin: 0 auto 20px;
  @include from($desktop) {
    float: left;
    height: 130px;
    margin-right: 30px;
    width: 80px;
  }
}

#action {
  margin-bottom: 1.5em;
  padding-left: 2em;
  padding-right: 2em;
  border-radius: 0;
}
.huge-margin {
  margin-top: 12em;
  @media screen and (max-width: 768px) {
    margin-top: 0em;
  }
}
.float-logo {
  position: absolute;
  right: -7em;
  top: -5em;
  height: 420px;
  @media screen and (max-width: 992px) {
    height: 325px;
    right: -7em;
    top: -1.25em;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
