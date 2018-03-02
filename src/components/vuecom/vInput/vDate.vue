<template>
  <span class="vdate">
      <input type="date" style='width:100%;' v-model="dateValue"/>
  </span>
</template>

<script>
export default {
  props: {
    value: ""
  },
  data() {
    return {
      dateValue: ""
    };
  },
  watch: {
    value(nval) {
      this.dateValue = nval;
    },
    dateValue(nval) {
      this.$emit("input", nval);
    }
  }
};
</script>

<style>
.vdate {
  display: inline-block;
  font-size: 22px;
  border: 1px solid lightgray;
}
</style>
