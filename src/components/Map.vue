<template>
  <section>
    <div class="cosasloca">

    </div>
  <MglMap
    :accessToken="accessToken"
    :center="theCenter"
    :minZoom="10"
    class="my-mapbox"
    :mapStyle.sync="mapStyle"
  >
    <MglNavigationControl></MglNavigationControl>
    <MglMarker :coordinates="theCenter">
      <MglPopup>
        <div>
         <p class="title is-4 is-800">UTN Santa Fe</p>
         <p class="subtitle is-6">Hey i know you wanna study come study artificial inteligence hehehe</p>
        </div>
      </MglPopup>
    </MglMarker>
  </MglMap>
  </section>
</template>

<script>
import {
  MglMap, MglNavigationControl, MglMarker, MglPopup,
} from 'vue-mapbox';

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglMarker,
    MglPopup,
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: process.env.VUE_APP_MAPBOX_STYLE, // your map style
      theCenter: [-60.675328, -31.617428],
    };
  },
};
</script>

<style lang="scss" scoped>
.my-mapbox {
  height: 100vh;
  width: 100wh;
}
.cosasloca{
      height: 100vh;
    width: 50%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 22;
    background-color: #1c1c1f;
    box-shadow: 10px 10px 31px -17px rgba(0,0,0,0.43);
}
</style>
