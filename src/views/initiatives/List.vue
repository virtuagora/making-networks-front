<template>
  <section>
    <router-link :to="{name: 'home'}" class="cn-back-home">
      <img src="/iso-cn.svg" class="image" alt />
    </router-link>
    <section class="section border-bottom">
      <div class="container">
        <div class="subtitle is-4 is-size-6-touch has-text-centered">Search</div>
        <div class="title is-1 is-size-3-touch has-text-centered">Initiatives</div>
        <div class="columns is-centered">
          <div class="column is-6">
            <input
              type="text"
              v-model="inputSearchName"
              class="input is-large has-text-centered is-rounded"
              placeholder="Filter by name"
            />
          </div>
        </div>
        <div class="subtitle is-4 is-size-6-touch has-text-centered">Filter by Areas of interest</div>
        <div class="subtitle is-4 is-size-6-touch has-text-centered" v-if="fetchingAreas">
          <i class="fa fa-spinner fa-spin"></i>
        </div>
        <div class="buttons is-centered" v-else>
          <button
            class="button is-rounded is-small"
            @click="toggleArea(area.id)"
            :class="getAreaButtonClass(area.id)"
            v-for="area in areas"
            :key="area.id"
          >{{area.name}}</button>
        </div>
      </div>
    </section>
    <div class="hero is-light is-bold border-bottom">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-8">
              <b-table
                :data="initiatives"
                :loading="fetchingInitiatives"
                class="initiativesTable"
                narrowed
              >
                <template slot-scope="props">
                  <b-table-column field="name" label="Initiative Name">
                    <router-link
                      :to="{ name: 'initiative', params: { id: props.row.id } }"
                    ><b>{{ props.row.name }}</b>
                    </router-link>
                    <p class="is-size-7 add-br"><b>Goals:</b>&nbsp;{{props.row.public_data.goals}}</p>
                  </b-table-column>
                  <b-table-column
                    label="Networks"
                    width="90"
                    centered
                  >
                    <a :href="`https://${props.row.public_data.website}`" v-if="props.row.public_data.website" target="_blank"><i class="fas fa-globe fa-fw"></i></a>
                    <a :href="`https://facebook.com/${props.row.public_data.facebook}`" v-if="props.row.public_data.facebook" target="_blank"><i class="fab fa-facebook-f fa-fw"></i></a>
                    <a :href="`https://twitter.com/${props.row.public_data.twitter}`" v-if="props.row.public_data.twitter" target="_blank"><i class="fab fa-twitter fa-fw"></i></a>
                    <a :href="`https://${props.row.public_data.other_network}`" v-if="props.row.public_data.other_network" target="_blank"><i class="fas fa-external-link-alt fa-fw"></i></a>
                  </b-table-column>
                  <b-table-column
                    field="public_data.founding_year"
                    label="Founding Year"
                    centered
                  ><span class="tag is-link is-rounded">{{ props.row.public_data.founding_year }}</span></b-table-column>
                </template>
              </b-table>
              <infinite-loading @infinite="infiniteHandler" v-if="firstLoadDone">
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { debounce } from "lodash";
export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      fetchingAreas: true,
      fetchingInitiatives: true,
      areas: [],
      selectedAreas: [],
      initiatives: [],
      inputSearchName: null,
      page: 0,
      firstLoadDone: false
    };
  },
  mounted: function() {
    this.fetchAreas();
    this.fetchInitiatives();
  },
  methods: {
    fetchAreas: function() {
      this.fetchingAreas = true;
      this.$http
        .get(`/v1/terms?taxonomy=topics&size=100`)
        .then(res => {
          this.areas = res.data.data;
          this.fetchingAreas = false;
        })
        .catch(err => {
          console.error(err);
          this.$toast.open({
            message: `<i class="fas fa-times"></i>&nbsp;Error while fetching areas of interest`,
            type: "is-danger"
          });
        });
    },
    infiniteHandler($state) {
      this.fetchingInitiatives = true;
      let queryString = {
        offset: this.page * 30,
        size: 30
      }
      if(this.inputSearchName) queryString.s = this.inputSearchName
      this.$http
        .get(`/v1/initiatives`, {
          params: queryString
        })
        .then(({ data }) => {
          if (data.data.length) {
            this.page += 1;
            this.initiatives.push(...data.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        }).finally( () => {
          this.fetchingInitiatives = false;
        });
    },
    fetchInitiatives: debounce(function() {
      this.fetchingInitiatives = true;
      this.page = 0
      let queryString = {
        size: 30
      }
      if(this.inputSearchName) queryString.s = this.inputSearchName
      this.$http
        .get(`/v1/initiatives`, {
          params: queryString
        })
        .then(res => {
          this.page += 1
          this.initiatives = res.data.data;
          this.fetchingInitiatives = false;
          this.firstLoadDone = true
        })
        .catch(err => {
          console.error(err);
          this.$toast.open({
            message: `<i class="fas fa-times"></i>&nbsp;Error while fetching initiatives`,
            type: "is-danger"
          });
        });
    }, 700),
    toggleArea: function(areaId) {
      if (this.selectedAreas.includes(areaId)) {
        this.selectedAreas = this.selectedAreas.filter(id => id != areaId);
      } else {
        this.selectedAreas.push(areaId);
      }
    },
    getAreaButtonClass: function(areaId) {
      return this.selectedAreas.includes(areaId)
        ? "is-white"
        : "is-white is-outlined";
    }
  },
  watch: {
    inputSearchName: function(newVal, oldVal) {
      this.fetchInitiatives();
    }
  }
};
</script>

<style lang="scss">
.cn-back-home {
  position: fixed;
  left: 12px;
  top: 12px;
  width: 27px;
  z-index: 20;
}
.border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.397);
}
.initiativesTable.b-table{
  .table{
    background-color: transparent;
    tr td, tr th{
      @include until($tablet) {
        &:first-child{
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        &:last-child{
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
      @include until($tablet) {
        background-color: #FFF;
      }
    }
  }
}
</style>