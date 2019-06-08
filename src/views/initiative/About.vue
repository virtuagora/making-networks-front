<template>
  <section>
    <h1 class="subitle is-5">Description</h1>
    <div class="content">
      <p>{{initiative.description}}</p>
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
