<template>
  <section>
    <section>
      <div id="hero" class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-6">
                <p><router-link :to="{name: 'catalogCreatingNetworksTv'}" class="has-text-white">
                  <i class="fas fa-arrow-left"></i> Go back to catalog
                </router-link></p>
                <br>
                <div class="videoWrapper">
                  <iframe
                    width="100%"
                    height="auto"
                    :src="`https://www.youtube.com/embed/${video.public_data.youtube}`"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <vue-particles color="FFFFFF" :hoverEffect="false" :clickEffect="false"></vue-particles>
      </div>
      <div class="section">
        <div class="container">
            <div class="columns is-centered">
              <div class="column is-6">

        <h1 class="title is-1">{{video.title}} </h1>
        <div class="buttons">
          <a :href="`https://www.youtube.com/watch?v=${video.public_data.youtube}`" class="button is-primary"><i class="fas fa-thumbs-up"></i>&nbsp;Dale Like en&nbsp;<i class="fab fa-youtube fa-fw"></i></a>
        </div>
        <p class="add-br">{{video.content}}</p>
        <br>
        <p><router-link :to="{name: 'catalogCreatingNetworksTv'}" class="has-text-link">
                  <i class="fas fa-arrow-left"></i> Go back to catalog
                </router-link></p>
              </div>
            </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import store from "@/store";
import http from "@/http";

export default {
  computed: {
    video() {
      return this.$store.getters.video;
    }
  },
  beforeRouteUpdate: (to, from, next) => {
    if (to.params.id === from.params.id) {
      console.log("Same user video, dont load");
      next();
    } else {
      console.log("First time entering, getting video...");
      http
        .get(`/v1/videos/${to.params.id}`)
        .then(response => {
          store.commit("setVideo", response.data.data);
          console.log("GET OK - Got video");
          next();
        })
        .catch(error => {
          console.log("Fetching data failed.", error);
          next({ name: "home" });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#hero {
  position: relative;
  background: #1d0f0b; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #b95120,
    #1d0f0b
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #b95120,
    #1d0f0b
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  .hero-body {
    z-index: 10;
  }
  .hero-foot {
    border-bottom: 1px solid rgba(255, 255, 255, 0.397);
    z-index: 10;
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
.profile-icon {
  width: 200px;
}

.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
