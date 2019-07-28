<template>
  <section class="unlocated-list">
    <a @click="closePanel" class="has-text-light close-list">
      <i class="fas fa-times"></i>
    </a>
    <div class="the-list" v-if="!transitionToInitiative">
      <h1 class="title is-3 has-text-primary animated fadeInLeft">Initiatives without city</h1>
      <h1 class="subtitle is-6 animated fadeInLeft delay-1s">They deserve a spot too!</h1>
      <div class="list-wrapper">
        <ul>
          <li
            v-for="initiative in initiatives"
            :key="initiative.id"
            class="initiative-el"
            @click="goToInitiative(initiative.id)"
          >
          <div class="media">
            <div class="media-content">
              {{initiative.name}}
            </div>
            <div class="media-right">
              <i class="fas fa-angle-double-right has-text-primary"></i>  
            </div>
          </div>
          </li>
          <infinite-loading  @infinite="infiniteHandler" v-if="showList">
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
        </ul>
      </div>
    </div>
    <div v-else class="has-text-centered">
      <i class="fas fa-spinner fa-spin fa-2x"></i>
      <h1 class="title is-3 has-text-primary animated fadeInLeft">Loading...</h1>
      <h1 class="subtitle is-6 animated fadeInLeft delay-1s">Taking you to the initiative</h1>
    </div>
  </section>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { setTimeout } from "timers";

export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      isFetching: false,
      initiatives: [],
      page: 0,
      showList: false,
      transitionToInitiative: false,
    };
  },
  methods: {
    getInitiatives: function() {
      this.isFetching = true;
    },
    goToInitiative: function(id) {
      this.transitionToInitiative = true;
      this.$router.push({ name: "initiative", params: { id: id } });
    },
    startPanel: function(){
      this.page = 0;
      this.initiatives = [];
      this.showList = true;
    },
    closePanel: function() {
      this.page = 0;
      this.$emit("close");
      setTimeout(() => {
        this.showList = false;
        this.initiatives = [];
      }, 1000);
    },
    infiniteHandler($state) {
      this.isFetching = true;
      this.$http
        .get(`/v1/initiatives`, {
          params: {
            offset: this.page * 20,
            city_id: -1,
            size: 20
          }
        })
        .then(({ data }) => {
          if (data.data.length) {
            this.page += 1;
            this.initiatives.push(...data.data);
            this.isFetching = false;
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.unlocated-list {
  padding: 30px 15px 10px 20px;
}
.close-list {
  position: absolute;
  right: 10px;
  top: 10px;
}

ul .initiative-el {
  padding: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 1rem;
  line-height: normal;
  &:hover {
    background-color: rgba(255, 255, 255, 0.062);
    color: rgb(156, 242, 253);
    cursor: pointer;
  }
}
</style>

