<template>
  <div class="section">
    <div class="container">

    <div class="columns">
      <div class="column is-3">
        <Menu />
      </div>
      <div class="column">
        <RouterView />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Menu from './Menu.vue';

export default {
  components: {
    Menu,
  },
};
</script>

<style>

</style>
