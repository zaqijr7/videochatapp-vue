import Vue from "vue";
import Vuex from "vuex";
import { io } from "socket.io-client";
import Peer from "simple-peer";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    call: { isReceivedCall: true, name: "Benjamin" },
    callAccepted: true,
    callEnded: false,
    name: "",
    me: "",
    id: null,
    stream: null,
    myVideo: null,
    userVideo: null,
    connectionRef: null,
    socket: io(),
  },
  mutations: {
    setName(state, payload) {
      state.name = payload;
    },
    setCall(state, payload) {
      state.call = payload;
    },
    setCallAccepted(state, payload) {
      state.callAccepted = payload;
    },
    setCallEnded(state, payload) {
      state.callEnded = payload;
    },
    setMe(state, payload) {
      state.me = payload;
    },
    setStream(state, payload) {
      state.stream = payload;
    },
    setMyVideo(state, payload) {
      state.myVideo = payload;
    },
    setUserVideo(state, payload) {
      state.userVideo = payload;
    },
    setConnectionRef(state, payload) {
      state.connectionRef = payload;
    },
    setId(state, payload) {
      state.id = payload;
    },
    setSocket(state, payload) {
      state.socket = payload;
    },
  },
  actions: {
    answerCall(context) {
      context.commit("setCallAccepted", true);

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: this.state.stream,
      });

      peer.on("signal", (data) => {
        this.state.socket.emit("answercall", {
          signal: data,
          to: this.state.call.from,
        });
      });

      peer.on("stream", (currentStream) => {
        this.state.userVideo = currentStream;
        context.commit("setUserVideo", currentStream);
      });

      peer.signal(this.state.call.signal);

      context.commit("setConnectionRef", peer);
    },
    callUser(context) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: this.state.stream,
      });

      peer.on("signal", (data) => {
        this.state.socket.emit("calluser", {
          userToCall: this.state.id,
          signalData: data,
          from: this.state.me,
          name: this.state.name,
        });
      });

      peer.on("stream", (currentStream) => {
        context.commit("setUserVideo", currentStream);
      });

      this.state.socket.on("callaccepted", (signal) => {
        context.commit("setCallAccepted", true);

        peer.signal(signal);
      });

      context.commit("setConnectionRef", peer);
    },
    leaveCall(context) {
      context.commit("setCallEnded", true);
      context.commit("setConnectionRef", null);

      window.location.reload();
    },
  },
});
