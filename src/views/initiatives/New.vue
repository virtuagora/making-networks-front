<template>
  <section>
    <div id="hero" class="hero is-dark is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="section">
            <div class="columns is-centered">
              <div class="column is-8">
                <div class="the-head">
                  <h1 class="title is-1 is-size-3-touch has-text-centered has-text-primary">
    <router-link :to="{name: 'home'}"><img src="/iso-cn.svg" class="image logo" alt=""></router-link>
                    {{$t('forms.user.addInitiative.title')}}
                  </h1>
                </div>
                <transition name="component-fade" mode="out-in">
                  <component v-bind:is="`Step${step}`" v-if="step >= 0 && step <= 7 " @forward="forward" @backward="backward" @goTo="goTo" :model.sync="model"></component>
                  <Sending v-else-if="step == 8" @forward="forward" @backward="backward" @goTo="goTo" :model.sync="model"></Sending>
                  <Confirmation v-else-if="step == 9" @forward="forward" @backward="backward" @goTo="goTo" :model.sync="model"></Confirmation>
                  <Fail v-else-if="step == -1" @goTo="goTo"></Fail>
                </transition>
              </div>
            </div>
          </div>
          <br>
        </div>
      </div>
      <vue-particles color="FFFFFF" :hoverEffect="false" shapeType="circle" :clickEffect="false"></vue-particles>
    </div>
  </section>
</template>

<script>
import Step0 from './steps/Step0.vue';
import Step1 from './steps/Step1.vue';
import Step2 from './steps/Step2.vue';
import Step3 from './steps/Step3.vue';
import Step4 from './steps/Step4.vue';
import Step5 from './steps/Step5.vue';
import Step6 from './steps/Step6.vue';
import Step7 from './steps/Step7.vue';
import Sending from './steps/Sending.vue';
import Confirmation from './steps/Confirmation.vue';
import Fail from './steps/Fail.vue';

export default {
  data() {
    return {
      step: 0,
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
          role_of_youth: null,
        },
        private_data: {
          contact_email: null,
          contact_phone: null,
        },
        selectedRegion: null,
        selectedCountry: null,
        selectedCity: null,
      },
    };
  },
  components: {
    Step0,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Sending,
    Confirmation,
    Fail,
  },
  methods: {
    backward() {
      if (this.step <= 0) {
        this.step = 0;
        return;
      }
      this.step -= 1;
    },
    forward() {
      if (this.step >= 9) {
        this.step = 9;
        return;
      }
      this.step += 1;
    },
    goTo(step) {
      this.step = step;
    },
  },
};
</script>

<style lang="scss" scoped>
#hero {
  position: relative;
  overflow: hidden;
  .hero-body {
    padding-top: 0;
    padding-bottom: 0;
    align-items: baseline;
    z-index: 10;
    .container {
      background-color: rgba(17, 23, 34, 0.9);
      min-height: 100%;
    }
    .the-head {
          margin-bottom: 20px;
      @include from($tablet) {
          margin-bottom: 50px;
      }

    }
    // border-bottom: 1px solid rgba(255, 255, 255, 0.397);
  }
}

#particles-js {
  // background-size: cover;
  position: fixed;

  // top: 0;
  // left: 0;
  width: 100vw;
  height: 100vh;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.logo{
  width: 30px;
  margin: 0 auto 10px;
  @include from($desktop){
    margin: 0;
  display: inline;
  vertical-align: sub;
  }
}
</style>
