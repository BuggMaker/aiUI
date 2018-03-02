<template>
  <span class="v-number-wrapper" :value='value'>
    <input class="v-number" type="number" v-model="num" :readonly="readonly" :disabled='disabled' :min="minNum" :max='maxNum' :step='stepNum' />
  </span>
</template>

<script>
export default {
  props: {
    value: null,
    max: Number,
    min: Number,
    step: Number,
    readonly: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      num: 0,
      minNum: this.min || 0,
      maxNum: this.max || 10000,
      stepNum: this.step || 1
    };
  },
  mounted() {
    this.num = this.value || 0;
  },
  watch: {
    value(nval) {
      if (nval > this.maxNum) {
        nval = this.maxNum;
      } else if (nval < this.minNum) {
        nval = this.minNum;
      }
      this.num = nval;
    },
    num(nval) {
      this.$emit("input", nval);
    }
  }
};
</script>

<style>
.v-number-wrapper {
  display: inline-flex;
  /* border-radius: 5px; */
  overflow: hidden;
  width: 100%;
}

.v-number {
  display: inline-block;
  width: 100%;
  border: 1px solid lightgray;
  /* border-radius: 5px; */
  padding: 5px 10px;
  background-color: transparent;
  font-size: 16px;
}

.v-number:hover {
  border: 1px solid dodgerblue;
}

.v-number:focus {
  box-shadow: 0 0 5px dodgerblue;
}

.v-number:read-only {
  cursor: not-allowed;
  color: gray;
}

.v-number:disabled {
  cursor: not-allowed;
}
</style>