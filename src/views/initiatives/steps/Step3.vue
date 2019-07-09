<template>
  <div>
    <div class="content">
      <p
        class="has-text-centered is-italic"
        v-for="(p,index) in $t('forms.user.addInitiative.step3.conversation')"
        :key="index"
      >{{p}}</p>
    </div>
    <h1 class="subtitle is-5 has-text-centered">
      <span class="is-500 has-text-primary">3.</span>
      &nbsp;{{$t('forms.user.addInitiative.step3.fields[0].question')}}
    </h1>
    <div class="columns is-centered">
      <div class="column is-8">
        <div class="field">
          <div class="control">
            <b-autocomplete
              rounded
              v-model="queryRegion"
              :data="filteredRegions"
              :placeholder="placeholderRegions"
              :open-on-focus="true"
              :loading="fetchingRegions"
              icon="search"
              size="is-medium"
              field="name"
              @select="option => selectRegion(option)"
            >
              <template slot="empty">{{$t('forms.user.addInitiative.step3.noResults')}}</template>
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
              size="is-medium"
              field="name"
              @select="option => selectCountry(option)"
            >
              <template slot="empty">{{$t('forms.user.addInitiative.step3.noResults')}}</template>
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
              size="is-medium"
              field="name"
              @select="option => selectCity(option)"
            >
              <template slot="empty">{{$t('forms.user.addInitiative.step3.noResults')}}</template>
              <template slot="footer">
                <a
                  @click="openModalAddCity"
                  class="has-text-primary"
                >{{$t('forms.user.addInitiative.step3.cantFindCity')}}</a>
              </template>
              <template slot-scope="props">{{ props.option.name }}</template>
            </b-autocomplete>
          </div>
        </div>
        <div class="notification is-dark animated fadeIn" v-if="notInACity">
          <span @click="isLocatedInACity" class="delete"></span>
          <i class="fas fa-info"></i>
          &nbsp;&nbsp; {{$t('forms.user.addInitiative.step3.notificationNoCity')}}
        </div>
      </div>
    </div>
    <br>
    <div class="content">
      <p class="has-text-centered">
        <a @click="$emit('goTo',5)" class="has-text-primary">
          <i class="fas fa-share"></i>
          &nbsp;{{$t('forms.user.addInitiative.step3.skip')}}
        </a>
      </p>
      <p class="has-text-centered">
        <a @click="skip" class="has-text-primary">
          <i class="fas fa-info-circle"></i>
          &nbsp;{{$t('forms.user.addInitiative.step3.cantLocate')}}
        </a>
      </p>
    </div>
    <div class="buttons is-centered">
      <button @click="$emit('backward')" class="button is-rounded is-white is-outlined is-medium">
        <i class="fas fa-arrow-left"></i>
      </button>
      <button @click="goForward" class="button is-rounded is-primary is-outlined is-medium">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import AddCityModal from "@/components/initiatives/new/AddCityModal";
import ModalSkipStep3 from "@/components/initiatives/new/ModalSkipStep3.vue"
import debounce from "lodash/debounce";

export default {
  props: {
    model: {
      type: Object,
      required: true
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
    goForward() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          this.$toast.open({
            message: this.$t("globals.errors.formNotValid"),
            type: "is-warning",
            position: "is-bottom"
          });
          return;
        }
        this.model.selectedRegion = this.selectedRegion;
        this.model.selectedCountry = this.selectedCountry;
        this.model.selectedCity = this.selectedCity;
        this.$emit("forward");
      });
    },
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
    skip() {
      this.$modal.open({
        parent: this,
        component: ModalSkipStep3,
        hasModalCard: true,
        events: {
          continue: () => {
            this.$emit('goTo',5)
          }
        }
      });
    },
    selectCity(selectedCity) {
      if (selectedCity === null) return;
      this.selectedCity = selectedCity;
    },
    notLocatedInACity() {
      this.notInACity = true;
    },
    isLocatedInACity() {
      this.selectedCity = null;
      this.notInACity = false;
    },
    openModalAddCity() {
      this.$modal.open({
        parent: this,
        component: AddCityModal,
        hasModalCard: true
      });
    }
  },
  computed: {
    placeholderRegions() {
      return this.fetchingRegions
        ? this.$t("forms.user.addInitiative.step3.fetchingRegions")
        : this.$t("forms.user.addInitiative.step3.startTypingRegion");
    },
    placeholderCountries() {
      return this.fetchingCountries
        ? this.$t("forms.user.addInitiative.step3.fetchingCountries")
        : this.$t("forms.user.addInitiative.step3.startTypingCountry");
    },
    placeholderCities() {
      return this.fetchingCities
        ? this.$t("forms.user.addInitiative.step3.fetchingCities")
        : this.$t("forms.user.addInitiative.step3.startTypingCity");
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
    },
  }
};
</script>

<style lang="scss">
.autocomplete.control .dropdown-menu {
  position: relative;
}
.map-container {
  position: relative;
  height: 300px;
}
</style>
