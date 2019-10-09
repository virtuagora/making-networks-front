<template>
  <div class="column is-6-mobile is-3-desktop">
      <router-link
        :to="{name: 'viewCreatingNetworksTv', params: {id: video.id}}"
        class="has-text-white"
      >
        <div class="thumbnail-container">
          <span
            v-if="metadata"
            class="tag is-black"
          >{{ISO8601toDuration(metadata.contentDetails.duration)}}</span>
          <span v-else class="tag is-black">
            <i class="fas fa-spinner fa-spin"></i>
          </span>
          <img
            :src="`https://img.youtube.com/vi/${video.public_data.youtube}/maxresdefault.jpg`"
            class="image"
            alt
          />
        </div>
        <div class="video-card-info">

        <p v-if="metadata" class="is-size-7">
          <i class="fas fa-eye"></i>
          &nbsp;{{nFormatter(metadata.statistics.viewCount)}}
          <i
            class="fas fa-thumbs-up fa-fw"
          ></i>
          {{nFormatter(metadata.statistics.likeCount)}}
        </p>
        <p class="is-size-7" v-else>
          <i class="fas fa-spinner fa-spin"></i> Loading...
        </p>
        </div>
        <p class="has-text-primary is-500">{{video.title}}</p>
      </router-link>
  </div>
</template>

<script>

export default {
  props: ["video", "metadata"],
  data() {
    return {
      // fetching: false,
    };
  },
  mounted: function() {
    console.log(this.metadata)
  },
  methods: {
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
    },
    nFormatter: function (num, digits) {
      var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }
  }
};
</script>

<style lang="scss" scoped>
.video-card-info{
  background-color: rgba(0, 0, 0, 0.473);
  padding: 3px 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-bottom: 3px;
}
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