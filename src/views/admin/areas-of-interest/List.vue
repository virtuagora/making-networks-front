<template>
  <section>
    <h1 class="title is-3">List of areas of interest</h1>
    <p>Take a look at the areas of interest added to the platform</p>
    <br>
    <div class="card">
      <div class="card-content">
        <b-table :data="terms" :loading="fetching" striped>
          <template slot-scope="props">
            <b-table-column field="name" label="Areas" sortable>{{ props.row.name }}</b-table-column>
          </template>
          <template slot="empty">
            <empty-table></empty-table>
          </template>
        </b-table>
        <br>
        <pagination-bar
          resource-url="/v1/terms"
          :query="query"
          @update="getTerms"
          :fetching.sync="fetching"
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
      terms: [],
      fetching: null,
      query: {
        taxonomy: 'topics'
      }
    };
  },
  mounted: function() {},
  methods: {
    getTerms: function(data) {
      this.terms = data;
    }
  }
};
</script>

<style>
</style>
