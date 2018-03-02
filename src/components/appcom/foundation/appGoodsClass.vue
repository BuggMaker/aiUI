<template>
    <div class="box-vertical full">       
            <v-tree-list 
            :nodes="goodsClasses" 
            :editable="true" 
            title="商品类别" 
            @remove="removeNode" 
            @save="saveNode" 
            :loading='loading'>
            <input slot='option' type="button" class="btn ok toolbar-item" value="添加一级分类" v-on:click="addRootNode"/>
            </v-tree-list>
    </div>
</template>

<script>
export default {
  data() {
    return {
      goodsClasses: [],
      options1: [
        { name: "添加", css: "add", event: { base: true, fn: this.orgAdd } },
        { name: "编辑", css: "edit", event: { base: true, fn: this.orgEdit } },
        { name: "删除", css: "delete", event: { base: true, fn: this.orgDel } }
      ],
      options2: [
        { name: "编辑", css: "edit", event: { base: true, fn: this.orgEdit } },
        { name: "删除", css: "delete", event: { base: true, fn: this.orgDel } }
      ],
      loading: true,
      rootEditing: false
    };
  },
  mounted() {
    //获取商品列表
    this.getGoodsClasses();
  },
  methods: {
    getGoodsClasses() {
      var self = this;
      this.myHttp(this.myRequest.getAllGoodsClass(), {
        beforeRequest: () => {
          self.loading = true;
        },
        afterSuccessed: () => {
          self.loading = false;
        },
        successed: res => {
          self.goodsClasses = self.myunity.AddPropsToTree(
            res.data,
            self.addProp
          );
        },
        failed: err => {
          console.log(err);
        }
      });
    },
    //根据不同层级 添加不同操作属性
    addProp(node) {
      switch (node.levelNum) {
        case 1:
        case 2:
          node.options = this.options1;
          break;
        case 3:
          node.options = this.options2;
          break;
      }
      node.selected = false;
      if (node.items) {
        node.items.forEach(function(subNode) {
          this.addProp(subNode);
        }, this);
      }
    },
    saveNode(node) {
      //弹窗提示 确定后保存 并重新加载(get)树结构
      var self = this;
      self.myHttp(
        self.myRequest.saveGoodsClass({
          id: node.id,
          name: node.name,
          parentId: node.parent.id || 0,
          grade: node.parent.typeNum + 1 || 1
        }),
        {
          successed: res => {
            if (res.data) {
              self.message.success("保存成功!");
              //重新加载
              self.getGoodsClasses();
            } else {
              self.message.error("保存失败!");
            }
          }
        }
      );
    },
    //添加一级节点
    addRootNode() {
      if (!this.rootEditing) {
        this.rootEditing = true;
        this.goodsClasses.splice(0, 0, {
          id: 0,
          levelNum: 1,
          name: "",
          items: [],
          editing: true
        });
      } else {
        this.rootEditing = false;
        this.goodsClasses.splice(0, 1);
      }
    },
    removeNode(node) {
      //弹窗提示 确定后删除
      var self = this;
      self.modal.warn({
        content: "确认删除改节点?",
        handleOk: () => {
          self.myHttp(self.myRequest.deletaGoodsClassById(node.id), {
            successed: res => {
              if (res.data) {
                self.message.success("删除成功!");
                //重新加载
                self.getGoodsClasses();
              } else {
                self.message.error("删除失败!");
              }
            }
          });
        }
      });
    }
  }
};
</script>

<style>

</style>
