<template>
  <div>
    <div class="content">
      <p class="is-size-5">
        Welcome to
        <b>{{city.name}}!</b>
      </p>
      <p>Home of great initiatives like...</p>
      <div v-if="!fetchingCityData">
        <p v-for="initiative in cityData.initiatives" :key="initiative.id">
          <router-link :to="{name: 'initiative', params: { id: initiative.id }}">
            <i class="fas fa-map-marked-alt has-text-primary"></i>
            &nbsp;{{initiative.name}}
          </router-link>
        </p>
      </div>
      <div v-else>
        <p>
          <i class="fas fa-spin fa-sync"></i>&nbsp;Loading...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    city: {
      type: Object
    }
  },
  data() {
    return {
      fetchingCityData: true,
      cityData: null
    };
  },
  methods: {
    getCity() {
      if (this.cityData == null) {
        this.$http.get(`/v1/cities/${this.city.id}`).then(res => {
          this.cityData = res.data.data;
          this.fetchingCityData = false;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  color: #000;
  line-height: normal;
  font-size: 14px;
}
</style>
