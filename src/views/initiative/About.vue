<template>
  <section>
    <h1 class="subtitle is-5 has-text-primary">Description</h1>
    <div class="content add-br">
      <p>{{initiative.description}}</p>
    </div>
    <h1 class="subtitle is-5 has-text-primary">Social networks</h1>
      <div class="content">
        <p v-if="initiative.public_data.website">
          <a
            :href="`https://${initiative.public_data.website}`"
            target="_blank"
            class="has-text-white"
          >
            <i class="fas fa-globe fa-lg fa-fw"></i>
            &nbsp; https://{{initiative.public_data.website}}
          </a>
        </p>
 

        <p v-if="initiative.public_data.facebook">
          <a
            :href="`https://facebook.com/${initiative.public_data.facebook}`"
            target="_blank"
            class="has-text-white"
            v-if="initiative.public_data.facebook"
          >
            <i class="fab fa-facebook-f fa-lg fa-fw"></i>
            &nbsp; https://facebook.com/{{initiative.public_data.facebook}}
          </a>
        </p>


        <p v-if="initiative.public_data.twitter">
          <a
            :href="`https://twitter.com/${initiative.public_data.twitter}`"
            target="_blank"
            class="has-text-white"
            v-if="initiative.public_data.twitter"
          >
            <i class="fab fa-twitter fa-lg fa-fw"></i>
            &nbsp; https://twitter.com/{{initiative.public_data.twitter}}
          </a>
        </p>

        <p v-if="initiative.public_data.other_network">
          <a
            :href="`https://${initiative.public_data.other_network}`"
            target="_blank"
            class="has-text-white"
          >
            <i class="fas fa-external-link-alt fa-lg fa-fw"></i>
            &nbsp; https://{{initiative.public_data.other_network}}
          </a>
        </p>
      </div>
    <div v-if="!hasSocialNetworks">
      <p>
        <i>The initiative didn't add social networks</i>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    initiative() {
      return this.$store.getters.initiative;
    },
    hasSocialNetworks() {
      return (
        this.initiative.public_data.facebook ||
        this.initiative.public_data.twitter ||
        this.initiative.public_data.website ||
        this.initiative.public_data.other_network
      );
    }
  }
};
</script>

<style>
</style>
