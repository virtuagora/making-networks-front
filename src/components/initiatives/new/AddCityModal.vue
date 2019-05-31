<template>
  <div class="modal-card" style="width: 100%">
    <!-- <header class="modal-card-head">
      <p class="modal-card-title">Add your city</p>
    </header>-->
    <section class="modal-card-body has-text-centered">
      <div class="content">
        <h1 class="title is-3">This feature will be available soon</h1>
        <p>Sorry! We will add this feature in a future update, stay tuned!</p>
        <div class="buttons is-centered">
          <button class="button is-outlined is-dark" type="button" @click="$parent.close()">Close</button>
        </div>
      </div>
    </section>
    <!-- <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
      <button class="button is-primary"><i class="fas fa-plus"></i>&nbps;Add city</button>
    </footer>-->
  </div>
</template>

<style scoped>
.modal-card {
  color: #000;
}
</style>
