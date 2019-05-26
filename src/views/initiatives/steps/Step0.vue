<template>
  <div>
    <h1 class="title is-1 has-text-centered">Welcome!</h1>
    <div class="content has-text-centered">
      <p>This form aims to map initiatives that involve young people and Information and Communication Technologies.</p>
      <p>The information will be used to create a network of organizations for future workshops and webinars.</p>
      <p>All the information will be used only within the scope of the Creating Networks project, carried out by the Youth Observatory, the Youth Special Interest Group of the Internet Society.</p>
      <p>
        <button class="button is-primary is-outlined is-large is-rounded" @click="$emit('forward')">
          START
        </button>
        </p>
    </div>
  </div>
</template>
