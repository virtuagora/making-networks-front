<template>
  <MglMap 
  :accessToken="accessToken" 
  :mapStyle="mapStyle"
   @load="onMapLoad"
    />
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN_MAPTILES, // your access token. Needed if you using Mapbox maps
      mapStyle: process.env.VUE_APP_MAPBOX_STYLE, // your map style
    };
  },
  methods: {
    onMapLoad: async function(event) {
      // Here we cathing 'load' map event
      const asyncActions = event.component.actions

      const newParams = await asyncActions.flyTo({
        center: [30, 30],
        zoom: 9,
        speed: 0.2
      })
      console.log(newParams)
      /* => {
              center: [30, 30],
              zoom: 9,
              bearing: 9,
              pitch: 7
            }
      */
    }
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};
</script>
