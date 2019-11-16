<template>
  <section>
    <h1 class="subtitle is-5 has-text-primary">Location</h1>
    <div class="map-container">
    <Map
      :name="initiative.name"
      :description="initiative.description"
      :coordinates="initiative.city.space.point.coordinates"
      />
    </div>
  </section>
</template>

<script>
import Map from '@/components/initiatives/new/Map';

export default {
  components: {
    Map,
  },
  computed: {
    initiative() {
      return this.$store.getters.initiative;
    },
  },
};
</script>

<style>

</style>
