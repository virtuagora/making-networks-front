<template>
  <section>
    <b-field grouped position="is-centered">
      <b-field>
        <b-autocomplete
          rounded
          v-model="queryRegion"
          :data="filteredRegions"
          :placeholder="placeholderRegions"
          :open-on-focus="true"
          :loading="fetchingRegions"
          icon="search"
          field="name"
          @select="option => selectRegion(option)"
        >
          <template slot="empty">{{$t('admin.initiatives.create.fields.location.noResults')}}</template>
          <template slot-scope="props">{{ props.option.name }}</template>
        </b-autocomplete>
      </b-field>
      <b-field>
        <b-autocomplete
          rounded
          v-model="queryCountry"
          :data="filteredCountries"
          :placeholder="placeholderCountries"
          :open-on-focus="true"
          :loading="fetchingCountries"
          :disabled="!selectedRegion"
          :icon="selectedRegion ? 'search' : 'times'"
          field="name"
          @select="option => selectCountry(option)"
        >
          <template slot="empty">{{$t('admin.initiatives.create.fields.location.noResults')}}</template>
          <template slot-scope="props">{{ props.option.name }}</template>
        </b-autocomplete>
      </b-field>
      <b-field>
        <b-autocomplete
          rounded
          v-model="queryCity"
          :data="dataCities"
          :placeholder="placeholderCities"
          :loading="fetchingCities"
          @typing="getCityAsync"
          :disabled="!selectedCountry"
          :icon="selectedCountry ? 'search' : 'times'"
          field="name"
          @select="option => selectCity(option)"
        >
          <template slot="empty">{{$t('admin.initiatives.create.fields.location.noResults')}}</template>
          <template slot="footer"></template>
          <template slot-scope="props">{{ props.option.name }}</template>
        </b-autocomplete>
      </b-field>
    </b-field>
  </section>
</template>

<script>
import { debounce } from "lodash";
export default {
  data() {
    return {
      queryRegion: "",
      queryCountry: "",
      queryCity: "",
      dataRegions: [],
      dataCountries: [],
      dataCities: [],
      fetchingRegions: true,
      fetchingCountries: false,
      fetchingCities: false,
      selectedRegion: null,
      selectedCountry: null,
      selectedCity: null,
      notInACity: false
    };
  },
  created() {
    this.fetchRegions();
  },
  methods: {
    fetchRegions() {
      this.$http
        .get("/v1/regions?size=100")
        .then(res => {
          this.dataRegions = res.data.data;
        })
        .finally(() => {
          this.fetchingRegions = false;
        });
    },
    selectRegion(selectedRegion) {
      if(selectedRegion === null) return
      this.fetchingCountries = true;
      this.selectedRegion = selectedRegion;
      this.queryCountry = "";
      this.queryCity = "";
      this.selectedCountry = null;
      this.selectedCity = null;
      this.$http
        .get(`/v1/countries?size=100&region_id=${selectedRegion.id}`)
        .then(res => {
          this.dataCountries = res.data.data;
        })
        .finally(() => {
          this.fetchingCountries = false;
        });
    },
    selectCountry(selectedCountry) {
      if (selectedCountry == null) return;
      this.selectedCountry = selectedCountry;
      this.queryCity = "";
      this.selectedCity = null;
    },
    getCityAsync: debounce(function(name) {
      if (!name.length) {
        this.dataCities = [];
        return;
      }
      this.fetchingCities = true;
      this.$http
        .get(
          `/v1/registered-cities?size=100&country_id=${this.selectedCountry.id}&s=${name}`
        )
        .then(res => {
          this.dataCities = res.data.data;
        })
        .finally(() => {
          this.fetchingCities = false;
        });
    }, 500),
    selectCity(selectedCity) {
      if (selectedCity === null) return;
      this.selectedCity = selectedCity;
      this.$emit("save", this.selectedCity);
    },
    // confirmLocation: function() {
    //   this.resetState();
    // },
    resetState: function() {
      this.queryRegion = "";
      this.queryCountry = "";
      this.queryCity = "";
      this.dataRegions = [];
      this.dataCountries = [];
      this.dataCities = [];
      this.fetchingRegions = true;
      this.fetchingCountries = false;
      this.fetchingCities = false;
      this.selectedRegion = null;
      this.selectedCountry = null;
      this.selectedCity = null;
      this.notInACity = false;
      this.fetchRegions();
    }
  },
  computed: {
    placeholderRegions() {
      return this.fetchingRegions
        ? this.$t("admin.initiatives.create.fields.location.fetchingRegions")
        : this.$t("admin.initiatives.create.fields.location.startTypingRegion");
    },
    placeholderCountries() {
      return this.fetchingCountries
        ? this.$t("admin.initiatives.create.fields.location.fetchingCountries")
        : this.$t(
            "admin.initiatives.create.fields.location.startTypingCountry"
          );
    },
    placeholderCities() {
      return this.fetchingCities
        ? this.$t("admin.initiatives.create.fields.location.fetchingCities")
        : this.$t("admin.initiatives.create.fields.location.startTypingCity");
    },
    filteredRegions() {
      return this.dataRegions.filter(
        option =>
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.queryRegion.toLowerCase()) >= 0
      );
    },
    filteredCountries() {
      return this.dataCountries.filter(
        option =>
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.queryCountry.toLowerCase()) >= 0
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>