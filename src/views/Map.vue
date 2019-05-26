<template>
  <section>
    <div class="grid-container">
      <Map class="Map"></Map>
      <div class="Control section">
        <div class="content">
          <p>Do you have an organization?</p>
          <p>
            <router-link :to="{ name: 'newInitiative' }" class="button is-primary is-outlined">
              <i class="fas fa-plus"></i>&nbsp;Add your NGO!
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="cosasloca">

    </div>-->
  </section>
</template>

<script>
import Map from "@/components/Map.vue";

export default {
  components: { Map }
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
.grid-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 100vh;
  grid-template-areas: "Map Control";
}

.Map {
  grid-area: Map;
}

.Control {
  grid-area: Control;
  border-left: 1px solid #fff;
  // color: #FFF
}
</style>

