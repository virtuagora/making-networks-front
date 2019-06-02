<template>
  <div class>
    <div class="has-text-centered animated zoomOutUp delay-1s slower">
      <i class="fas fa-paper-plane fa-3x has-text-primary"></i>
    </div>
    <br>
    <br>
    <div class="content">
      <h5
        class="subtitle is-5 has-text-centered is-italic is-marginless"
      >{{$t('forms.user.addInitiative.sending.text[0]')}}</h5>
      <p class="has-text-centered is-italic">{{$t('forms.user.addInitiative.sending.text[1]')}}</p>
      <p class="has-text-centered" v-if="isLoading">
        <i class="fas fa-sync fa-spin fa-lg"></i>
      </p>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.submit();
    }, 2500);
  },
  methods: {
    getPayload: function() {
      const data = {};
      const options = {};
      data.name = this.model.name;
      data.description = this.model.description;
      (data.public_data = {
        goals: this.model.public_data.goals,
        founding_year: this.model.public_data.founding_year,
        role_of_youth: this.model.public_data.role_of_youth
      }),
        (data.private_data = {
          contact_email: this.model.private_data.contact_email
        });
      if (this.model.selectedCity) {
        options.registered_city_id = this.model.selectedCity.id;
      } else {
        options.registered_city_id = null;
      }
      options.set_owner = true;
      return {
        data,
        options
      };
    },
    submit: function() {
      this.isLoading = true;
      this.$http
        .post("/v1/initiatives", this.getPayload())
        .then(res => {
          this.$emit("forward");
        })
        .catch(err => {
          console.error(err);
          if (err.response && err.response.data)
            this.$toast.open(err.response.data.message);
          this.$emit("goTo", -1);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
