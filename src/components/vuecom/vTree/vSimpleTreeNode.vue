<template>
    <div name="vsimpletreenode" v-if="node">
        <div class="vsimpletreenode" v-on:click="select" @mouseenter="showOption" @mouseleave="hideOption">
            <table style="width:100%;" class="tree-table">
                <tr v-bind:class="node.selected?'node-selected-'+node.levelNum:''" class="tr" >
                    <td v-bind:style="{'padding-left':padding+'px'}">
                        <span v-if="node.items&&node.items.length>0" class="vsimpletreenode-expand" v-on:click.stop="expand">
                            <span v-show="!expanded" title="展开">☞</span>
                            <span v-show="expanded" title="折叠">☟</span>
                        </span>
                        <div v-else class="vsimpletreenode-expand-hide"></div>
                        <span v-if="!editing&&!node.editing">{{node.name}}</span>
                        <input v-else class="text" v-bind:class="{edit:editing||node.editing}" style="width:50%" type="text" v-model="node.name" v-bind:readonly="!editing&&!node.editing" v-bind:autofocus="editing||node.editing" placeholder='输入节点名称' @:keydown.enter='save'/>
                        <span v-show="editing||node.editing" class="vsimpletreenode-option btn submit" title="保存" v-on:click.stop="save">保存</span>
                        <span v-show="editing||node.editing" class="vsimpletreenode-option btn cancel" title="取消" v-on:click.stop="cancel">取消</span>
                    </td>
                    <td v-show="editable" class="description">
                        <label>{{node.extendField?node.extendField:''}}</label>
                    </td>
                    <td v-show="editable" class="option">
                       <span v-show='showOptions'>
                          <span v-for="(op,k) in node.options" v-bind:key="k" class="vsimpletreenode-option btn" v-bind:class="op.css" v-bind:title="op.name" v-on:click.stop="opClick(op)">{{op.name}}</span>
                       </span>
                    </td>
                </tr>
            </table>
        </div>
        <div v-show="expanded">
            <v-simple-tree-node v-for="(childnode,k) in node.items" v-bind:key="k" v-bind:parent="node" v-bind:node="childnode" v-bind:editable="editable" v-on:select="select" v-on:edit="edit" v-on:add="add" v-on:save="save" v-on:remove="remove" v-bind:editType="editType"></v-simple-tree-node>
        </div>
    </div>
</template>

<script>
export default {
  name: "v-simple-tree-node",
  props: {
    parent: [Array, Object],
    node: Object, //本节点 包括id/name/levaelNum/items
    //是否可编辑
    editable: Boolean,
    // //间隔
    // padding: {
    //     type: Number,
    //     default: 0
    // },
    //详情编辑方式:0 详情页; 1 直接编辑
    editType: {
      type: Number,
      default: 0
    },
    //支持增删改
    options: {
      type: Array,
      default: () => {
        return [{}];
      }
    }
  },
  data: function() {
    return {
      expanded: true,
      editing: false,
      showOptions: false
    };
  },
  mounted() {
    if (this.node) this.$set(this.node, "parent", this.parent);
  },
  computed: {
    style: function() {
      var val = 200 + this.padding;
      if (val >= 255) val = 255;

      return { "background-color": `rgba(${val},${val},${val},0.5)` };
    },
    padding: function() {
      return (this.node.levelNum - 1) * 30;
    }
  },
  methods: {
    expand() {
      if (this.node.items && this.node.items.length > 0) {
        this.expanded = !this.expanded;
      } else {
        // 根绝具体需要绑定不同操作
        this.$emit("click", this.node);
      }
    },
    select(val) {
      if (val && val.name) this.$emit("select", val);
      else this.$emit("select", this.node);
    },
    edit: function(val) {
      if (!this.editType) {
        this.editing = !this.editing;
        this.node.editing = this.editing;
      } else {
        if (val && val.name) this.$emit("edit", val);
        else this.$emit("edit", this.node);
      }
    },
    add: function(val) {
      if (!this.editType) {
        if (!this.node.items) this.$set(this.node, "items", []);
        this.node.items.splice(0, 0, {
          id: 0,
          name: "",
          editing: true,
          levelNum: this.node.levelNum + 1
        });
      } else {
        if (val && val.name) this.$emit("add", val);
        else this.$emit("add", this.node);
      }
    },
    remove: function(val) {
      if (val && val.name) {
        this.$emit("delete", val);
        this.$emit("remove", val);
      } else {
        this.$emit("delete", this.node);
        this.$emit("remove", this.node);
      }
    },
    save: function(val) {
      //post数据到服务器
      if (val && val.name) {
        this.$emit("save", val);
      } else {
        this.editing = false;
        this.node.editing = false;
        this.$emit("save", this.node);
      }
    },
    cancel() {
      this.editing = false;
      this.node.editing = false;
      if (this.node.id <= 0 || !this.node.name) {
        if (this.parent instanceof Array) {
          this.parent.splice(0, 1);
        } else {
          this.parent.items.splice(0, 1);
        }
      }
    },
    opClick(op) {
      if (op.event) {
        if (op.event.fn) op.event.fn(this.node);
        if (op.event.base) {
          switch (op.css) {
            case "edit":
              this.edit();
              break;
            case "add":
              this.add();
              break;
            case "delete":
            case "remove":
              this.remove();
              break;
          }
        }
      }
    },
    showOption() {
      this.showOptions = true;
    },
    hideOption() {
      this.showOptions = false;
    }
  },
  watch: {
    node(val) {
      this.$set(this.node, "parent", this.parent);
    }
  }
};
</script>
<style>
.vsimpletreenode {
  color: black;
  user-select: none;
}

.vsimpletreenode:hover {
  /* background-color: rgb(250, 250, 250); */
  /* border-bottom: 1px dashed rgba(200, 200, 200); */

  border: none;
  background-color: rgba(207, 245, 238, 0.3);
}

.node-selected-1,
.node-selected-2,
.node-selected-3,
.node-selected-4 {
  /* background-color: rgb(230, 230, 230); */
  border: none;
  /* color: rgb(34, 190, 190); */
  /* box-shadow: 0 0 5px rgb(34, 178, 178) inset; */
  font-weight: 600;
  background-color: rgba(207, 245, 238, 0.2);
}

.vsimpletreenode-expand {
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
}

.vsimpletreenode-expand-hide {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-top: -6px;
}

.vsimpletreenode-option {
  font-size: 14px;
}

.vsimpletreenode-option:hover {
  opacity: 1;
}

.tree-table {
  border-collapse: collapse;
}

.tr {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.25);
}

.name {
  padding-left: 10px;
  min-width: 200px;
}

.option,
.description {
  width: 350px;
  padding: 0 30px 0 50px;
  text-align: right;
}
</style>
