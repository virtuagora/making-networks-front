<template>
  <div class="modal-card" style="width: 100%">
    <section class="modal-card-body has-text-centered">
      <div class="content" v-if="resourceType == 'member'">
        <h1 class="subtitle is-3 has-text-danger">You are about to demote an owner</h1>
        <p>The user will not be able to edit the initiative anymore.</p>
        <p>Note: If you are the user, then you will be logged out.</p>
        <p>Are you sure you want to demote the user?</p>
      </div>
      <div class="content" v-if="resourceType == 'follower'">
        <h1 class="subtitle is-3 has-text-danger">You are about to demote a member</h1>
        <p>The user will be a follower of the initiative</p>
        <p>Are you sure you want to demote the user?</p>
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
      required: true,
    },
    resource: {
      type: Object,
      required: true,
    },
  },
  methods: {
    confirm() {
      this.$parent.close();
      this.$emit('confirm', this.resource, this.resourceType);
    },
  },
};
</script>
