<template>
  <section>
    <h1 class="title is-3 has-text-dark">Areas of interest of the initiative</h1>
    <p>Here you can see the areas of interests of the initiative. Click <i class="fas fa-times-circle"></i>&nbsp;to delete an area</p>
    <br>
      <b-taglist v-if="currentAreas && currentAreas.length > 0">
        <b-tag v-for="area in currentAreas" type="is-primary" size="is-medium" closable :key="area.id" @close="remove(area.id)">{{area.name}}</b-tag>
      </b-taglist>
      <div class="notification is-warning" v-else>
        <i class="fas fa-exclamation-circle"></i>&nbsp;There are no areas of interest associated to the initiative
      </div>
    <hr>
    <h1 class="title has-text-dark is-3">Manage areas of interest</h1>
    <p>Here you can add multiples areas of interest to the initiative</p>
    <br>
    <div class="columns">
      <div class="column">
        <div class="notification">
        <h1 class="subtitle is-5">Available areas of interests</h1>
        <b-taglist>
           <b-tag v-for="area in availableAreas" @click.native="selectedAreas.push(area)" type="is-info" :key="area.id" style="cursor: pointer">{{area.name}}</b-tag>
        </b-taglist>
        </div>
      </div>
      <div class="column is-narrow is-hidden-touch"><br><i class="fas fa-arrow-right fa-lg"></i></div>
      <div class="column">
        <div class="notification">
        <h1 class="subtitle is-5">New areas</h1>
        <b-taglist>
           <b-tag v-for="area in selectedAreas" type="is-info" :key="area.id">{{area.name}}</b-tag>
        </b-taglist>
        </div>
    <div class="field">
          <div class="control">
              <div class="buttons is-right">
            <button class="button is-primary" @click="submit" :disabled="selectedAreas.length == 0" >Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>
</template>

<script>
import PaginationBar from "@/components/utils/PaginationBar";
import EmptyTable from "@/components/utils/EmptyTable";
import { differenceBy } from 'lodash';

export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    PaginationBar,
    EmptyTable
  },
  data() {
    return {
      currentAreas: [],
      areas: [],
      selectedAreas: [],
    };
  },
  mounted: function() {
    this.currentAreas = this.model.terms
    this.fetchAvailableAreasOfInterest()
  },
  methods: {
    fetchAvailableAreasOfInterest: function(){
      this.startLoading();
      this.$http
        .get(`/v1/terms?taxonomy=topics&size=100`)
        .then(res => {
          this.areas = res.data.data
        })
        .catch(err => {
          console.error(err);
          this.$toast.open({
            message: `<i class="fas fa-times"></i>&nbsp;Error while fetching areas of interest`,
            type: "is-danger"
          });
        })
        .finally( () => {
          this.stopLoading();
        })
    },
    
   
    getPayload: function() {
      let data = { };
      data.terms = this.selectedAreas.map( a => a.id )
      return { data };
    },
    submit: function() {
      this.startLoading();
      this.$http
        .post(
          `/v1/initiatives/${this.id}/terms`,
          this.getPayload()
        )
        .then(res => {
          this.selectedAreas.forEach(area => {
            this.currentAreas.push(area)
          })
          this.selectedAreas = []
          this.$emit('updateModel')
          this.$toast.open({
            message: `<i class="fas fa-check"></i>&nbsp;Areas of interests added to the initiative`,
            type: "is-success"
          });
        })
        .catch(err => {
          console.error(err);
          this.$toast.open({
            message: `<i class="fas fa-times"></i>&nbsp;Error while adding the area of interest`,
            type: "is-danger"
          });
        })
        .finally( () => {
          this.stopLoading();
        });
    },
    remove: function(id) {
      this.startLoading();
      this.$http
        .delete(
          `/v1/initiatives/${this.id}/terms/${id}`
        )
        .then(res => {
          // this.$emit('updateModel')
          this.currentAreas = this.currentAreas.filter( area => {
            return area.id != id 
          })
          this.$toast.open({
            message: `<i class="fas fa-check"></i>&nbsp;Area of interest has been removed from the initiative`,
            type: "is-success"
          });
        })
        .catch(err => {
          console.error(err);
          this.$toast.open({
            message: `<i class="fas fa-times"></i>&nbsp;Error while removing Area of interest from initiative`,
            type: "is-danger"
          });
        })
        .finally( () => {
          this.stopLoading();
        });
    }
  },
  computed: {
    availableAreas: function(){
      if(!this.areas) return []
      let auxAreas = differenceBy(this.areas, this.currentAreas, 'id')
      return differenceBy(auxAreas, this.selectedAreas, 'id')
    }
  }
};
</script>

<style>
</style>
