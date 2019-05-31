<template>
  <section class="has-text-centered" v-if="!response.ok">
    <p>{{$t('auth.completeSignUp.description[0]')}}</p>
    <p>{{$t('auth.completeSignUp.description[1]')}}</p>
    <br>
    <div class="field">
      <div class="control">
        <input
          type="text"
          v-model="names"
          name="names"
          class="input has-text-centered"
          v-validate="{required: true, alpha_spaces: true}"
          :placeholder="$t('auth.completeSignUp.placeholder.names')"
        >
        <span class="help is-danger" v-if="errors.has('names')">{{errors.first('names')}}</span>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input
          type="text"
          v-model="surnames"
          name="surnames"
          class="input has-text-centered"
          v-validate="{required: true, alpha_spaces: true}"
          :placeholder="$t('auth.completeSignUp.placeholder.surnames')"
        >
        <span class="help is-danger" v-if="errors.has('surnames')">{{errors.first('surnames')}}</span>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input
          type="password"
          v-model="password"
          name="password"
          class="input has-text-centered"
          ref="password"
          v-validate="{required: true, min:6}"
          :placeholder="$t('auth.completeSignUp.placeholder.password')"
        >
        <span class="help is-danger" v-if="errors.has('password')">{{errors.first('password')}}</span>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input
          type="password"
          v-model="confirmPassword"
          name="confirmPassword"
          class="input has-text-centered"
          v-validate="{required: true, confirmed: 'password'}"
          :placeholder="$t('auth.completeSignUp.placeholder.confirmPassword')"
        >
        <span class="help is-danger" v-if="errors.has('confirmPassword')">{{errors.first('confirmPassword')}}</span>
      </div>
    </div>
    <br>
    <div class="field">
      <div class="control has-text-centered ">
        <a @click="submit" class="is-size-4 has-text-primary">
          {{$t('auth.completeSignUp.actionButton')}}
        </a>
      </div>
    </div>
  </section>
  <section v-else>
    <h1 class="title animated fadeInUp is-4 has-text-centered"> {{$t('auth.completeSignUp.response.title')}}</h1>
    <div class="box is-light has-text-centered">
      <p class="animated heartBeat delay-1s has-text-success"><i class="fas fa-check-circle fa-lg"></i></p>
      <p class="has-text-black">{{$t('auth.completeSignUp.response.notification')}}</p>
    </div>
    <div class="content has-text-centered">
    <p>{{$t('auth.completeSignUp.response.instruction')}}</p>
    <p><router-link :to="{name: 'login'}" class="has-text-primary"><i class="fas fa-sign-in-alt"></i>&nbsp;{{$t('auth.completeSignUp.response.login')}}</router-link></p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    token: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      names: null,
      surnames: null,
      password: null,
      confirmPassword: null,
      response: {
        ok: false,
      },
    };
  },
  methods: {
    getPayload() {
      const data = {};
      const options = {};
      data.names = this.names;
      data.surnames = this.surnames;
      data.password = this.password;
      options.token = this.token;
      return {
        data, options,
      };
    },
    submit() {
      this.$validator.validateAll().then((valid) => {
        if (!valid) {
          // Not valid
          this.$toast.open({ message: this.$t('globals.formNotValid'), type: 'is-danger' });
          return false;
        }
        // is valid, then...
        this.startLoading();
        this.$http.post('/v1/users', this.getPayload())
          .then((res) => {
            console.log(res);
            this.response.ok = true
          }).catch((err) => {
             console.error(err);
            if(err.response && err.response.data) this.$toast.open(err.response.data.message);
          }).finally(() => {
            this.stopLoading();
          });
      });
    },
  },
};
</script>
