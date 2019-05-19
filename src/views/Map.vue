<template>
  <section id="map">
    <Map></Map>
  </section>
</template>

<script>
import Map from '@/components/Map.vue';

export default {
  components: { Map },
  computed: {
    currentLanguage() {
      return document.documentElement.lang;
    },
  },
};
</script>
