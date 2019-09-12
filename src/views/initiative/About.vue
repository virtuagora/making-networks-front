<template>
  <section>
    <h1 class="subtitle is-5 has-text-primary">Description</h1>
    <div class="content add-br">
      <p>{{initiative.description}}</p>
    </div>
    <div class="columns">
      <div class="column">
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
      </div>
      <div class="column">
        <h1 class="subtitle is-5 has-text-primary">Areas of interest</h1>
        <div class="content" v-if="initiative.terms.length == 0">
          <p><i>No areas of interest has been added to the initiative</i></p>
        </div>
        <div class="tags">
          <span class="tag is-rounded is-medium is-primary" v-for="area in initiative.terms" :key="area.id">{{area.name}}</span>
        </div>
      </div>
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
