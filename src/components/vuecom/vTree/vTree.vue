<template>
  <div class="vtree">
    <div v-if="nodes instanceof Array">
      <v-tree-node
      v-for="(node,k) in nodes" 
      :key="k" 
      :node='node'
      :onlytitle='onlytitle'
      :multiple='multiple'
      :showCheckbox = 'showCheckbox'   
      @checkChange='childCheckChange'
      @selectChange='childSelectChange'></v-tree-node>
    </div>      
    <v-tree-node v-else
      :node="nodes"
      :onlytitle='onlytitle'
      :multiple='multiple'
      :showCheckbox = 'showCheckbox'   
      @checkChange='childCheckChange'
      @selectChange='childSelectChange'></v-tree-node>
  </div>
</template>

<script>
let checkedNodes = [],
  selectedNodes = [];
import vtreenode from "./vTreeNode.vue";
export default {
  components: {
    "v-tree-node": vtreenode
  },
  props: {
    nodes: [Array, Object],
    onlytitle:Boolean,
    multiple: { type: Boolean, default: false },
    showCheckbox: { type: Boolean, default: false }
  },
  mounted() {
    console.log(this.nodes);
  },
  data() {
    return {
      checkType: 0,
      title: "tree title"
    };
  },
  methods: {
    //子节点 选中状态变化;遍历节点,确定被选中节点
    childCheckChange(childNode) {
      checkedNodes = [];
      if (!this.multiple) {
        // checkedNodes.push(childNode);
        //this.myUtils.SetNodes(this,this.nodes, childNode, "check", false);
        // this.myUtils.SetNodes(this,this.nodes, childNode, "checkType", 0);
       }// else {
        this.myUtils.GetNodes(checkedNodes,this.nodes, "check");
      // }
      this.$emit("checkChange", checkedNodes);
    },
    //子节点选中状态变更
    childSelectChange(childNode) {
      selectedNodes = [];
      // //单选时
      if (!this.multiple) {
        selectedNodes.push(childNode);
        this.myUtils.SetNodes(this,this.nodes, childNode, "select", false);
      } else {
        this.myUtils.GetNodes(selectedNodes,this.nodes, "select");
      }
      this.$emit("selectChange", selectedNodes);
    },
    //获取选中节点
    getNodes(resultAry,nodes, name, val = true) {
      if (nodes instanceof Array) {
        nodes.forEach(childNode => {
          if (childNode[name] == val) {
            resultAry.push(childNode);
          }
          this.getNodes(resultAry,childNode.items, name, val);
        }, this);
      } else {
        if (nodes[name] == val) {
          resultAry.push(nodes);
        }
        this.getNodes(resultAry,nodes.items, name, val);
      }
    },
    setNodes(parentNode, exceptNode, name, val) {
      if (parentNode instanceof Array) {
        parentNode.forEach(function(childNode) {
          if (
            exceptNode.id != childNode.id ||
            exceptNode.name != childNode.name
          ) {
            this.$set(childNode, name, val);
          }
          if (childNode.items) {
            this.setNodes(childNode.items, exceptNode, name, val);
          }
        }, this);
      } else {
        if (
          exceptNode.id != parentNode.id ||
          exceptNode.name != parentNode.name
        ) {
          this.$set(parentNode, name, val);
        }
        if (parentNode.items) {
          this.setNodes(parentNode.items, exceptNode, name, val);
        }
      }
    }
  },
  watch: {
    nodes(nval, oval) {
      console.log(this.nodes);
    }
  }
};
</script>

<style>
.vtree {
  border: 1px solid lightgray;
}
</style>
