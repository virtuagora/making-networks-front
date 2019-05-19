<template>
  <section class="has-text-centered">
    <p>
    Lost your password? Don't worry! Enter your email address and we will send you a link to recover your account
    </p>
    <br>
    <div class="field">
      <div class="control">
        <input type="email" class="input is-medium has-text-centered" placeholder="Email">
      </div>
    </div>
    <br>
    <div class="field">
      <div class="control has-text-centered">
          <a class="is-size-4 has-text-primary">
            Create new account&nbsp;&nbsp;<i class="fas fa-user-plus fa-lg"></i>
          </a>
      </div>
    </div>
    <br>
    <p>
    Already a user? <router-link :to="{name: 'login'}" class="has-text-primary">Log in</router-link>
    </p>
  </section>
</template>
