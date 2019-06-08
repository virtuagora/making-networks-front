<template>
  <section class="columns is-centered">
    <div class="column is-8">

    <h1 class="title animated fadeInUp is-4 has-text-centered">{{$t('forms.user.addInitiative.confirmation.congratulations')}}!</h1>
    <div class="box is-light has-text-centered">
      <p class="animated heartBeat delay-1s has-text-success"><i class="fas fa-check-circle fa-lg"></i></p>
      <p class="has-text-black">{{$t('forms.user.addInitiative.confirmation.text[0]')}}</p>
    </div>
    <div class="content has-text-centered">
    <p>{{$t('forms.user.addInitiative.confirmation.text[1]')}}</p>
    <p><router-link :to="{name: 'home'}" class="has-text-primary"><i class="fas fa-home"></i>&nbsp;{{$t('globals.buttonLabels.goHome')}}</router-link></p>
    </div>
    </div>
  </section>
</template>

<script>
export default {

};
</script>

<style>

</style>
