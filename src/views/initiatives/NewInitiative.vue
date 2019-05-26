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
                    <i class="fas fa-map-marker"></i>&nbsp;Add your initiative
                  </h1>
                  <!-- <h1 class="subtitle is-4 is-size-5-touch has-text-centered">
                    OMG! A new initiative? That's awesome!
                    <i class="far fa-grin"></i>
                  </h1> -->
                </div>
                <transition name="component-fade" mode="out-in">
                  <component v-bind:is="`Step${step}`" @forward="forward" @backward="backward" :model.sync="model"></component>
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
import Step0 from "./steps/Step0.vue";
import Step1 from "./steps/Step1.vue";
import Step2 from "./steps/Step2.vue";
import Step3 from "./steps/Step3.vue";
import Step4 from "./steps/Step4.vue";

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
          role_of_youth: []
        },
        private_data: {
          contact_email: null
        }
      }
    };
  },
  components: {
    Step0,
    Step1,
    Step2,
    Step3,
    Step4
  },
  methods: {
    backward: function() {
      if (this.step <= 0) {
        this.step = 0;
        return;
      }
      this.step -= 1;
    },
    forward: function() {
      if (this.step >= 5) {
        this.step = 5;
        return;
      }
      this.step += 1;
    }
  }
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
</style>

