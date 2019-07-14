<template>
  <section>
    <h1 class="title is-3">Edit initiative</h1>
    <p>Edit the initiative as an admin.</p>
    <br />
    <b-tabs type="is-toggle" v-model="activeTab" expanded class="is-marginless">
      <b-tab-item label="Information" icon="scroll" icon-pack="fas"></b-tab-item>
      <b-tab-item label="Location" icon="map-marker-alt" icon-pack="fas"></b-tab-item>
      <b-tab-item label="Owner" icon="user" icon-pack="fas"></b-tab-item>
    </b-tabs>
    <div class="card">
      <div class="card-content">
        <DataForm ref="data" v-show="activeTab == 0" @update="submit" mode="edit" :model.sync="model" />
        <LocationForm ref="location" v-show="activeTab ==  1" @update="submit" mode="edit" :model.sync="model" />
        <OwnerForm ref="location" v-show="activeTab ==  2" :model.sync="model" />
      </div>
    </div>
  </section>
</template>

<script>
import DataForm from "@/components/utils/initiatives/DataForm.vue";
import LocationForm from "@/components/utils/initiatives/LocationForm.vue";
import OwnerForm from "@/components/utils/initiatives/OwnerForm.vue";
import merge from 'lodash/merge'
import omit from 'lodash/omit'

export default {
  props: ['id'],
  components: {
    DataForm,
    LocationForm,
    OwnerForm
  },
  data() {
    return {
      activeTab: 0,
      model: {
        name: null,
        description: null,
        public_data: {
          goals: null,
          founding_year: null,
          website: null,
          facebook: null,
          twitter: null,
          other_network: null,
          role_of_youth: null
        },
        private_data: {
          contact_email: null,
          contact_phone: null
        },
        selectedRegion: null,
        selectedCountry: null,
        selectedCity: null
      }
    };
  },
  beforeMount: function(){
    this.startLoading()
    this.$http.get(`/v1/initiatives/${this.id}`)
    .then(res => {
      console.log(res.data.data)
      this.model = merge(this.model, res.data.data)
    }).catch(err => {
      console.error(err)
      this.$toast.open(err.response.data.message);
    }).finally( () => {
      this.stopLoading()
    })
  },
  methods: {
    getPayload() {
      const data = {};
      const options = {};
      data.name = this.model.name;
      data.description = this.model.description;
      (data.public_data = {
        goals: this.model.public_data.goals,
        founding_year: this.model.public_data.founding_year,
        role_of_youth: this.model.public_data.role_of_youth,
        website: this.isOptional(this.model.public_data.website),
        facebook: this.isOptional(this.model.public_data.facebook),
        twitter: this.isOptional(this.model.public_data.twitter),
        other_network: this.isOptional(this.model.public_data.other_network)
      }),
        (data.private_data = {
          contact_email: this.model.private_data.contact_email,
          contact_phone: this.isOptional(this.model.private_data.contact_phone)
        });
      if (this.model.selectedCity) {
        options.registered_city_id = this.model.selectedCity.id;
      } else {
        options.registered_city_id = null;
      }
      // If user is admin, tell the api to not set the current user (admin) as the owner
      options.set_owner = false;
      return {
        data,
        options
      };
    },
    submit() {
      Promise.all([this.$refs.data.validate()]).then(values => {
        if (
          values.some(x => {
            return x == false;
          })
        ) {
          this.$toast.open({
            message: this.$t("globals.errors.formNotValid"),
            type: "is-warning",
            position: "is-bottom"
          });
          return;
        }
        this.startLoading();
        this.$http
          .post("/v1/initiatives", this.getPayload())
          .then(res => {
            this.$toast.open({
              message: `<i class="fas fa-check"></i>&nbsp;New initiative has been created`,
              type: "is-success"
            });
            this.$router.push({name: "adminInitiativesList"});
          })
          .catch(err => {
            console.error(err);
            if (err.response && err.response.data)
              this.$toast.open(err.response.data.message);
          })
          .finally(() => {
            this.stopLoading();
          });
      }).catch(err => {
        this.$toast.open(err.response.data.message);
      });
    }
  }
};
</script>

<style>
</style>
