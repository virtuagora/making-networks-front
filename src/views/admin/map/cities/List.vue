<template>
  <section>
    <h1 class="title is-3">List of registered cities</h1>
    <p>Take a look at the cities added to the platform</p>
    <br>
    <div class="card">
      <div class="card-content">
        <b-table :data="cities" :loading="fetching" striped>
          <template slot-scope="props">
            <b-table-column field="name" label="City name">{{ props.row.name }}</b-table-column>
            <b-table-column label="Country">{{ getSpaceLocalization(props.row.country) }}</b-table-column>
          </template>
          <template slot="empty">
            <empty-table></empty-table>
          </template>
        </b-table>
        <br>
        <pagination-bar
          resource-url="/v1/registered-cities"
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
