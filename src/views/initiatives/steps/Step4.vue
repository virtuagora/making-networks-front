<template>
  <div>
    <div class="content">
       <p
        class="has-text-centered is-italic"
      >{{$t('forms.user.addInitiative.step4.conversation[0]',{cityName: model.selectedCity.name})}}</p>
      <p
        class="has-text-centered is-italic"
      >{{$t('forms.user.addInitiative.step4.conversation[1]')}}</p>
      <p
        class="has-text-centered is-italic"
      >{{$t('forms.user.addInitiative.step4.conversation[2]')}}</p>
    </div>
    <div class="columns is-centered">
      <div class="column is-8">
        <div class="map-container">
          <Map
          :name="model.name"
          :description="model.description"
          :coordinates="model.selectedCity.point.coordinates"
          />
        </div>
      </div>
    </div>
    <br>
    <div class="buttons is-centered">
      <button @click="$emit('backward')" class="button is-rounded is-white is-outlined is-medium">
        <i class="fas fa-arrow-left"></i>
      </button>
      <button @click="goForward" class="button is-rounded is-primary is-outlined is-medium">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Map from '@/components/initiatives/new/Map';

export default {
  components: {
    Map,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

    };
  },
  created() {
    if (this.model.selectedCity == null) {
      this.$emit('forward');
    }
  },
  methods: {
    goForward() {
      this.$emit('forward');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
