<template>
  <section>
    <section>
      <div id="hero" class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <div class="title is-1 has-text-centered">{{initiative.name}}</div>
          </div>
        </div>
        <div class="hero-foot">
          <nav class="tabs is-centered is-boxed">
            <div class="container">
              <ul>
                <li class="is-active">
                  <router-link :to="{name: 'home'}">Overview</router-link>
                </li>
                <li>
                  <router-link :to="{name: 'home'}">Contact</router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <vue-particles color="FFFFFF" :hoverEffect="false" :clickEffect="false"></vue-particles>
      </div>
    </section>
    <div class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
import store from '@/store';
import http from '@/http';

export default {
  computed: {
    initiative() {
      return this.$store.getters.initiative;
    },
  },
  beforeRouteUpdate: (to, from, next) => {
    if (to.params.id === from.params.id) {
      console.log('Same initiative, dont load');
      next();
    } else {
      console.log('First time entering, getting initiative...');
      http
        .get(`/v1/initiatives/${to.params.id}`)
        .then((response) => {
          store.commit('setInitiative', response.data.data);
          console.log('GET OK - Got initiative');
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
  background: #16222a; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #3a6073,
    #16222a
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #3a6073,
    #16222a
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
</style>
