<template>
  <section>
    <h1 class="title is-3">List of my initiatives</h1>
    <p>Take a look at your initiatives</p>
    <br>
    <div class="card">
      <div class="card-content">
        Soon to be available for you!
        <!-- <b-table :data="initiatives" :loading="fetching" striped>
          <template slot-scope="props">
            <b-table-column field="id" label="ID" width="40" numeric>{{ props.row.id }}</b-table-column>
            <b-table-column field="name" label="Name" sortable>{{ props.row.name }}</b-table-column>
            <b-table-column field="created_at" label="Created">{{ props.row.created_at }}</b-table-column>
          </template>
          <template slot="empty">
            <empty-table></empty-table>
          </template>
        </b-table>
        <br>
        <pagination-bar
          resource-url="/v1/initiatives"
          @update="getInitiatives"
          :fetching.sync="fetching"
        ></pagination-bar> -->
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
      initiatives: [],
      fetching: null
    };
  },
  mounted: function() {},
  methods: {
    getInitiatives: function(data) {
      this.initiatives = data;
    }
  }
};
</script>

<style>
</style>
