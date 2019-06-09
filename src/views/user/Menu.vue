<template>
  <div>
    <router-link :to="{name: 'home'}"><img src="/iso-cn.svg" class="image logo" alt=""></router-link>
  <aside class="menu">
  <ul class="menu-list">
    <li><router-link :to="{name: 'home'}"><i class="fas fa-arrow-left"></i>&nbsp;Home</router-link></li>
    <li><router-link :to="{name: 'user'}">Dashboard</router-link></li>
  </ul>
  <p class="menu-label">
    My initiatives
  </p>
  <ul class="menu-list">
    <li><router-link :to="{name: 'userInitiativesList'}">List initiatives</router-link></li>
    <li><router-link :to="{name: 'newInitiative'}"><i class="fas fa-plus"></i>&nbsp;New initiative</router-link></li>
  </ul>
  <p class="menu-label">
    My account
  </p>
  <ul class="menu-list">
    <li><router-link :to="{name: 'userAccountChangePassword'}">Change password</router-link></li>
  </ul>
</aside>
  </div>
</template>

<style lang="scss" scoped>
.logo{
  width: 30px;
  margin-bottom: 10px;
}
</style>
