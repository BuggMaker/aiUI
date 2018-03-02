<template>
  <transition name='fade-down'>
      <div class="vtree-node" :class="{'v-tree-node-padding-left':node.levelNum>1}">
        <span class="vtree-node-arrow" v-if="node.items&&node.items.length>0" @click.stop="expendNode">
          <v-icon :name="node.expended?'down':'right'" v-bind:scale='0.4'></v-icon>
        </span>
        <span v-if="!onlytitle" :class="{'disabled':node.disabled}">
          <span v-if="showCheckbox" class="vtree-node-check" @click="checkNode">
            <v-icon v-if="node.checkType!=2" :name="node.check?'checked':'square'" :scale='0.4'></v-icon>
            <v-icon v-else name='minus' :scale='0.4'></v-icon>
          </span>
          <span v-if='!editable&&!node.editable' class="vtree-node-title" 
            :class="node.select?'vtree-node-title-active':''" 
            @click="selectNode">{{node.name}}</span>
          <span v-else>
            <v-text v-model='node.name' :autofocus="true"></v-text>
            <span class='btn cancel' @click="cancelNodeEdit">取消</span>
            <span class='btn submit' @click="submitNodeEdit">确定</span>
          </span>
          <span class="vtree-node-option" v-show="node.select">
            <span class='btn edit' @click="nodeEdit">编辑</span>
            <span class='btn edit' @click="nodeAdd">添加</span>
          </span>
        </span>
        <span v-else :class="{'disabled':node.disabled}">
          <span class="vtree-node-title" 
            :class="node.select?'vtree-node-title-active':''" 
            @click="selectNode">{{node.name}}</span>
        </span>
        <div v-show="node.expended&&node.items.length>0">
            <v-tree-node v-for="(childNode,k) in node.items" 
                :key="k"
                :node="childNode"
                :onlytitle='onlytitle'
                :multiple='multiple'  
                :showCheckbox = 'showCheckbox'             
                @checkChange="childCheckChange"
                @selectChange="childSelectChange"></v-tree-node>
        </div>
      </div>
  </transition>
</template>

<script>
//  :checkState="picks[childNode.id + '_' + childNode.typeNum]"
export default {
  name: "v-tree-node",
  props: {
    node: Object,
    onlytitle:Boolean,
    multiple: { type: Boolean, default: false },
    // //是否显示复选框
    showCheckbox: { type: Boolean, default: false },
    checkState: 0 //0,全部未选中;2,部分选中;1,全部选中;
  },
  data() {
    return {
      // //是否展开
      // expended
      // //是否禁止操作节点
      // disabled
      // //是否被勾选
      // check
      // //是否选中节点
      // select
      //checkType: 0, //0,全部未选中;2,部分选中;1,全部选中;
      editable: false
    };
  },
  mounted() {
    // this.dataChange();
  },
  methods: {
    //展开几点点击事件
    expendNode() {
      // this.expended = !this.expended;
      this.$set(this.node, "expended", !this.node.expended);
    },
    selectNode() {
      if (!this.showCheckbox) {
        this.$set(this.node, "select", !this.node.select);
        this.$emit("selectChange", this.node);
      } else {
        this.checkNode();
      }
    },
    //子节点 选中状态变化
    childSelectChange(childNode) {
      this.$emit("selectChange", childNode);
    },
    //CheckBox点击事件
    checkNode() {
      if (this.node.disabled) return;
      //多选
      if (!this.node.checkType || this.checkType == 0 || this.checkType == 2)
        this.$set(this.node, "checkType", 1);
      else this.$set(this.node, "checkType", 0);
      this.$set(this.node, "check", !this.node.check);
      this.$emit("checkChange", this.node);
    },
    //子节点 勾选状态变化
    childCheckChange(childNode) {
      // this.myUtils.SetNodes(this, this.node, childNode, "check", false);
      // this.myUtils.SetNodes(this, this.node, childNode, "checkType", 0);
      this.node.items.forEach(cnode => {
        if (cnode.id !== childNode.id || cnode.name != childNode.name) {
          this.$set(cnode, "check", false);
          this.$set(cnode, "checkType", 0);
        }
      }, this);
      this.confirmCheckType();
      this.$emit("checkChange", this.node);
    },
    //确认 本节点选中状态
    confirmCheckType() {
      var checkNum = 0,
        unCheckNum = 0;

      this.node.items.forEach(function(childNode) {
        if (!childNode.checkType || childNode.checkType == 0) unCheckNum++;
        else checkNum++;
      }, this);

      if (checkNum == this.node.items.length) {
        this.$set(this.node, "check", false);
        this.$set(this.node, "checkType", 0);
        // this.checkType = 0;
      } else if (unCheckNum == this.node.items.length) {
        this.$set(this.node, "check", true);
        this.$set(this.node, "checkType", 1);
        // this.checkType = 1;
      } else {
        // this.checkType = 2;
        this.$set(this.node, "checkType", 2);
      }
    },
    //节点编辑
    nodeEdit() {
      this.editable = true;
    },
    nodeAdd() {
      this.node.items.splice(0, 0, {
        id: 0,
        name: "新节点",
        levelNum: this.node.levelNum + 1,
        editable: true
      });
      this.node.expended = true;
    },
    cancelNodeEdit() {
      this.editable = false;
      this.node.editable = false;
      this.node.parent.items.splice(0,1);
    },
    submitNodeEdit() {
      this.editable = false;
      this.node.editable = false;
      this.message.success("保存成功!");
    }
  }
};
</script>

<style>
.vtree-node {
  /* padding-left: 23px; */
  /* display: inline-block; */
  line-height: 32px;
  font-size: 15px;
}
.v-tree-node-padding-left {
  padding-left: 35px;
}
.vtree-node-arrow,
.vtree-node-check {
  display: inline-block;
  width: 18px;
  cursor: pointer;
}
.vtree-node-title {
  vertical-align: middle;
  padding: 0 5px 0 5px;
  margin-left: 5px;
  cursor: pointer;
}
.vtree-node-title-active {
  background-color: rgb(30, 170, 180);
  color: white;
  border-radius: 3px;
}

.vtree-node-title:hover {
  background-color: rgba(30, 170, 180, 0.5);
  color: white;
  border-radius: 3px;
}

.vtree-node-option {
  float: right;
}
.vtree-node-minus {
  color: rgb(30, 170, 180);
  font-size: 18px;
}
</style>
