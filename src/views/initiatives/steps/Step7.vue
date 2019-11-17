<template>
  <div>
    <div class="field">
      <div class="content">
        <p
          class="has-text-centered is-italic"
          v-for="(p,index) in $t('forms.user.addInitiative.step7.conversation')"
          :key="index"
        >{{p}}</p>
      </div>
    </div>
    <h1 class="subtitle is-5">Available areas of interests</h1>
        <b-taglist>
           <b-tag v-for="area in availableAreas" @click.native="model.areasOfInterest.push(area)" type="is-light" size="is-medium" :key="area.id" style="cursor: pointer">{{area.name}}</b-tag>
        </b-taglist>
<h1 class="subtitle is-5">Selected areas</h1>
        <b-taglist>
                  <b-tag v-for="area in model.areasOfInterest" type="is-link" size="is-medium" closable :key="area.id" @close="remove(area.id)">{{area.name}}</b-tag>

        </b-taglist>
    <br />
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
import { differenceBy } from 'lodash';

export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      areas: [],
    };
  },
  mounted() {
    this.fetchAvailableAreasOfInterest();
  },
  methods: {
    fetchAvailableAreasOfInterest() {
      this.startLoading();
      this.$http
        .get('/v1/terms?taxonomy=topics&size=100')
        .then((res) => {
          this.areas = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          this.$toast.open({
            message: '<i class="fas fa-times"></i>&nbsp;Error while fetching areas of interest',
            type: 'is-danger',
          });
        })
        .finally(() => {
          this.stopLoading();
        });
    },
    remove(id){
      this.model.areasOfInterest = this.model.areasOfInterest.filter(a => a.id != id)
    },
    goTo(step) {
      this.$emit('goTo', step);
    },
    goForward() {
      this.$emit('forward');
    },
  },
  computed: {
    availableAreas() {
      if (!this.areas) return [];
      return differenceBy(this.areas, this.model.areasOfInterest, 'id');
    },
  },
};
</script>