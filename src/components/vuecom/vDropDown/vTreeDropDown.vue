<template>
    <v-drop-down>
        <span slot="head">{{selected.name}}</span>
        <v-tree-list slot="body" v-bind:nodes="items" v-model="selected"  v-bind:onlytitle="true"></v-tree-list>
    </v-drop-down>
</template>

<script>
import vDropDown from "./vDropDown.vue";
function getNodeById(parentNode, nodeId) {
  var target;
  if (parentNode.id == nodeId) {
    target = parentNode;
  } else {
    for (var i = 0; i < parentNode.items.length; i++) {
      target = getNodeById(parentNode.items[i], nodeId);
      if (target) return target;
    }
  }
  return target;
}
export default {
  components: {
    "v-drop-down": vDropDown
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    items: [Object, Array],
    width: String,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: {}
    };
  },
  watch: {
    value(nval, oval) {
      if (this.items.length) {
        //数组
        for (var i = 0; i < this.items.length; i++) {
          var result = getNodeById(this.items[i], nval);
          if (result) {
            this.selected = result;
            break;
          }
        }
      } else {
        //树形结构
        var result = getNodeById(this.items, nval);
        if (result) {
          this.selected = result;
        }
      }
      //   this.selected = nval;
    },
    selected(val,oval) {
      this.$emit("input", val.id);
    //   val.selected = true;
    //   oval.selected = false;
    },
    items(nval){
        this.selected = getNodeById(this.items,this.value);
    }
  }
};
</script>

<style>

</style>
