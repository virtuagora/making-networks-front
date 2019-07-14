<template>
  <section id="auth" class="hero is-fullheight is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-4">
            <router-link :to="{name: 'home'}"><img src="/iso-cn.svg" class="logo-v image is-centered" alt="Creating Networks Logo"></router-link>
            <router-view></router-view>
            <br>
             <p class="has-text-centered">
      <router-link :to="{name: 'home'}" class="has-text-primary">Go back</router-link>
    </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.logo-v{
  width: 60px;
  margin-bottom: 2rem !important;
  // margin-bottom: 30px;
}
</style>
