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
        <h1 class="subtitle is-4 is-size-6-touch has-text-centered"><a @click="toggleShowAreasFilter" class="has-text-light">Filter by Areas of interest&nbsp;&nbsp;<i class="fas fa-fw" :class="classToggleShowAreasFilter"></i></a><a @click="clearAreasQuery" v-if="selectedAreas.length" class="has-text-light"><i class="fas fa-trash fa-fw"></i></a></h1>
          <div class="subtitle is-4 is-size-6-touch has-text-centered" v-if="fetchingAreas && showFilterAreaOfInteres">
            <i class="fa fa-spinner fa-spin"></i>
          </div>
          <div class="buttons is-centered" v-else-if="!fetchingAreas && showFilterAreaOfInteres">
            <a
              class="button is-rounded is-small"
              @click="toggleArea(area.id)"
              :class="getAreaButtonClass(area.id)"
              v-for="area in areas"
              :key="area.id"
            >{{area.name}}</a>
          </div>
        <h1 class="subtitle is-4 is-size-6-touch has-text-centered"><a @click="toggleShowLocationFilter" class="has-text-light">Filter by Location&nbsp;&nbsp;<i class="fas fa-fw" :class="classToggleShowLocationFilter"></i></a><a @click="clearSelectedCity" v-if="selectedCity" class="has-text-light"><i class="fas fa-trash fa-fw"></i></a></h1>
        <LocationFilter ref="locationFilter" v-if="showFilterLocation" @save="saveLocationQuery"/>
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
              <div class="section" v-if="fetchingInitiatives">
                <h1 class="subtitle is-4 has-text-centered">
                  <i class="fa fa-spinner fa-spin"></i> Fetching initiatives
                </h1>
              </div>
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
import LocationFilter from '@/components/initiatives/list/LocationFilter.vue'
export default {
  components: {
    InfiniteLoading,
    LocationFilter
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
      firstLoadDone: false,
      showFilterAreaOfInteres: false,
      showFilterLocation: false,
      selectedCity: null,
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
      if(this.selectedCity) queryString.city_id = this.selectedCity.id
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
      if(this.selectedCity) queryString.city_id = this.selectedCity.id
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
      this.fetchingInitiatives = true;
      this.initiatives = []
      this.fetchInitiatives()


    },
    toggleShowAreasFilter: function(){
      this.showFilterAreaOfInteres = !this.showFilterAreaOfInteres
      if(!this.showFilterAreaOfInteres){
        this.clearAreasQuery()
      }
    },
    toggleShowLocationFilter: function(){
      this.showFilterLocation = !this.showFilterLocation
      if(!this.showFilterLocation){
        this.clearSelectedCity()
      }
    },
    getAreaButtonClass: function(areaId) {
      return this.selectedAreas.includes(areaId)
        ? "is-white"
        : "is-white is-outlined";
    },
    saveLocationQuery: function(location){
      this.selectedCity = location
      this.fetchingInitiatives = true;
      this.initiatives = []
      this.fetchInitiatives()
    },
    clearAreasQuery: function(){
      this.selectedAreas = []
      this.fetchingInitiatives = true;
      this.initiatives = []
      this.fetchInitiatives()
    },
    clearSelectedCity: function(){
      this.selectedCity = null
      this.fetchingInitiatives = true;
      this.initiatives = []
      this.$refs.locationFilter.resetState()
      this.fetchInitiatives()
    }
  },
  computed: {
    classToggleShowAreasFilter: function(){
      return this.showFilterAreaOfInteres ? 'fa-minus-square' : 'fa-plus-square'
    },
    classToggleShowLocationFilter: function(){
      return this.showFilterLocation ? 'fa-minus-square' : 'fa-plus-square'
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