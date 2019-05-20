<template>
  <section id="home">
    <div id="hero" class="hero is-dark is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="subtitle is-4">{{$t('home.subtitle')}}</div>
          <div class="title is-1">{{$t('globals.title')}}</div>
          <div class="buttons">
            <router-link :to="{name: 'login'}" class="button is-dark is-inverted is-outlined">
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
  </section>
</template>

<script>

export default {
  components: {

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
</style>
