<template>
  <div>
    <div class="field">
      <div class="content">
        <p class="has-text-centered is-italic">Thank you for sharing!</p>
        <p class="has-text-centered is-italic">
          To finish, we will ask you for some
          <u>private data</u>
        </p>
      </div>
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">3-b.</span>&nbsp;What year the initiative started?
      </h1>
      <div class="field">
        <div class="control">
          <input
            type="email"
            v-model="model.private_data.contact_email"
            v-validate="{required: true, email: true }"
            data-vv-as="'Initiative contact email'"
            name="contact_email"
            class="input is-medium has-text-centered"
            placeholder="address@domain.com"
          >
          <div
            class="help is-danger"
            v-if="errors.has('contact_email')"
          >{{errors.first('contact_email')}}</div>
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
export default {
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  methods: {
    goForward: function() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          this.$toast.open({
            message: this.$t("globals.errors.formNotValid"),
            type: "is-warning",
            position: "is-bottom"
          });
          return;
        }
        this.$emit("forward");
      });
    }
  }
};
</script>
