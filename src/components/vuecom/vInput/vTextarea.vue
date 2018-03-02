<template>
    <span class="v-textarea-wrapper">
        <textarea class="v-textarea" v-bind:rows="rows" v-model="textarea" v-bind:readonly="readonly"/>
    </span>
</template>

<script>
export default {
  props: {
    value: String,
    readonly: Boolean,
    rows: Number
  },
  data() {
    return {
      textarea: ""
    };
  },
  watch: {
    value(nval) {
      this.textarea = nval;
    },
    textarea(nval) {
      this.$emit("input", nval);
    }
  }
};
</script>

<style>
.v-textarea-wrapper {
  display: inline-flex;
  /* border-radius: 5px; */
  overflow: hidden;  
  width:100%;
}

.v-textarea {
  display: inline-block;
  width: 100%;
  border: 1px solid lightgray;
  /* border-radius: 5px; */
  padding: 5px 10px;
  background-color: transparent;
  font-size: 16px;
}

.v-textarea:hover {
  border: 1px solid dodgerblue;
}

.v-textarea:focus {
  box-shadow: 0 0 5px dodgerblue;
}

.v-textarea:read-only {
  cursor: not-allowed;
  color: gray;
}

.v-textarea:disabled {
  cursor: not-allowed;
}
</style>