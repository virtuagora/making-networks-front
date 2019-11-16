<template>
  <section>
    <h1 class="title is-3">List of registered countries</h1>
    <p>Take a look at the countries added to the platform</p>
    <br>
    <div class="card">
      <div class="card-content">
        <b-table :data="countries" :loading="fetching" striped>
          <template slot-scope="props">
            <b-table-column field="name" label="Country name">{{ getSpaceLocalization(props.row) }}</b-table-column>
          </template>
          <template slot="empty">
            <empty-table></empty-table>
          </template>
        </b-table>
        <br>
        <pagination-bar
          resource-url="/v1/countries"
          @update="getCountries"
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
      countries: [],
      fetching: null,
    };
  },
  mounted() {},
  methods: {
    getCountries(data) {
      this.countries = data;
    },
  },
};
</script>

<style>
</style>
