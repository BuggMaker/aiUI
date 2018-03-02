<template>
    <span class="v-text-wrapper" :value='value'>
        <input v-if="!txtModel" class="v-text" type="text" v-model="text" :readonly="readonly" :disabled='disabled' :autofocus='autofocus'/>
         <input v-else class="v-text" type="text" v-model="txtModel.name" :disabled="true" />
    </span>
</template>

<script>
export default {
  props: {
    value: null,
    txtModel: Object,
    readonly: Boolean,
    disabled: Boolean,
    autofocus: Boolean
  },
  data() {
    return {
      text: ""
    };
  },
  mounted() {
    this.text = this.value;
  },
  watch: {
    value(nval) {
      this.text = nval;
    },
    text(nval) {
      this.$emit("input", nval);
    }
  }
};
</script>

<style>
.v-text-wrapper {
  display: inline-flex;
  /* border-radius: 5px; */
  overflow: hidden;  
  width:100%;
}

.v-text {
  display: inline-block;
  width: 100%;
  border: 1px solid lightgray;
  /* border-radius: 5px; */
  padding: 5px 10px;
  background-color: transparent;
  font-size: 16px;
}

.v-text:hover {
  border: 1px solid dodgerblue;
}

.v-text:focus {
  box-shadow: 0 0 5px dodgerblue;
}

.v-text:read-only {
  cursor: not-allowed;
  color: gray;
}

.v-text:disabled {
  cursor: not-allowed;
}
</style>