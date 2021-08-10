<template>
  <div class="container">
    <div class="card mx-auto" style="max-width: 540px;">
      <div class="card-body">
        <div
          class="d-flex flex-row bd-highlight mb-3 align-items-center justify-content-center"
        >
          <div class="bd-highlight me-4">
            <div class="d-flex flex-column bd-highlight align-items-start">
              <div class="p-2 bd-highlight">Account Info</div>
              <div class="p-2 bd-highlight">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  v-model="userToCall"
                  @change="setName()"
                />
              </div>
              <div class="p-2 bd-highlight">
                <button class="btn btn-primary" @click="copyIdToClipboard()">
                  <div class="d-flex flex-row bd-highlight">
                    <div class="me-2 bd-highlight">
                      <i class="bi bi-clipboard"></i>
                    </div>
                    <div class="bd-highlight">Copy your ID</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="bd-highlight">
            <div class="d-flex flex-column bd-highlight align-items-start">
              <div class="p-2 bd-highlight">Make a Call</div>
              <div class="p-2 bd-highlight">
                <input
                  type="text"
                  class="form-control"
                  placeholder="ID to Call"
                  v-model="idToCall"
                />
              </div>
              <div class="p-2 bd-highlight">
                <button
                  v-if="callAccepted && !callEnded"
                  class="btn btn-primary"
                  @click="endCall()"
                >
                  <div class="d-flex flex-row bd-highlight">
                    <div class="me-2 bd-highlight">
                      <i class="bi bi-telephone"></i>
                    </div>
                    <div class="bd-highlight">Hang Up</div>
                  </div>
                </button>

                <button v-else class="btn btn-primary" @click="callUser()">
                  <div class="d-flex flex-row bd-highlight">
                    <div class="me-2 bd-highlight">
                      <i class="bi bi-telephone"></i>
                    </div>
                    <div class="bd-highlight">Call</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idToCall: null,
      userToCall: null,
    };
  },
  name: "Options",
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
  },
  methods: {
    async copyIdToClipboard() {
      if (this.idToCall === null || this.idToCall === "") return;
      await navigator.clipboard.writeText(this.idToCall);
      alert("ID Copied to Clipboard !");
    },
    setName() {
      console.log(this.userToCall);
      this.$store.commit("setName", this.userToCall);
    },
    callUser() {
      if (this.idToCall === null || this.idToCall === "") return;
      console.log(this.idToCall);
      this.$store.dispatch("callUser", this.idToCall);
    },
    endCall() {
      this.$store.dispatch("leaveCall");
    },
  },
};
</script>

<style></style>
