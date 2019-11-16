<template>
  <section>
    <h1 class="subtitle is-5 has-text-primary has-text-centered">Members</h1>
    <div class="columns is-multiline is-mobile is-centered is-vcentered">
      <div class="column is-6-mobile is-3-desktop has-text-centered" v-for="member in members" :key="member.id">
        <router-link :to="{name: 'profile',params: {id: member.id}}" class="has-text-white">
        <img :src="makeUserAvatar(member)" class="image is-rounded is-96x96 is-centered member-icon" />
        <p>{{member.display_name}}</p>
        </router-link>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" class="section">
        <p>
          <i class="far fa-surprise fa-2x"></i>
        </p>
        <p>End of the list!</p>
      </div>
      <div slot="no-results">
        <p>
          <i class="far fa-frown fa-2x"></i>
        </p>
        <p>Nothing here</p>
      </div>
    </infinite-loading>
  </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  props: ['id'],
  data() {
    return {
      isFetching: false,
      members: [],
      page: 0,
    };
  },
  components: {
    InfiniteLoading,
  },
  methods: {
    infiniteHandler($state) {
      this.isFetching = true;
      this.$http
        .get(`/v1/initiatives/${this.id}/members`, {
          params: {
            offset: this.page * 20,
            size: 20,
          },
        })
        .then(({ data }) => {
          if (data.data.length) {
            this.page += 1;
            this.members.push(...data.data);
            this.isFetching = false;
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
  computed: {
    initiative() {
      return this.$store.getters.initiative;
    },
  },

};
</script>

<style lang="scss" scoped>
.member-icon{
  margin-bottom: 6px;
}
</style>
