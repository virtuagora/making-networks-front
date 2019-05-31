<template>
  <div>
    <div class="content">
      <p
        class="has-text-centered is-italic"
      >{{$t('forms.user.addInitiative.step2.conversation[0]',{initiativeName: model.name})}}</p>
      <p
        class="has-text-centered is-italic"
      >{{$t('forms.user.addInitiative.step2.conversation[1]')}}</p>
    </div>
    <h1 class="subtitle is-5 has-text-centered">
      <span class="is-500 has-text-primary">2.</span>
      &nbsp;{{$t('forms.user.addInitiative.step2.fields[0].question')}}
    </h1>
    <div class="field">
      <div class="control">
        <textarea
          name="description"
          class="textarea"
          v-model="model.description"
          rows="6"
          v-validate="{required:true, max:4000}"
          :data-vv-as="$t('forms.user.addInitiative.step2.fields[0].fieldName')"
          :placeholder="$t('forms.user.addInitiative.step2.fields[0].placeholder')"
        ></textarea>
        <div class="help is-danger" v-if="errors.has('description')">{{errors.first('description')}}</div>
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
