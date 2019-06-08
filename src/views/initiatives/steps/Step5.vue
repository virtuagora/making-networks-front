<template>
  <div>
    <div class="field">
      <div class="content">
        <p
        class="has-text-centered is-italic"
      v-for="(p,index) in $t('forms.user.addInitiative.step5.conversation')" :key="index">{{p}}</p>
      </div>
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">4-A.</span>&nbsp;{{$t('forms.user.addInitiative.step5.fields[0].question')}}
      </h1>
      <div class="field">
        <div class="control">
          <textarea
            name="goal"
            class="textarea"
            v-model="model.public_data.goals"
            rows="2"
            v-validate="{required:true, max:4000}"
            :data-vv-as="$t('forms.user.addInitiative.step5.fields[0].fieldName')"
            :placeholder="$t('forms.user.addInitiative.step5.fields[0].placeholder')"
          ></textarea>
          <div class="help is-danger" v-if="errors.has('goal')">{{errors.first('goal')}}</div>
        </div>
      </div>
      <br>
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">4-B.</span>&nbsp;{{$t('forms.user.addInitiative.step5.fields[1].question')}}
      </h1>
      <div class="field">
        <div class="control">
          <input
            type="text"
            v-model="model.public_data.founding_year"
            class="input is-medium has-text-centered"
            name="founding_year"
            v-validate="{required: true, between: [1900,2020], date_format: 'yyyy' }"
            :data-vv-as="$t('forms.user.addInitiative.step5.fields[1].fieldName')"
            :placeholder="$t('forms.user.addInitiative.step5.fields[1].placeholder')"
          >
          <div
            class="help is-danger"
            v-if="errors.has('founding_year')"
          >{{errors.first('founding_year')}}</div>
        </div>
      </div>
      <br>
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">4-C.</span>&nbsp;{{$t('forms.user.addInitiative.step5.fields[2].question')}}
      </h1>
      <div class="field">
        <div class="control">
          <div class="block has-text-centered">
            <b-radio
              v-model="model.public_data.role_of_youth"
              v-validate="{required:true}"
              name="role"
              size="is-medium"
              native-value="targetAudience"
            >{{$t('forms.user.addInitiative.step5.fields[2].options')['targetAudience']}}</b-radio>
            <b-radio
              v-model="model.public_data.role_of_youth"
              v-validate="{required:true}"
              name="role"
              size="is-medium"
              native-value="leadership"
            >{{$t('forms.user.addInitiative.step5.fields[2].options')['leadership']}}</b-radio>
            <b-radio
              v-model="model.public_data.role_of_youth"
              v-validate="{required:true}"
              name="role"
              size="is-medium"
              native-value="membership"
            >{{$t('forms.user.addInitiative.step5.fields[2].options')['membership']}}</b-radio>
          </div>
          <div
            class="help is-danger has-text-centered"
            v-if="errors.has('role')"
          >{{errors.first('role')}}</div>
        </div>
      </div>
    </div>
    <br>
    <div class="buttons is-centered">
      <button @click="goTo(3)" class="button is-rounded is-white is-outlined is-medium">
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
      required: true,
    },
  },
  methods: {
    goTo(step) {
      this.$emit('goTo', step);
    },
    goForward() {
      this.$validator.validateAll().then((valid) => {
        if (!valid) {
          this.$toast.open({
            message: this.$t('globals.errors.formNotValid'),
            type: 'is-warning',
            position: 'is-bottom',
          });
          return;
        }
        this.$emit('forward');
      });
    },
  },
};
</script>

<style lang="scss">
.b-checkbox.checkbox:hover {
  .control-label,
  .check {
    color: #da8313;
  }
}
</style>
