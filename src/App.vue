<template>
  <div id="app">
    <Navbar />
    <VideoPlayer />
    <Options><Notification /></Options>
  </div>
</template>

<script>
import Notification from "./components/Notification.vue";
import Options from "./components/Options.vue";
import Navbar from "./components/Navbar.vue";
import VideoPlayer from "./components/VideoPlayer.vue";
import { io } from "socket.io-client";

export default {
  name: "App",
  components: {
    Notification,
    Options,
    Navbar,
    VideoPlayer,
  },
  mounted() {
    this.$store.commit(
      "setSocket",
      io("https://video-chat-nvn.herokuapp.com/")
    );

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        this.$store.commit("setStream", currentStream);
        this.$store.commit("setMyVideo", currentStream);
      });

    this.socket.on("me", (id) => this.$store.commit("setMe", id));

    this.socket.on("calluser", ({ from, name: callerName, signal }) => {
      this.$store.commit("setCall", {
        isReceivedCall: true,
        from,
        name: callerName,
        signal,
      });
    });
  },
  computed: {
    socket() {
      return this.$store.state.socket;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
