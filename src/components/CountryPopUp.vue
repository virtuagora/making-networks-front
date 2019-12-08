<template>
  <div class="modal-card" style="width: 100%">
    <section class="modal-card-body has-text-centered">
      <div class="content">
        <p><span class="is-size-4 is-700">{{resource.initiatives}} initiatives</span><br> have or does some work (or activity) in</p>
        <h1 class="subtitle is-3 has-text-primary is-marginless">{{resource.name}}</h1>
      </div>
      <div v-if="!getching">
        <p v-for="initiative in initiatives" :key="initiative.id">
          <a @click="goToInitiative(initiative.id)">
            <i class="fas fa-map-marked-alt has-text-primary"></i>
            &nbsp;{{initiative.name}}
          </a>
        </p>
      </div>
      <div v-else>
        <p>
          <i class="fas fa-spin fa-sync"></i>&nbsp;Loading...
        </p>
      </div>
      <br>
      <div class="buttons is-centered">
        <button class="button is-dark is-small" type="button" @click="$parent.close()">Close</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      initiatives: [],
      fetching: true
    }
  },
  mounted: function(){
    this.getInitiatives()
  },
  methods: {
    getInitiatives() {
        this.$http.get(`/v1/initiatives?countries=${this.resource.countryId}`).then((res) => {
          this.initiatives = res.data.data;
          this.fetching = false
        });
      },
    goToInitiative(id){
      this.$parent.close()
      this.$router.push({name: 'initiative', params: { id: id }})
    }
    }
  }
</script>
