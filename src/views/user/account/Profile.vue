<template>
  <section>
    <h1 class="title is-3">My profile</h1>
    <p>This is your public profile!</p>
    <br />
    <section>
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left is-hidden-touch">
              <img class="myAvatar image" :src="userAvatarUrl" />
            </div>
            <div class="media-content">
              <img class="myAvatar image is-hidden-desktop is-centered" :src="userAvatarUrl" />
              <br />
              <h1 class="title is-1 has-text-black has-text-centered-touch">Guillermo Croppi</h1>
              <p
                v-for="(p,index) in $t('user.userPanel.profile.avatar')"
                class="is-size-7 has-text-centered-touch is-italic"
                :key="index"
              >{{p}}</p>
            </div>
          </div>

          <div class="field">
            <label for class="label">{{$t('user.userPanel.profile.bio.label')}}</label>
            <div class="control">
              <textarea
                v-model="model.bio"
                class="textarea"
                rows="4"
                v-validate="{required:true, max:750}"
                :data-vv-as="$t('user.userPanel.profile.bio.label')"
                name="goals"
                :placeholder="$t('user.userPanel.profile.bio.placeholder')"
              ></textarea>
              <div class="help is-danger" v-if="errors.has('goals')">{{errors.first('goals')}}</div>
            </div>
          </div>
          <div class="field">
            <label for class="label">{{$t('user.userPanel.profile.networks.label')}}</label>
            <div class="control">
              <div class="field">
                <div class="control">
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static">
                        <i class="fas fa-globe fa-fw"></i>
                      </a>
                    </p>
                    <p class="control">
                      <a class="button is-static">https://</a>
                    </p>
                    <div class="control is-expanded">
                      <input
                        type="text"
                        v-model="model.data.website"
                        class="input has-text-centered"
                        name="website"
                        v-validate="{required: false, min: 5, max:100, url: true }"
                        :data-vv-as="$t('user.userPanel.profile.networks.website')"
                        :placeholder="$t('user.userPanel.profile.optional')"
                      />
                    </div>
                  </div>
                  <div
                    class="help is-danger"
                    v-if="errors.has('website')"
                  >{{errors.first('website')}}</div>
                  <a
                    :href="`https://${model.data.website}`"
                    class="has-text-primary help"
                    v-if="!errors.has('website') && model.website"
                  >{{$t('user.userPanel.profile.networks.test')}}</a>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static">
                        <i class="fab fa-facebook fa-fw"></i>
                      </a>
                    </p>
                    <p class="control">
                      <a class="button is-static">https://facebook.com/</a>
                    </p>
                    <div class="control is-expanded">
                      <input
                        type="text"
                        v-model="model.data.facebook"
                        class="input has-text-centered"
                        name="facebook"
                        v-validate="{required: false, min: 3, max:100 }"
                        :data-vv-as="$t('user.userPanel.profile.networks.facebook')"
                        :placeholder="$t('user.userPanel.profile.optional')"
                      />
                    </div>
                  </div>
                  <div
                    class="help is-danger"
                    v-if="errors.has('facebook')"
                  >{{errors.first('facebook')}}</div>
                  <a
                    :href="`https://facebook.com/${model.data.facebook}`"
                    class="has-text-primary help"
                    v-if="!errors.has('facebook') && model.data.facebook"
                  >{{$t('user.userPanel.profile.networks.test')}}</a>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static">
                        <i class="fab fa-twitter fa-fw"></i>
                      </a>
                    </p>
                    <p class="control">
                      <a class="button is-static">https://twitter.com/</a>
                    </p>
                    <div class="control is-expanded">
                      <input
                        type="text"
                        v-model="model.data.twitter"
                        class="input has-text-centered"
                        name="twitter"
                        v-validate="{required: false, min: 3, max:100 }"
                        :data-vv-as="$t('user.userPanel.profile.networks.twitter')"
                        :placeholder="$t('user.userPanel.profile.optional')"
                      />
                    </div>
                  </div>
                  <div
                    class="help is-danger"
                    v-if="errors.has('twitter')"
                  >{{errors.first('twitter')}}</div>
                  <a
                    :href="`https://twitter.com/${model.data.twitter}`"
                    class="has-text-primary help"
                    v-if="!errors.has('twitter') && model.data.twitter"
                  >{{$t('user.userPanel.profile.networks.test')}}</a>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static">
                        <i class="fas fa-asterisk fa-fw"></i>
                      </a>
                    </p>
                    <p class="control">
                      <a class="button is-static">https://</a>
                    </p>
                    <div class="control is-expanded">
                      <input
                        type="text"
                        v-model="model.data.other_network"
                        class="input has-text-centered"
                        name="other_network"
                        v-validate="{required: false, min: 5, max:100, url: true }"
                        :data-vv-as="$t('user.userPanel.profile.networks.other_network')"
                        :placeholder="$t('user.userPanel.profile.networks.other_network')"
                      />
                    </div>
                  </div>
                  <div
                    class="help is-danger"
                    v-if="errors.has('other_network')"
                  >{{errors.first('other_network')}}</div>
                  <a
                    :href="`https://${model.data.other_network}`"
                    class="has-text-primary help"
                    v-if="!errors.has('other_network') && model.data.other_network"
                  >{{$t('user.userPanel.profile.networks.test')}}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="buttons is-right" v-if="!response.ok">
            <div class="button is-primary" @click="submit">Save</div>
          </div>
           <div class="notification is-success" v-else>
            <i class="fas fa-check"></i>&nbsp; Success!
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      model: {
        bio: null,
        data: {
          website: null,
          twitter: null,
          facebook: null,
          other_network: null
        }
      },
      response: {
        ok: false
      }
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    sync: function(data){
      this.model.bio = data.bio;
      console.log(data.bio)
      Object.keys(data.data).forEach(k => {
        this.model.data[k] = data.data[k]
      })
    },
    fetchUser: function() {
      this.startLoading();
      this.$http
        .get(`/v1/users/${this.user.id}`)
        .then(res => {
          this.sync(res.data)
        })
        .catch(err => {
          console.error(err);
          if (err.response && err.response.data)
            this.$toast.open(err.response.data.message);
        })
        .finally(() => {
          this.stopLoading();
        });
    },
    getPayload: function() {
      let data = {};
      let options = {};
      data.bio = this.model.bio;
      data.data = this.model.data;
      return { data, options };
    },
    // Submit new pending user
    submit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          // Not valid
          this.$toast.open({
            message: this.$t("globals.errors.formNotValid"),
            type: "is-danger"
          });
          return false;
        }
        // is valid, then...
        this.startLoading();
        this.$http
          .patch(`/v1/users/${this.user.id}`, this.getPayload())
          .then(res => {
            this.response.ok = true;
          })
          .catch(err => {
            console.error(err);
            if (err.response && err.response.data)
              this.$toast.open({
                message: this.$t(err.response.data.message),
                type: "is-danger"
              });
          })
          .finally(() => {
            this.stopLoading();
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.myAvatar {
  border-radius: 100px;
  width: 150px;
}
</style>
