<template>
  <section class="has-text-centered">
    <h1 class="subtitle is-5 has-text-primary">Founding Year</h1>
    <div class="content">
      <p><b>{{initiative.name}}</b> was founded the year {{initiative.public_data.founding_year}}</p>
    </div>
    <h1 class="subtitle is-5 has-text-primary">Our goals</h1>
    <div class="content">
      <p>{{initiative.public_data.goals}}</p>
    </div>
    <h1 class="subtitle is-5 has-text-primary">Role of Youth</h1>
    <div class="content">
      <p>{{$t('globals.role_of_youth')[initiative.public_data.role_of_youth]}}</p>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    initiative() {
      return this.$store.getters.initiative;
    },
  },
};
</script>

<style>

</style>
