<template>
  <span :class="'vbutton '+ btnName"
        :style="readonly||disabled?'cursor: pointer;pointer-events: none;':''"
        @click='btnClick'>
      <v-icon v-if="showIcon" class="vbutton-icon" :name="name" :zoom="0.5"></v-icon>
      <span class="vbutton-btn">{{btnText}}</span>
  </span>
</template>

<script>
export default {
  props: {
    name: [String, Array],
    text: [String, Array],
    showIcon:Boolean,
    readonly: Boolean,
    disabled: Boolean
  },
  data() {
    return { clickNum: 0 };
  },
  computed: {
    btnName() {
      if (this.name instanceof Array) {
        var index = this.clickNum % this.name.length;
        return this.name[index];
      } else {
        return this.name;
      }
    },
    btnText() {
      if (this.text instanceof Array) {
        var index = this.clickNum % this.text.length;
        return this.text[index];
      } else {
        return this.text;
      }
    }
  },
  methods: {
    btnClick(e) {
      this.clickNum++;
      this.$emit("click", e);
    }
  }
};
</script>

<style>
.vbutton {
  display: inline-block;
  vertical-align: middle;
  /* border: 1px solid;   */
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 5px;
  /* margin: 3px; */
  font-size: 15px;
  line-height: 20px;
}
.vbutton-icon {
  transform: translateY(-3px);
}
.vbutton-btn {
  display: inline-block;
  vertical-align: middle;
  margin: -2px 0 0 -2px;
}
.vbutton.disabled,
.vbutton.readonly {
  cursor: pointer;
  pointer-events: none;
}
</style>
