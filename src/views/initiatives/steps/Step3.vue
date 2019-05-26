<template>
  <div>
    <div class="field">
      <div class="content">
        <p class="has-text-centered is-italic">That sounds pretty good!</p>
        <p class="has-text-centered is-italic">
          Ok, now we need some
          <u>public information</u>
        </p>
      </div>
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">3-A.</span>&nbsp;Whats is (or are) the goal (or goals) of the initiative?
      </h1>
      <div class="field">
        <div class="control">
          <textarea
            name="goal"
            class="textarea"
            v-model="model.public_data.goals"
            rows="2"
            v-validate="{required:true, max:4000}"
            data-vv-as="'Initiative goal'"
            placeholder="Start typing..."
          ></textarea>
          <div class="help is-danger" v-if="errors.has('goal')">{{errors.first('goal')}}</div>
        </div>
      </div>
      <br>
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">3-b.</span>&nbsp;What year the initiative started?
      </h1>
      <div class="field">
        <div class="control">
          <input
            type="text"
            v-model="model.public_data.founding_year"
            v-validate="{required: true, between: [1900,2020], date_format: 'yyyy' }"
            data-vv-as="'Initiative founding year'"
            name="founding_year"
            class="input is-medium has-text-centered"
            placeholder="YYYY"
          >
          <div
            class="help is-danger"
            v-if="errors.has('founding_year')"
          >{{errors.first('founding_year')}}</div>
        </div>
      </div>
      <br>
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">3-b.</span>&nbsp;What is the role of youth in this organization/initative?
      </h1>
      <div class="field">
        <div class="control">
          <div class="block has-text-centered">
            <b-checkbox
              v-model="model.public_data.role_of_youth"
              v-validate="{required:true}"
              name="role"
              size="is-medium"
              native-value="Target Audience"
            >Target Audience</b-checkbox>
            <b-checkbox
              v-model="model.public_data.role_of_youth"
              v-validate="{required:true}"
              name="role"
              size="is-medium"
              native-value="Leadership"
            >Leadership</b-checkbox>
            <b-checkbox
              v-model="model.public_data.role_of_youth"
              v-validate="{required:true}"
              name="role"
              size="is-medium"
              native-value="Membership"
            >Membership</b-checkbox>
          </div>
          <div class="help is-danger has-text-centered" v-if="errors.has('role')">{{errors.first('role')}}</div>
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

<style lang="scss" scoped>
.control-label:hover {
  color: #da8313;
}
</style>
