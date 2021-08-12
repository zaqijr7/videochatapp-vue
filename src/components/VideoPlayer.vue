<template>
  <div class="container">
    <div class="card text-center mx-auto mb-2" style="max-width: 540px;">
      <div class="card-body">
        <div class="d-flex flex-column bd-highlight mb-3">
          <div v-if="stream" class="bd-highlight mb-2">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title">{{ "User 1" }}</h5>
                <p class="card-text">
                  <video
                    playsInline
                    muted
                    :ref="this.$store.state.myVideo"
                    autoPlay
                  />
                </p>
              </div>
            </div>
          </div>
          <div v-if="callAccepted && !callEnded" class="bd-highlight">
            <div class="card text-center">
              <div class="card-body">
                <h5 class="card-title">{{ "User 2" }}</h5>
                <p class="card-text">
                  <video
                    playsInline
                    muted
                    :ref="this.$store.state.userVideo"
                    autoPlay
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  computed: {
    name() {
      return this.$store.state.name;
    },
    callAccepted() {
      return this.$store.state.callAccepted;
    },
    callEnded() {
      return this.$store.state.callEnded;
    },
    myVideo() {
      return this.$store.state.myVideo;
    },
    userVideo() {
      return this.$store.state.userVideo;
    },
    stream() {
      return this.$store.state.stream;
    },
    call() {
      return this.$store.state.call;
    },
  },

  mounted() {
    console.log(this.myVideo);
    console.log(this.userVideo);
  },
};
</script>

<style>
video {
  width: "550px";
}
</style>
