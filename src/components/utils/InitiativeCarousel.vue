
<template>
  <div v-if="!isFetching">
    <carousel
      class="initiative-carousel"
      v-if="initiatives.length > 0"
      :autoplay="autoplayEnabled"
      :loop="false"
      :autoplay-timeout="timeout"
      :per-page-custom="responsiveLayout"
      :navigation-enabled="navigationEnabled"
      pagination-active-color="#DA8313"
      pagination-color="#FFFFFF"
      navigationNextLabel="<i class='fas fa-angle-double-right fa-2x has-text-white'></i>"
      navigationPrevLabel="<i class='fas fa-angle-double-left fa-2x has-text-white'></i>"
    >
      <slide class="item-carousel" v-for="initiative in initiatives" :key="initiative.id">
        <div class="box-initiative">
          <div>
            <div class="to-bottom">
              <div class="field is-grouped is-grouped-multiline">
                <div class="control">
                  <div class="tags">
                    <span class="tag is-dark">
                      <i class="fas fa-map-marker-alt"></i>
                    </span>
                    <!-- <span class="tag is-white">In map</span> -->
                  </div>
                </div>
              </div>
              <h1 class="title is-4 is-800 is-marginless">{{initiative.name}}</h1>
              <p
                class="shadow-text some-other-effects"
              >{{getShortDescription(initiative.description,80)}}</p>
            </div>
          </div>
        </div>
      </slide>
      <slide class="item-carousel">
        <router-link :to="{name: user ? 'newInitiative' : 'login'}">

        <div class="box-add-initiative">
          <div class="center-stuff">
            <p class="is-size-1 has-text-centered">
              <i class="fas fa-plus fa-fw has-text-white"></i>
              <i class="fas fa-map-marker fa-fw has-text-primary"></i>
            </p>
            <p class="is-size-6 has-text-centered">Add your initiative and be part of the project!</p>
          </div>
        </div>
        </router-link>
      </slide>
    </carousel>
  </div>
  <div v-else>
    <div class="section has-text-centered">
      <p>
        <i class="fas fa-sync fa-spin fa-lg"></i>
      </p>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  data() {
    return {
      initiatives: [],
      isFetching: true
    };
  },
  components: {
    Carousel,
    Slide
  },
  mounted: function() {
    this.fetch();
  },

  methods: {
    fetch: function() {
      this.isFetching = true;
      this.$http.get("/v1/initiatives?size=8").then(res => {
        this.initiatives = this.shuffleArray(res.data.data);
        this.isFetching = false;
      });
    },
    getShortDescription: function(text, limit) {
      if (text.length > limit) {
        for (let i = limit; i > 0; i--) {
          if (
            text.charAt(i) === " " &&
            (text.charAt(i - 1) != "," ||
              text.charAt(i - 1) != "." ||
              text.charAt(i - 1) != ";")
          ) {
            return text.substring(0, i) + "...";
          }
        }
      } else {
        return text;
      }
    },
    shuffleArray: function(arr) {
      return arr
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
    }
  },
  computed: {
    navigationEnabled: function() {
      return this.initiatives.length - 1 ? true : false;
    },
    autoplayEnabled: function() {
      return this.initiatives.length - 1 ? true : false;
    },
    perPage: function() {
      if (this.initiatives.length > 2) {
        return 3;
      } else {
        return this.initiatives.length;
      }
    },
    loopEnabled: function() {
      return this.initiatives.length - 1 ? true : false;
    },
    responsiveLayout: function() {
      if (this.initiatives.length > 2) {
        return [[0, 1], [768, 2], [1024, 3]];
      } else if (this.initiatives.length == 2) {
        return [[0, 1], [768, 2]];
      } else if (this.initiatives.length == 1) {
        return null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
