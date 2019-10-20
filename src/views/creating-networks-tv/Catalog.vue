<template>
  <section id="creatingNetworkTvCatalog">
    <div id="hero" class="hero is-dark is-mobile vhs-effect">
       <router-link :to="{name: 'home'}" class="cn-back-home">
          <img src="/iso-cn.svg" class="image" alt />
        </router-link>
      <div class="hero-body">
        <div class="container has-text-centered">
          <img src="/cntv.svg" class="image is-centered logo-cntv" alt />
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
        <!-- <div class="columns is-multiline is-mobile is-centered is-vcentered">
        </div>-->
        <div v-masonry transition-duration="0.3s" item-selector=".item">
          <VideoBox
            v-masonry-tile
            class="item"
            :video="video"
            :metadata="metadata[video.public_data.youtube]"
            v-for="video in videos"
            :key="video.public_data.youtube"
          />
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
import VideoBox from "@/components/creating-networks-tv/VideoBox.vue";
import axios from "axios";

export default {
  components: {
    InfiniteLoading,
    VideoBox
  },
  data() {
    return {
      isFetching: false,
      videos: [],
      metadata: {},
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
            this.fetchMetadata(data.data.map(v => v.public_data.youtube));
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    fetchMetadata: function(videosIds) {
      let axiosInstance = axios.create();
      axiosInstance({
        url: `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&key=${
          process.env.VUE_APP_YOUTUBE_API_KEY
        }&id=${videosIds.join(",")}`,
        method: "get"
      })
        .then(res => {
          res.data.items.forEach(m => {
            // this.metadata[m.id] = m;
            this.$set(this.metadata, m.id, m)
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
#hero {
  position: relative;
  background-image: url("../../assets/img/tv-static04.gif");
  background-position: top left;
  // background-size: unset;
  background-size: cover;
  .hero-body {
    z-index: 10;
    border-bottom: 1px solid rgba(255, 255, 255, 0.397);
    background: linear-gradient(to bottom, #4443477c, #1d0f0ba2);
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
.cn-back-home {
  position: fixed;
  left: 12px;
  top: 12px;
  width: 27px;
  z-index: 20;
}
.logo-cntv {
  height: 70px;
  margin: 0 auto 20px;
  @include from($desktop) {
    // float: left;
    height: auto;
    // margin-right: 30px;
    height: 100px;
  }
}

.vhs-effect {
  background-image: url("../../assets/img/tv-static03.gif");
  background-position: center center;
  background-size: cover;
}
</style>
