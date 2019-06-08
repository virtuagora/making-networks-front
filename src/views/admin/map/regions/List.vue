<template>
  <section>
    <h1 class="title is-3">List of registered regions</h1>
    <p>Take a look at the regions added to the platform</p>
    <br>
    <div class="card">
      <div class="card-content">
        <b-table :data="regions" :loading="fetching" striped>
          <template slot-scope="props">
            <b-table-column field="name" label="Country name">{{ getSpaceLocalization(props.row) }}</b-table-column>
          </template>
          <template slot="empty">
            <empty-table></empty-table>
          </template>
        </b-table>
        <br>
        <pagination-bar
          resource-url="/v1/regions"
          @update="getRegions"
          :fetching.sync="fetching"
          :query="{size:20}"
        ></pagination-bar>
      </div>
    </div>
  </section>
</template>

<script>
import PaginationBar from "@/components/utils/PaginationBar";
import EmptyTable from "@/components/utils/EmptyTable";

export default {
  components: {
    PaginationBar,
    EmptyTable
  },
  data() {
    return {
      regions: [],
      fetching: null
    };
  },
  mounted: function() {},
  methods: {
    getRegions: function(data) {
      this.regions = data;
    },
  }
};
</script>

<style>
</style>