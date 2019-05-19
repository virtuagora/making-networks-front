<template>
  <section class="has-text-centered">
    <div class="field">
      <div class="control">
        <input type="email" class="input is-medium has-text-centered" placeholder="Email">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input type="password" class="input is-medium has-text-centered" placeholder="Password">
      </div>
    </div><br>
    <div class="field">
      <div class="control has-text-centered">
          <a class="is-size-4 has-text-primary">
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
