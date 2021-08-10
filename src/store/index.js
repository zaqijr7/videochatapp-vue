import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    call: { isReceivedCall: true, name: "Benjamin" },
    callAccepted: false,
    callEnded: false,
    name: "",
  },
  mutations: {
    setName(state, payload) {
      state.name = payload;
    },
  },
  actions: {
    answerCall() {
      console.log("Hello");
    },
    callUser(context, id) {
      console.log("Calling " + id);
    },
    leaveCall() {
      console.log("Leave Call");
    },
  },
});
