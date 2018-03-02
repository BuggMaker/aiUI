<template>
    <v-drop-down v-bind:readonly="readonly">
        <span v-if="multiple" slot="head">
            <v-item v-for="(item,k) in selectedItems" v-bind:key="k" v-bind:value="item" v-on:close="removeItem(item)"></v-item>
        </span>
        <label v-else slot="head">{{selectedItems?selectedItems.name:'请选择'}}</label>
        <div slot="body">
            <v-tree
            :nodes='nodes'
            :onlytitle='true'
            :multiple='multiple'            
            @selectChange='handleSelectChange'></v-tree>
        </div>
    </v-drop-down>
</template>

<script>
import vdropdown from "./vDropDown.vue";
import vitem from "./vItem.vue";
export default {
  components: {
    "v-drop-down": vdropdown,
    "v-item": vitem
  },
  props: {
    //双向绑定
    value: [Array, Object],
    //集合
    nodes: [Array, Object],
    //是否多选
    multiple: {
      type: Boolean,
      default: true
    },
    //只读
    readonly: {
      type: Boolean,
      default: false
    },
    selected: Object
  },
  data() {
    return {
      //选中元素id集合
      selectedItems: this.selected
    };
  },
  methods: {
    removeItem(item) {
      this.$set(item, "select", false);
      var index = this.selectedItems.indexOf(item);
      this.selectedItems.splice(index, 1);
    },
    handleSelectChange(nodes) {
      if (this.multiple) this.selectedItems = nodes.slice();
      else {
        if (nodes.length >= 1) this.selectedItems = nodes[0];
      }
    }
  },
  watch: {
    // value(nval, oval) {
    //   this.selectedItems = nval;
    // },
    selectedItems(nval, oval) {
      if (this.multiple && this.selectedItems) {
        var ary = [];
        this.selectedItems.forEach(item => {
          ary.push(item.id);
        });
        this.$emit("input", ary);
      } else {
        this.$emit("input", nval.id);
      }
    },
    nodes(nval) {
      var self = this;
      if (this.multiple) {
        var ary = [];
        this.selectedItems.forEach(item => {
          var node = self.myUtils.GetNode(self.nodes, item.id, item.name);
          if (node) {
            self.$set(node, "select", true);
            ary.push(node);
          }
        });
        if (ary.length > 0) this.selectedItems = ary.slice();
      } else {
        if (this.selectedItems.id && this.selectedItems.name) {
          var node = self.myUtils.GetNode(
            self.nodes,
            this.selectedItems.id,
            this.selectedItems.name
          );
          if (node) {
            self.$set(node, "select", true);
            this.selectedItems = node;
          }
        }
      }
    }
  }
};
</script>

<style>
.v-drop-down-tree-item {
  padding: 0px 10px;
  overflow: hidden;
}

.v-drop-down-tree-item:hover,
.v-drop-down-tree-item-state.selected:hover {
  background-color: rgb(30, 170, 180);
  color: white;
}

.v-drop-down-tree-item-state {
  color: rgb(250, 250, 250);
  float: right;
}

.v-drop-down-tree-item-state.selected {
  color: green;
}
</style>
