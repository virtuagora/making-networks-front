<template>
  <section>
    <section>
      <div id="hero" class="hero is-fullheight is-dark">
        <router-link :to="{name: 'home'}" class="cn-back-home">
          <img src="/iso-cn.svg" class="image" alt />
        </router-link>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-narrow">
                <img
                  :src="makeUserAvatar(userProfile)"
                  class="image is-rounded is-centered profile-icon"
                />
              </div>
              <div class="column">
                <h1 class="title is-1 is-size-3-touch">{{userProfile.display_name}}</h1>
                <div class="buttons" v-if="user && user.id == userProfile.id" >
                  <router-link :to="{name: 'userProfile', params: {id: user.id}}" class="button is-outlined is-white is-small is-800" v-if="isAdmin">
                    <i class="fas fa-pencil-alt fa-lg fa-fw"></i>&nbsp; E D I T
                  </router-link>
                </div>
                <div class="content">
                  <p class="add-br is-italic" >{{userProfile.bio || 'I haven\'t completed my bio yet!' }}</p>
                </div>
                <div class="columns is-mobile">
                  <div class="column is-narrow">
                    <a
                      :href="`https://${userProfile.data.website}`"
                      target="_blank"
                      class="has-text-white"
                      v-if="userProfile.data && userProfile.data.website"
                    >
                      <i class="fas fa-globe fa-lg fa-fw"></i>
                    </a>
                  </div>
                  <div class="column is-narrow">
                    <a
                      :href="`https://facebook.com/${userProfile.data.facebook}`"
                      target="_blank"
                      class="has-text-white"
                      v-if="userProfile.data && userProfile.data.facebook"
                    >
                      <i class="fab fa-facebook-f fa-lg fa-fw"></i>
                    </a>
                  </div>
                  <div class="column is-narrow">
                    <a
                      :href="`https://twitter.com/${userProfile.data.twitter}`"
                      target="_blank"
                      class="has-text-white"
                      v-if="userProfile.data && userProfile.data.twitter"
                    >
                      <i class="fab fa-twitter fa-lg fa-fw"></i>
                    </a>
                  </div>
                  <div class="column is-narrow">
                    <a
                      :href="`https://${userProfile.data.other_network}`"
                      target="_blank"
                      class="has-text-white"
                      v-if="userProfile.data && userProfile.data.other_network"
                    >
                      <i class="fas fa-external-link-alt fa-lg fa-fw"></i>
                    </a>
                  </div>
                </div>
                <h1 class="subtitle is-5 has-text-white"><i class="fas fa-tag"></i>&nbsp;Areas of interest</h1>
        <div class="content" v-if="userProfile.person.terms.length == 0">
          <p><i>I haven't completed my areas of interest yet!</i></p>
        </div>
        <div class="tags">
          <span class="tag is-rounded is-medium is-primary" v-for="area in userProfile.person.terms" :key="area.id">{{area.name}}</span>
        </div>
              </div>
            </div>
          </div>
        </div>
        <vue-particles color="FFFFFF" :hoverEffect="false" :clickEffect="false"></vue-particles>
      </div>
    </section>
  </section>
</template>

<script>
import store from '@/store';
import http from '@/http';

export default {
  computed: {
    userProfile() {
      return this.$store.getters.userProfile;
    },
  },
  beforeRouteUpdate: (to, from, next) => {
    if (to.params.id === from.params.id) {
      console.log('Same user profile, dont load');
      next();
    } else {
      console.log('First time entering, getting user profile...');
      http
        .get(`/v1/users/${to.params.id}`)
        .then((response) => {
          store.commit('setUserProfile', response.data.data);
          console.log('GET OK - Got user profile');
          next();
        })
        .catch((error) => {
          console.log('Fetching data failed.', error);
          next({ name: 'home' });
        });
    }
  },
};
</script>

<style lang="scss" scoped>
#hero {
  position: relative;
  background: #130b1d; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #402d63,
    #130b1d
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #402d63,
    #130b1d
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
</style>
