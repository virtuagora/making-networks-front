<template>
  <div>
    <div class="field">
      
    <h1 class="subtitle is-5 has-text-centered"><span class="is-500 has-text-primary">1.</span>&nbsp;Whats the name of your initiative?</h1>
      <div class="control">
        <input
          type="text"
          v-model="model.name"
          v-validate="{required: true}"
          data-vv-as="'Initiative name'"
          name="initiative"
          class="input is-medium has-text-centered"
          placeholder="Name of your initiative"
        >
        <div class="help is-danger" v-if="errors.has('initiative')">{{errors.first('initiative')}}</div>
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
            position: 'is-bottom'
          });
          return;
        }
        this.$emit("forward");
      });
    }
  }
};
</script>
