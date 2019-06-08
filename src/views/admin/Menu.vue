<template>
  <div>
    <router-link :to="{name: 'home'}"><img src="/iso-cn.svg" class="image logo" alt=""></router-link>
  <aside class="menu">
  <ul class="menu-list">
    <li><router-link :to="{name: 'admin'}">Start</router-link></li>
    <li><router-link :to="{name: 'home'}"><i class="fas fa-arrow-left"></i>&nbsp;Go Back</router-link></li>
  </ul>
  <p class="menu-label">
    Initiative management
  </p>
  <ul class="menu-list">
    <li><router-link :to="{name: 'adminInitiativesList'}">List initiatives</router-link></li>
    <li><router-link :to="{name: 'adminInitiativesListCities'}">List cities with initiative</router-link></li>
    <li><router-link :to="{name: 'adminInitiativesNew'}"><i class="fas fa-plus"></i>&nbsp;New initiative</router-link></li>
  </ul>
  <p class="menu-label">
    Map management
  </p>
  <ul class="menu-list">
    <li><router-link :to="{name: 'adminMapCitiesList'}">List cities</router-link></li>
    <li><router-link :to="{name: 'adminMapCitiesNew'}"><i class="fas fa-plus"></i>&nbsp;New city</router-link></li>
    <li><router-link :to="{name: 'adminMapCountriesList'}">List countries</router-link></li>
    <li><router-link :to="{name: 'adminMapRegionsList'}">List regions</router-link></li>
  </ul>
   <p class="menu-label">
    Configuration
  </p>
  <ul class="menu-list">
    <li><router-link :to="{name: 'adminConfigAdministrators'}">Administrators</router-link></li>
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
