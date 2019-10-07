<template>
  <section id="home">
    <div id="hero" class="hero is-dark is-small is-mobile">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="logo-container">
            <img src="/iso-cn.svg" class="image" alt />
          </div>
          <div class="subtitle is-4 is-size-6-touch has-text-centered-touch">Welcome to</div>
          <div
            class="title is-1 is-size-3-touch has-text-centered-touch"
          >{{$t('globals.title')}} TV!</div>
        </div>
      </div>
      <vue-particles color="FFFFFF" :hoverEffect="false" :clickEffect="false"></vue-particles>
    </div>
    <div class="section">
      <div class="container">
        <div class="columns is-multiline is-mobile is-centered is-vcentered">
         <VideoBox :video="video" v-for="video in videos" :key="video.id" />
        </div>
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-more" class="section">
            <p>
              <i class="far fa-surprise fa-2x"></i>
            </p>
            <p>End of the list!</p>
          </div>
          <div slot="no-results">
            <p>
              <i class="far fa-frown fa-2x"></i>
            </p>
            <p>Nothing here</p>
          </div>
        </infinite-loading>
      </div>
    </div>
  </section>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import VideoBox from '@/components/creating-networks-tv/VideoBox.vue'
export default {
  components: {
    InfiniteLoading,
    VideoBox
  },
  data() {
    return {
      isFetching: false,
      videos: [],
      page: 0
    };
  },
  methods: {
    infiniteHandler($state) {
      this.isFetching = true;
      this.$http
        .get(`/v1/videos`, {
          params: {
            offset: this.page * 20,
            size: 10
          }
        })
        .then(({ data }) => {
          if (data.data.length) {
            this.page += 1;
            this.videos.push(...data.data);
            this.isFetching = false;
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    }
  },
  computed: {}
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
  width: 35px;
  margin: 0 auto 20px;
  @include from($desktop) {
    float: left;
    height: auto;
    margin-right: 30px;
    width: 50px;
  }
}
</style>
