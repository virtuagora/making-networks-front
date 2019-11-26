<template>
  <div class="modal-card" style="width: 100%">
    <section class="modal-card-body has-text-centered">
      <div class="">
        <h1 class="subtitle is-3 has-text-danger">{{resource.name}}</h1>
        <p>There are <span class="is-size-3 is-800">{{resource.initiatives}}</span> initiatives!</p>
      </div>
      <br>
      <div class="buttons is-centered">
        <button class="button is-dark is-small" type="button" @click="$parent.close()">Close</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  methods: {
    
  },
};
</script>
