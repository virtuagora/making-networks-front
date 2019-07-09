<template>
  <div class="modal-card" style="width: 100%">
    <section class="modal-card-body has-text-centered">
      <div class="content" v-if="resourceType == 'initiative'">
        <h1 class="subtitle is-3 has-text-danger">You are about to delete a initiative</h1>
        <p>There is no going back after deleting it!</p>
        <p>Are you sure you want to delete the initiative <b>{{resource.name}}</b></p>
      </div>
      <div class="buttons is-centered">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-danger" @click="confirm"><i class="fas fa-delete"></i>&nbsp;Delete it</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    resourceType: {
      type: String,
      required: true
    },
    resource: {
      type: Object,
      required: true
    },
  },
  methods: {
    confirm: function(){
      this.$emit('confirm', this.resource)
    }
  }
}
</script>
