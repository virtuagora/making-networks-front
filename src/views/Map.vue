<template>
  <section>
      <div class="control-header">
        <div class="field">
          <div class="control">
            <b-autocomplete
                v-model="queryCity"
                :placeholder="placeholderInput"
                :keep-first="true"
                :data="filteredCities"
                :loading="fetchingCities"
                field="name"
                icon="plane-departure"
                :disabled="disableInput"
                @select="option => selectCity(option)">
                <template slot="empty">Oh sorry.. we don't have flights to {{queryCity}}&nbsp;<i class="fas fa-sad-tear"></i>  </template>
            </b-autocomplete>
            <p class="help" v-if="!fetchingCities && mapReady">
              <a class="has-text-primary" @click="randomDesination">Don't know? Try a random destination!</a>
            </p>
          </div>
        </div>
      </div>
      <div class="control-footer">
        <router-link v-if="mapReady" :to="{name: user ? 'newInitiative' : 'login' }" class="button is-medium is-primary animated bounce is-outlined"><i class="fas fa-plus"></i>&nbsp;Add your initiative</router-link>
        <p v-else class="animated infinite bounce is-size-4"><i class="fas fa-sync fa-spin"></i>&nbsp;Loading</p>
      </div>
    <div class="map-container">
      <InitiativeMap ref="initiativeMap" class="the-map" @mapReady="mapReady = true" v-if="!fetchingCities" :cities="cities"></InitiativeMap>
    </div>
  </section>
</template>

<script>
import InitiativeMap from "@/components/InitiativeMap.vue";

export default {
  components: { InitiativeMap },
  data(){
    return {
      mapLoaded: true,
      fetchingCities: true,
      cities: null,
      queryCity: '',
      selectedCity: null,
      mapReady: false,
    }
  },
  created: function(){
    this.getCities()
  },
  methods: {
    getCities: function(){
      this.$http.get('/v1/cities').then( res => {
        this.cities = res.data.data
        this.fetchingCities = false
      })
    },
    selectCity: function(city){
      if (city == null) return;
      this.selectedCity = city
      this.$refs['initiativeMap'].flyTo(city.space.point.coordinates)
    },
    randomDesination: function(){
      let randomCity = null
      do {
       randomCity = this.cities[Math.floor(Math.random() * this.cities.length)]
      } while (randomCity.name == (this.selectedCity && this.selectedCity.name) )
      this.queryCity = randomCity.name
      this.selectedCity = randomCity
      this.$refs['initiativeMap'].flyTo(randomCity.space.point.coordinates)
    }
  },
  computed: {
    placeholderInput: function(){
      if(!this.fetchingCities){
        if(!this.mapReady) return 'Getting map ready.. get ready!'
        return 'Where do you want to go today? ✈'
      }
      return 'Fetching cities, hold on!'
    },
    disableInput: function(){
      return this.fetchingCities || !this.mapReady
    },
    filteredCities: function() {
      if(!this.cities) return []
      return this.cities.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.queryCity.toLowerCase()) >= 0
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// .cosasloca{
//       height: 100vh;
//     width: 50%;
//     position: absolute;
//     left: 0;
//     top: 0;
//     z-index: 22;
//     background-color: #1c1c1f;
//     box-shadow: 10px 10px 31px -17px rgba(0,0,0,0.43);
// }
  .control-footer {
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%, -50%);
  z-index: 10;
    margin: 0 auto;
  }
  .control-header {
    width: 70%;    
    position: fixed;
    top: 10px;
    left: 10px;
  z-index: 10;
    margin: 0 auto;
    @include from($desktop) {
    width: 30%;
  }
  }
.map-container {
  height: 100vh;
  width: 100%;
  .the-map {
    height: 100vh;
  }
}
// .grid-container {
//   display: grid;
//   grid-template-columns: 3fr 1fr;
//   grid-template-rows: 100vh;
//   grid-template-areas: "Map Control";
// }

// .Map {
//   grid-area: Map;
// }

// .Control {
//   grid-area: Control;
//   border-left: 1px solid #fff;
//   // color: #FFF
// }
</style>

