<template>
  <section>
     <h1
      class="title is-3 has-text-black"
    >{{$t('admin.initiatives.create.fields.location.title')}}</h1>
    <div class="notification is-link" v-if="model.selectedCity == null">
      <p>{{$t('admin.initiatives.create.fields.location.notificationNoCity')}}</p>
    </div>
    <div class="notification is-success" v-else>
      <p v-html="$t('admin.initiatives.create.fields.location.theLocation',{region: getSpaceLocalization(model.selectedRegion), country: getSpaceLocalization(model.selectedCountry), city: getSpaceLocalization(model.selectedCity)})"></p>
    </div>

    <div class="field">
      <div class="control">
        <label class="label">{{$t('admin.initiatives.create.fields.location.searchTitle')}}</label>

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
      </div>
    </div>
    <div class="field animated fadeIn" v-if="selectedRegion">
      <div class="control">
        <b-autocomplete
          rounded
          v-model="queryCountry"
          :data="filteredCountries"
          :placeholder="placeholderCountries"
          :open-on-focus="true"
          :loading="fetchingCountries"
          icon="search"
          field="name"
          @select="option => selectCountry(option)"
        >
          <template slot="empty">{{$t('admin.initiatives.create.fields.location.noResults')}}</template>
          <template slot-scope="props">{{ props.option.name }}</template>
        </b-autocomplete>
      </div>
    </div>
    <div class="field animated fadeIn" v-if="selectedCountry && !notInACity">
      <div class="control">
        <b-autocomplete
          rounded
          v-model="queryCity"
          :data="dataCities"
          :placeholder="placeholderCities"
          :loading="fetchingCities"
          @typing="getCityAsync"
          icon="search"
          field="name"
          @select="option => selectCity(option)"
        >
          <template slot="empty">{{$t('admin.initiatives.create.fields.location.noResults')}}</template>
          <template slot="footer">
          </template>
          <template slot-scope="props">{{ props.option.name }}</template>
        </b-autocomplete>
      </div>
    </div>
    <div class="notification is-dark animated fadeIn" v-if="notInACity">
      <span @click="isLocatedInACity" class="delete"></span>
      <i class="fas fa-info"></i>
      &nbsp;&nbsp; {{$t('admin.initiatives.create.fields.location.notificationNoCity')}}
    </div>
    <br>
    <div v-if="selectedCity"> 
      <div class="field">
          <label class="label">{{$t('admin.initiatives.create.fields.location.confirm.title')}}</label>
        <div class="control">
          <p v-html="$t('admin.initiatives.create.fields.location.confirm.question',{region: getSpaceLocalization(selectedRegion), country: getSpaceLocalization(selectedCountry), city: getSpaceLocalization(selectedCity)})"></p>
        </div>
      </div>
      <div class="field">
        <div class="control">
            <div class="buttons">
          <button class="button is-primary" @click="confirmLocation">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mode == 'edit'">
      <hr>
      <div class="field">
        <div class="control">
          <div class="buttons is-right">
            <button @click="$emit('update')" class="button is-primary">
              <i class="fas fa-save"></i>&nbsp;Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    mode: {
      type: String
    }
  },
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
    },
    confirmLocation: function(){
      this.model.selectedRegion = this.selectedRegion;
      this.model.selectedCountry = this.selectedCountry;
      this.model.selectedCity = this.selectedCity;
      this.resetState()
    },
    resetState: function(){
      this.queryRegion = ""
      this.queryCountry = ""
      this.queryCity = ""
      this.dataRegions = []
      this.dataCountries = []
      this.dataCities = []
      this.fetchingRegions = true
      this.fetchingCountries = false
      this.fetchingCities = false
      this.selectedRegion = null
      this.selectedCountry = null
      this.selectedCity = null
      this.notInACity = false
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
        : this.$t("admin.initiatives.create.fields.location.startTypingCountry");
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

<style>
</style>
