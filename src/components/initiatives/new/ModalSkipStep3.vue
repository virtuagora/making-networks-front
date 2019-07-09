<template>
  <div class="modal-card" style="width: 100%">
    <!-- <header class="modal-card-head">
      <p class="modal-card-title">Add your city</p>
    </header>-->
    <section class="modal-card-body has-text-centered">
      <div class="content">
        <h1 class="title is-3">Before continuing...</h1>
        <p>If you weren't able to find your city, we are sorry about that :(</p>
        <p>You can contact us to add your location by filling our support form by going to <a href="https://docs.google.com/forms/d/e/1FAIpQLSf02YyfE8ddsf5B0u2wSF_ZggEYQi_-U0fQQcSaqfdtKmpWng/viewform" target="_blank" title="Support and feedback form">to this link</a></p>
        <div class="buttons is-centered">
          <button class="button is-outlined is-dark" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" type="button" @click="nextStep">Next step</button>
        </div>
      </div>
    </section>
    <!-- <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
      <button class="button is-primary"><i class="fas fa-plus"></i>&nbps;Add city</button>
    </footer>-->
  </div>
</template>

<script>
export default {
  methods: {
    nextStep: function(){
      this.$emit('continue')
      this.$parent.close()
    }
  }
}
</script>


<style scoped>
.modal-card {
  color: #000;
}
</style>
