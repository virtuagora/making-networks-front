<template>
  <div id="map">
    <MglMap
      ref="theMap"
      :accessToken="accessToken"
      :minZoom="2"
      :maxZoom="8"
      class="my-mapbox"
      :mapStyle.sync="mapStyle"
      @load="onMapLoad"
    >
      <MglNavigationControl></MglNavigationControl>
      <MglMarker
        :coordinates="city.space.point.coordinates"
        anchor="bottom"
        v-for="city in cities"
        :key="city.id"
        :color="colorMarker"
      >
        <MglPopup @open="fireCityFetch(`city-${city.id}`)">
          <CityPopUp :city="city" :ref="`city-${city.id}`"></CityPopUp>
        </MglPopup>
      </MglMarker>
      <MglGeojsonLayer
        v-for="(country,index) in countries"
        :key="`country-${index}`"
        :source="country.source[country.id]"
        :sourceId="country.id"
        :layerId="country.layer.id"
        :layer="country.layer"
      />
    </MglMap>
  </div>
</template>

<script>
import {
  MglMap,
  MglNavigationControl,
  MglMarker,
  MglPopup,
  MglGeojsonLayer
} from "vue-mapbox";
import CityPopUp from "./CityPopUp";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglMarker,
    MglPopup,
    CityPopUp,
    MglGeojsonLayer
  },
  props: {
    cities: {
      type: Array
    },
    countries: {
      type: Array
    }
  },
  data() {
    return {
      mapbox: null,
      colorMarker: "#da8313",
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN_MAPTILES, // your access token. Needed if you using Mapbox maps
      mapStyle: process.env.VUE_APP_MAPBOX_STYLE, // your map style
      theCenter: [-60.675328, -31.617428],
    };
  },
  methods: {
    async onMapLoad(event) {
      // Here we cathing 'load' map event
      this.$emit("mapReady");
    },
    async flyTo(coordinates) {
      const newParams = await this.$refs.theMap.actions.flyTo({
        center: coordinates,
        zoom: 4,
        speed: 0.4
      });
      console.log(newParams);
      return true;
    },
    fireCityFetch(ref) {
      this.$refs[ref][0].getCity();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
