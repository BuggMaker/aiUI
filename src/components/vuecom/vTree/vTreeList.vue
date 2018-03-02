<template>
    <div class="full" v-bind:value="value">
        <transition name="fade-left">
            <div v-show="!showInfo||!editType" class="vtreelist box-vertical full">
                <table v-if="title" class="header">
                    <tr class="head tr">
                        <td class="name">
                            {{title}}
                            <slot name="head"></slot>
                        </td>
                        <td v-if="!onlytitle" class="vtreelist-option">描述</td>
                        <td v-if="!onlytitle" class="vtreelist-option"><slot name='option'></slot></td>
                    </tr>
                </table>
                <div class="box1 scroll" v-if="nodes instanceof Array">
                    <v-simple-tree-node v-for="(node,k) in nodes" 
                    :key="k" 
                    :node="node" 
                    :editable="!onlytitle" 
                    @select='select' 
                    @add="add" 
                    @edit="edit" 
                    @save="save" 
                    @remove="remove" 
                    :editType="editType" 
                    :parent='nodes'>
                    </v-simple-tree-node>
                </div>
                <div class="box1 scroll" v-else>
                    <v-simple-tree-node v-bind:node="nodes" v-bind:editable="!onlytitle" v-on:select='select' v-on:add="add" v-on:edit="edit" v-on:save="save" v-on:remove="remove" v-bind:editType="editType">
                    </v-simple-tree-node>
                </div>
            </div>
        </transition>
        <transition name="fade-right">
            <div v-if="showInfo&&editType" class="full">
                <v-detail v-bind:title="'机构部门--'+value.name" v-on:back="back">
                    <div slot="head">
                        <slot name="detail-head"></slot>
                    </div>
                    <div slot="body" class="full">
                        <slot name="detail-body"></slot>
                    </div>
                    <div slot="foot">
                        <slot name="detail-foot"></slot>
                    </div>
                </v-detail>
            </div>
        </transition>
        <slot></slot>
        <v-modal v-model="loading" :source="modalsource"></v-modal>
    </div>
</template>
<script>
import vstn from "./vSimpleTreeNode.vue";
import vdetail from "../vDetail.vue";
export default {
  components: {
    "v-simple-tree-node": vstn,
    "v-detail": vdetail
  },
  props: {
    //选中节点 双向绑定
    value: Object,
    //树节点
    nodes: [Object, Array],
    //只显示标题 不显示描述和操作
    onlytitle: Boolean,
    // //是否可编辑
    // editable: Boolean,
    //标题
    title: String,
    //编辑类型
    editType: {
      //0直接修改  1详情修改
      type: Number,
      default: 0
    },
    //可被选择的层级
    levelLimit: {
      type: Number,
      default: 0
    },
    loading: Boolean,
    backinfo: String
  },
  data() {
    return {
      showInfo: false,
      selected: {},
      modalsource: {
        loading: true
      }
    };
  },
  mounted() {
    // this.selected = this.value;
  },
  methods: {
    //详情页 添加
    add(val) {
      // this.showInfo = true;
      this.selected = val;
    },
    //详情页 编辑
    edit(val) {
      // this.showInfo = true;
      this.selected = val;
    },
    //删除节点
    //需要发送post请求
    remove(node) {
      this.$emit("remove", node);
      this.$emit("delete", node);
    },
    //详情页 返回
    back() {
      var self = this;
      if (this.backinfo) {
        self.modal.warn({
          content: self.backinfo,
          handleOk: () => {
            self.showInfo = false;
            self.$emit("back");
          }
        });
      } else {
        self.showInfo = false;
        self.$emit("back");
      }
    },
    //选择节点
    select(val) {
      if (val.levelNum > this.levelLimit) {
        this.selected = val;
        this.$emit("input", val);
      }
    },
    //保存新加的节点
    //需要发送post请求
    save(node) {
      this.$emit("save", node);
    }
  },
  watch: {
    value(nval, oval) {
      if (oval) {
        oval.selected = false;
        if (oval.parent) oval.parent.selected = false;
      }
      nval.selected = true;
      if (nval.parent) nval.parent.selected = true;
    }
  }
};
</script>

<style>
.vtreelist {
  /* margin: 10px; */
  overflow: hidden;
  border: 1px solid lightgray;
  background-color: white;
}

.vtreelist-option {
  width: 350px;
  padding: 0 40px 0 50px;
  text-align: right;
}
</style>
