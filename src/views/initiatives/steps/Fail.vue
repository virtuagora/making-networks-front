<template>
  <div class>
    <div class="has-text-centered">
      <i class="fas fa-times fa-2x has-text-danger"></i>
    </div>
    <br>
    <div class="content">
      <h5
        class="subtitle is-5 has-text-centered is-italic is-marginless"
      >Fail :(</h5>
      <p class="has-text-centered is-italic">Something went wrong...</p>
    <p class="has-text-centered"><a @click="$emit('goTo',8)" class="has-text-primary"><i class="fas fa-reply"></i>&nbsp;{{$t('globals.buttonLabels.retry')}}</a></p>      
    </div>
  </div>
</template>

<script>
export default {
  methods: {

  }
};
</script>


