<template>
  <section>
    <h1 class="subtitle is-5 has-text-primary has-text-centered">Members</h1>
    <div class="columns is-multiline is-mobile is-centered">
      <div class="column is-6-mobile is-3-desktop has-text-centered" v-for="member in ownersAndMembers" :key="member.id">
        <router-link :to="{name: 'profile',params: {id: member.id}}" class="has-text-white">
        <img :src="makeUserAvatar(member)" class="image is-rounded is-128x128 is-centered member-icon" />
        <p>{{member.display_name}}
          <br>
          <span class="is-size-7" v-if="member.pivot.relation == 'owner'"><i class="fas fa-shield-alt"></i>&nbsp;Owner</span>
          <span class="is-size-7" v-if="member.pivot.relation == 'member'"><i class="fas fa-star"></i>&nbsp;Member</span>
        </p>
        </router-link>
      </div>
    </div>
    <h1 class="subtitle is-5 has-text-primary has-text-centered">Followers</h1>
<div class="columns is-multiline is-mobile is-centered">
      <div class="column is-6-mobile is-3-desktop has-text-centered" v-for="member in followers" :key="member.id">
        <router-link :to="{name: 'profile',params: {id: member.id}}" class="has-text-white">
        <img :src="makeUserAvatar(member)" class="image is-rounded is-64x64 is-centered member-icon" />
        <p>{{member.display_name}}
          <br>
          <span class="is-size-7"><i class="fas fa-thumbs-up"></i>&nbsp;Follower</span>
        </p>
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
      sort: ['owner','member']
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
            offset: this.page * 100,
            size: 100,
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
    ownersAndMembers(){
      return this.members.filter( m => {
        return (['owner','member']).includes(m.pivot.relation)
      }).sort((a,b) => {
        return this.sort.indexOf(a.pivot.relation) - this.sort.indexOf(b.pivot.relation)
      })
    },
    followers(){
      return this.members.filter( m => {
        return m.pivot.relation == 'follower'
      })
    }

  },

};
</script>

<style lang="scss" scoped>
.member-icon{
  margin-bottom: 6px;
}
</style>
