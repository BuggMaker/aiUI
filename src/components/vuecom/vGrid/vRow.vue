<template>
  <div class="v-row" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    gutter: { type: Number, default: 0 },
    justify: String,
    align: String
  },
  computed: {
    style() {
      var dis = this.gutter / 2;
      return `margin-left:${-dis}px;margin-right:${-dis}px`;
    }
  },
  mounted() {
    this.updateColGutter();
  },
  methods: {
    updateColGutter() {
      if (this.$el) {
        var dis = this.gutter / 2;
        Array.prototype.forEach.call(this.$el.children, child => {
          child.style = `padding-left:${dis}px;padding-right:${dis}px`;
        });
      }
    }
  },
  watch: {
    gutter(val) {
      this.updateColGutter();
    }
  }
};
</script>

<style>
.v-row {
  position: relative;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  padding: 5px;
  margin-top: 5px;
}
</style>
