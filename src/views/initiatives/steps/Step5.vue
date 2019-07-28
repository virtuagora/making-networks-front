<template>
  <div>
    <div class="field">
      <div class="content">
        <p
          class="has-text-centered is-italic"
          v-for="(p,index) in $t('forms.user.addInitiative.step5.conversation')"
          :key="index"
        >{{p}}</p>
      </div>
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">4-A.</span>
        &nbsp;{{$t('forms.user.addInitiative.step5.fields[0].question')}}
      </h1>
      <div class="field">
        <div class="control">
          <textarea
            name="goal"
            class="textarea"
            v-model="model.public_data.goals"
            rows="2"
            v-validate="{required:true, max:750}"
            :data-vv-as="$t('forms.user.addInitiative.step5.fields[0].fieldName')"
            :placeholder="$t('forms.user.addInitiative.step5.fields[0].placeholder')"
          ></textarea>
          <div class="help is-danger" v-if="errors.has('goal')">{{errors.first('goal')}}</div>
        </div>
      </div>
      <br />
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">4-B.</span>
        &nbsp;{{$t('forms.user.addInitiative.step5.fields[1].question')}}
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
          />
          <div
            class="help is-danger"
            v-if="errors.has('founding_year')"
          >{{errors.first('founding_year')}}</div>
        </div>
      </div>
      <br />
      <h1 class="subtitle is-5 has-text-centered">
        <span class="is-500 has-text-primary">4-C.</span>
        &nbsp;{{$t('forms.user.addInitiative.step5.fields[2].question')}}
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
        <br />
        <h1 class="subtitle is-5 has-text-centered">
          <span class="is-500 has-text-primary">4-D.</span>
          &nbsp;{{$t('forms.user.addInitiative.step5.fields[3].question')}}
        </h1>
        <div class="columns is-centered">
          <div class="column is-10">
            <div class="field">
              <div class="control">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static is-medium">
                      <i class="fas fa-globe fa-fw"></i>
                    </a>
                  </p>
                  <p class="control">
                    <a class="button is-static is-medium">
                      https://
                    </a>
                  </p>
                  <div class="control is-expanded">
                    <input
                      type="text"
                      v-model="model.public_data.website"
                      class="input is-medium has-text-centered"
                      name="website"
                      v-validate="{required: false, min: 5, max:100, url: true }"
                      :data-vv-as="$t('forms.user.addInitiative.step5.fields[3].inputs.website')"
                      :placeholder="$t('forms.user.addInitiative.optional')"
                    />
                  </div>
                </div>
                <div class="help is-danger" v-if="errors.has('website')">{{errors.first('website')}}</div>
                <a :href="`https://${model.public_data.website}`"  class="has-text-primary help" v-if="!errors.has('website') && model.public_data.website">{{$t('forms.user.addInitiative.step5.fields[3].labels.test')}}</a>
              </div>
            </div>
            <div class="field">
              <div class="control">

            <div class="field has-addons">
              <p class="control">
                <a class="button is-static is-medium">
                  <i class="fab fa-facebook fa-fw"></i>
                </a>
              </p>
              <p class="control">
                <a class="button is-static is-medium">
                  https://facebook.com/
                </a>
              </p>
              <div class="control is-expanded">
                <input
                  type="text"
                  v-model="model.public_data.facebook"
                  class="input is-medium has-text-centered"
                  name="facebook"
                  v-validate="{required: false, min: 3, max:100 }"
                  :data-vv-as="$t('forms.user.addInitiative.step5.fields[3].inputs.facebook')"
                  :placeholder="$t('forms.user.addInitiative.optional')"
                />
              </div>
            </div>
             <div
                  class="help is-danger"
                  v-if="errors.has('facebook')"
                >{{errors.first('facebook')}}</div>
                <a :href="`https://facebook.com/${model.public_data.facebook}`"  class="has-text-primary help" v-if="!errors.has('facebook') && model.public_data.facebook">{{$t('forms.user.addInitiative.step5.fields[3].labels.test')}}</a>
              </div>
            </div>
            <div class="field">
              <div class="control">

            <div class="field has-addons">
              <p class="control">
                <a class="button is-static is-medium">
                  <i class="fab fa-twitter fa-fw"></i>
                </a>
              </p>
               <p class="control">
                <a class="button is-static is-medium">
                  https://twitter.com/
                </a>
              </p>
              <div class="control is-expanded">
                <input
                  type="text"
                  v-model="model.public_data.twitter"
                  class="input is-medium has-text-centered"
                  name="twitter"
                  v-validate="{required: false, min: 3, max:100 }"
                  :data-vv-as="$t('forms.user.addInitiative.step5.fields[3].inputs.twitter')"
                  :placeholder="$t('forms.user.addInitiative.optional')"
                />
              </div>
            </div>
                <div class="help is-danger" v-if="errors.has('twitter')">{{errors.first('twitter')}}</div>
                <a :href="`https://twitter.com/${model.public_data.twitter}`"  class="has-text-primary help" v-if="!errors.has('twitter') && model.public_data.twitter">{{$t('forms.user.addInitiative.step5.fields[3].labels.test')}}</a>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static is-medium">
                      <i class="fas fa-asterisk fa-fw"></i>
                    </a>
                  </p>
                  <p class="control">
                    <a class="button is-static is-medium">
                      https://
                    </a>
                  </p>
                  <div class="control is-expanded">
                    <input
                      type="text"
                      v-model="model.public_data.other_network"
                      class="input is-medium has-text-centered"
                      name="other_network"
                      v-validate="{required: false, min: 5, max:100, url: true }"
                      :data-vv-as="$t('forms.user.addInitiative.step5.fields[3].inputs.other_network')"
                      :placeholder="$t('forms.user.addInitiative.step5.fields[3].labels.other_network')"
                    />
                  </div>
                </div>
                <div class="help is-danger" v-if="errors.has('other_network')">{{errors.first('other_network')}}</div>
                <a :href="`https://${model.public_data.other_network}`"  class="has-text-primary help" v-if="!errors.has('other_network') && model.public_data.other_network">{{$t('forms.user.addInitiative.step5.fields[3].labels.test')}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
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
      required: true
    }
  },
  methods: {
    goTo(step) {
      this.$emit("goTo", step);
    },
    goForward() {
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

<style lang="scss">
.b-checkbox.checkbox:hover {
  .control-label,
  .check {
    color: #da8313;
  }
}
.button.is-static {
  background-color: transparent;
  border-radius: 0;
}
</style>
