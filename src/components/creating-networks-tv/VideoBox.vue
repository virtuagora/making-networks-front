<template>
  <div class="column is-6-mobile is-3-desktop">
    <router-link :to="{name: 'viewCreatingNetworksTv', params: {id: video.id}}" class="has-text-white">
      <div class="thumbnail-container">
        <span
          v-if="!fetching"
          class="tag is-black"
        >{{ISO8601toDuration(responseData.items[0].contentDetails.duration)}}</span>
        <span v-else class="tag is-black">
          <i class="fas fa-spinner fa-spin"></i>
        </span>
        <img
          :src="`https://img.youtube.com/vi/${video.public_data.youtube}/maxresdefault.jpg`"
          class="image is-16x9"
          alt
        />
      </div>
      <br />
      <p v-if="!fetching" class="is-size-7">
        <i class="fas fa-eye"></i>
        &nbsp;{{responseData.items[0].statistics.viewCount}}
        <i class="fas fa-thumbs-up fa-fw"></i>
        {{responseData.items[0].statistics.likeCount}}
      </p>
      <p class="is-size-7" v-else>
        <i class="fas fa-spinner fa-spin"></i> Loading...
      </p>
      <p class="has-text-primary">{{video.title}}</p>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["video"],
  data() {
    return {
      fetching: true,
      responseData: null
    };
  },
  mounted: function() {
    this.fetch();
  },
  methods: {
    fetch: function() {
      let axiosInstance = axios.create();
      axiosInstance({
        url: `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&key=${process.env.VUE_APP_YOUTUBE_API_KEY}&id=${this.video.public_data.youtube}`,
        method: "get"
      })
        .then(res => {
          console.log(res.data);
          this.fetching = false;
          this.responseData = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    formatTimeUnit: function(input, unit) {
      var index = input.indexOf(unit);
      var output = "00";
      if (index < 0) {
        return output; // unit isn't in the input
      }

      if (isNaN(input.charAt(index - 2))) {
        return "0" + input.charAt(index - 1);
      } else {
        return input.charAt(index - 2) + input.charAt(index - 1);
      }
    },
    ISO8601toDuration: function(input) {
      var H = this.formatTimeUnit(input, "H");
      var M = this.formatTimeUnit(input, "M");
      var S = this.formatTimeUnit(input, "S");

      if (H == "00") {
        H = "";
      } else {
        H += ":";
      }

      return H + M + ":" + S;
    }
  }
};
</script>

<style lang="scss" scoped>
.thumbnail-container {
  position: relative;
  .tag {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 100;
  }
}
</style>