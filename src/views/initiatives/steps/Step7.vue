<template>
  <section>
    <div class="content">
      <p
        class="has-text-centered is-italic"
      v-for="(p,index) in $t('forms.user.addInitiative.step6.conversation')" :key="index">{{p}}</p>
    </div>
      <div class="card">
        <div class="card-content is-clearfix">
          <p class="is-pulled-right">
            <a @click="goTo(1)">
              <i class="fas fa-pencil-alt fa-fw"></i>
            </a>
          </p>
          <h1 class="title is-3 has-text-primary is-marginless">{{model.name}}</h1>
          <h1
            class="subtitle is-6 has-text-dark is-300 is-marginless"
          >{{$t('forms.user.addInitiative.step7.founded',{year: model.public_data.founding_year})}}</h1>
        </div>
      </div>
      <div class="card">
        <div class="card-content is-clearfix">
          <p class="is-pulled-right">
            <a @click="goTo(2)">
              <i class="fas fa-pencil-alt fa-fw"></i>
            </a>
          </p>
          <label for class="label">{{$t('forms.user.addInitiative.step7.labels')['description']}}</label>
          <p class="add-br">{{model.description}}</p>
        </div>
      </div>
      <div class="card">
        <div class="card-content is-clearfix">
          <p class="is-pulled-right">
            <a @click="goTo(3)">
              <i class="fas fa-pencil-alt fa-fw"></i>
            </a>
          </p>
          <label for class="label">
            {{$t('forms.user.addInitiative.step7.labels')['location']}}
          </label>
            <p v-if="model.selectedCity">
              {{model.selectedRegion.name}}, {{model.selectedCountry.name}}, {{model.selectedCity.name}}
            </p>
            <p class="is-italic" v-else>
              <i class="fas fa-info-circle"></i>&nbsp;{{$t('forms.user.addInitiative.step7.noLocation')}}
            </p>
        </div>
      </div>
      <div class="card">
        <div class="card-content is-clearfix">
          <p class="is-pulled-right">
            <a @click="goTo(5)">
              <i class="fas fa-pencil-alt fa-fw"></i>
            </a>
          </p>
          <div class="field">
            <label for class="label">{{$t('forms.user.addInitiative.step7.labels')['goals']}}</label>
            <p class="add-br">{{model.public_data.goals}}</p>
          </div>
          <div class="field">
            <label for class="label">{{$t('forms.user.addInitiative.step7.labels')['roleOfYouth']}}</label>
            <p>{{$t('forms.user.addInitiative.step5.fields[2].options')[model.public_data.role_of_youth]}}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content is-clearfix">
          <p class="is-pulled-right">
            <a @click="goTo(6)">
              <i class="fas fa-pencil-alt fa-fw"></i>
            </a>
          </p>
          <label for class="label">
            {{$t('forms.user.addInitiative.step7.labels')['contact']}}
            <span class="has-text-danger is-400">({{$t('forms.user.addInitiative.step7.labels')['private']}})</span>
          </label>
          <p>{{model.private_data.contact_email}}</p>
        </div>
      </div>
      <br>
      <div class="content">

      <p class="has-text-centered is-italic">{{$t('forms.user.addInitiative.step7.finish')}}</p>
      <div class="buttons is-centered">
        <button class="button is-primary is-outlined is-large is-rounded" @click="$emit('forward')">
          <i class="fas fa-plus"></i>&nbsp;{{$t('forms.user.addInitiative.step7.button')}}
        </button>
      </div>
      </div>
  </section>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goTo(step) {
      this.$emit('goTo', step);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-content {
  color: #161616;
}
</style>
