<template>
  <div id="app">
    <Navbar />
    <Options><Notification /></Options>
  </div>
</template>

<script>
import Notification from "./components/Notification.vue";
import Options from "./components/Options.vue";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Notification,
    Options,
    Navbar,
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
