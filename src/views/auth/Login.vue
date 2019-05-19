<template>
  <section class="has-text-centered">
    <div class="field">
      <div class="control">
        <input type="email" name="email" v-model="email" v-validate="{required:true,email:true}" class="input is-medium has-text-centered" placeholder="Email">
        <span class="help is-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input type="password" name="password" v-model="password" v-validate="{required: true}" class="input is-medium has-text-centered" placeholder="Password">
        <span class="help is-danger" v-if="errors.has('password')">{{errors.first('password')}}</span>
      </div>
    </div><br>
    <div class="field">
      <div class="control has-text-centered">
          <a @click="submit" class="is-size-4 has-text-primary">
            Log in&nbsp;&nbsp;<i class="fas fa-sign-in-alt fa-lg"></i>
          </a>
      </div>
    </div>
    <br>
    <p>
    Are you new? <router-link :to="{name: 'signup'}" class="has-text-primary">Sign up</router-link>
    </p>
    <p>
    Forgot your password? <router-link :to="{name: 'recoverRequest'}" class="has-text-primary">Recover</router-link>
    </p>
  </section>
</template>

<script>
export default {
  data(){
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    getCredentials: function(){
      let credentials = {}
      credentials.username = this.email
      credentials.password = this.password
      return credentials
    },
    submit: function(){
      this.$validator.validateAll().then((valid) => {
        if (!valid) {
          // Not valid
          this.$toast.open({ message: this.$t('globals.formNotValid'), type: 'is-danger' });
          return false;
        }
        // is valid, then...
        this.startLoading();
        this.$http.post('/v1/tokens', null ,{
          auth: this.getCredentials()
        }).then((res) => {
            console.log(res);
            this.$toast.open('Welcome back!')
            this.$store.dispatch('login',res.data)
            this.$router.push({name: 'home'})
          }).catch((err) => {
            console.error(err);
            if(err.response && err.response.data) this.$toast.open(err.response.data.message);
          }).finally(() => {
            this.stopLoading();
          });
      });
    }
  }
}
</script>
