<template>
  <section>
    <h1 class="title is-3">List of cities with initiatives</h1>
    <p>Take a look at the cities with initiatives added to the platform</p>
    <br>
    <div class="card">
      <div class="card-content">
        <b-table :data="cities" :loading="fetching" striped>
          <template slot-scope="props">
            <!-- <b-table-column field="id" label="ID" width="40" numeric>{{ props.row.id }}</b-table-column>
            <b-table-column field="name" label="Name" sortable>{{ props.row.name }}</b-table-column>
            <b-table-column field="created_at" label="Created">{{ props.row.created_at }}</b-table-column> -->
            <b-table-column field="name" label="City Name" sortable>{{ props.row.name }}</b-table-column>
            <b-table-column field="iniciatives_count" label="Iniciatives count" numeric sortable>{{ props.row.initiatives_count }}</b-table-column>
          </template>
          <template slot="empty">
            <empty-table></empty-table>
          </template>
        </b-table>
        <br>
        <pagination-bar
          resource-url="/v1/cities"
          @update="getCities"
          :fetching.sync="fetching"
        ></pagination-bar>
      </div>
    </div>
  </section>
</template>

<script>
import PaginationBar from '@/components/utils/PaginationBar';
import EmptyTable from '@/components/utils/EmptyTable';

export default {
  components: {
    PaginationBar,
    EmptyTable,
  },
  data() {
    return {
      cities: [],
      fetching: null,
    };
  },
  mounted() {},
  methods: {
    getCities(data) {
      this.cities = data;
    },
  },
};
</script>

<style>
</style>
