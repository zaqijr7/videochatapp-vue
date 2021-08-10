<template>
  <div class="container mb-2">
    <div class="card mx-auto" style="max-width: 540px;">
      <div class="card-body">
        <div
          class="d-flex flex-row bd-highlight mb-3 align-items-center justify-content-center"
        >
          <div v-if="call.isReceivedCall && !callAccepted">
            <div class="d-flex flex-column bd-highlight mb-3">
              <h3>Incoming call from {{ call.name }}</h3>
              <button
                type="button"
                class="btn btn-primary"
                @click="answerCall()"
              >
                Answer Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  computed: {
    call() {
      return this.$store.state.call;
    },
    callAccepted() {
      return this.$store.state.callAccepted;
    },
  },
  methods: {
    answerCall() {
      this.$store.dispatch("answerCall");
    },
  },
};
</script>

<style></style>
