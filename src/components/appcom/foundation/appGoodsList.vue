<template>
    <div class="goods-list box-horizon full">
        <div style="position:relative;width:250px;">
            <app-goods-class v-model="selected"></app-goods-class>
        </div>
        <div class="box1 hidden" style="margin-left: 10px;">
            <div class="box-vertical full">
                <v-toolbar>
                    <v-search class="toolbar-item" placeholder="商品名称" v-model="queryStr" v-on:query="getGoodsList"></v-search>
                    <input type="button" class="btn common toolbar-item" value="添加商品" v-on:click="addGood" />
                </v-toolbar>
                <!-- 这里应该是个数据表 datatable 包括商品的基本信息 -->
                <div class="box1">
                    <v-data-table v-bind:loading="tableLoading" v-bind:datasource="datasource" v-bind:columns="columns">  
                        <v-page slot="page" v-bind:source="pageSource"></v-page>
                    </v-data-table>                  
                </div>
            </div>
        </div>        
        <transition name="fade-right">
            <v-detail v-model="editing" v-on:back="cancel" v-bind:title="detailTitle">
              <div slot="body">
                <div class="setting-item">
                  <label class="setting-item-title">商品编号</label>
                  <div class="setting-item-content">
                    <v-text v-model="validGood.code.value" v-validate="validGood.code"></v-text>
                  </div>
                </div>
                 <div class="setting-item">
                  <label class="setting-item-title">商品名称</label>
                  <div class="setting-item-content">
                    <v-text v-model="validGood.name.value" v-validate="validGood.name"></v-text>
                  </div>
                </div>
               
                <!-- <div class="setting-item">
                    <label class="setting-item-title">商品分类</label>
                    <div class="setting-item-content">
                      <v-tree-drop-down class="width-input" v-bind:items="orgTypes" v-model="validGood.classId.value"  v-validate='validGood.orgType'></v-tree-drop-down>
                    </div>
                  </div> -->
                <div class="setting-item">
                    <label class="setting-item-title">商品用途</label>
                    <div class="setting-item-content">
                      <v-combox class="width-input" v-bind:items="goodTypes" v-model="validGood.goodsType.value"  v-validate='validGood.goodsType'></v-combox>
                    </div>
                </div>
                 <div class="setting-item">
                  <label class="setting-item-title">图片地址</label>
                  <div class="setting-item-content">
                    <v-text v-model="validGood.imgUrl.value" v-validate="validGood.imgUrl"></v-text>
                  </div>
                </div>
              </div>              
              <input slot="foot" type="button" class="btn submit" value="保存" v-on:click="submit" />
            </v-detail>
        </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      selected: {},
      tableLoading: true,
      options: [
        {
          name: "编辑",
          class: "edit",
          event: { base: false, fn: this.editGood }
        },
        {
          name: "删除",
          class: "remove",
          event: { base: false, fn: this.deleGood }
        }
      ],
      columns: [
        { key: "goodsId", title: "商品ID" },
        { key: "goodsType", title: "商品类别" },
        { key: "name", title: "商品名称" }
      ],
      datasource: [],
      pageSource: {
        total: 0,
        page: 1,
        pages: 1,
        size: 10,
        handlePageChange: this.pageChange
      },
      queryStr: "",
      editing: false,
      detailTitle: "商品详情",
      validGood: new this.validator({ data: this.getValidator() }),
      goodTypes: []
    };
  },
  mounted() {
    this.getGoodTypes();
  },
  methods: {
    //获取商品用途枚举
    getGoodTypes() {
      var self = this;
      self.myHttp(
        self.myRequest.getEnumsByType(self.myUtils.EnumTypes.GoodType),
        {
          successed: res => {
            self.goodTypes = res.data;
          },
          failed: err => {
            self.message.error(err.data);
          }
        }
      );
    },
    pageChange(index, size) {
      this.pageSource.page = index;
      this.pageSource.size = size;
      this.getGoodsList();
    },
    //根据商品类别和关键字 查询商品列表
    getGoodsList() {
      var self = this;
      self.myHttp(
        self.myRequest.getGoodsList({
          goodsClassId: this.selected.id,
          page: {
            pageIndex: this.pageSource.page,
            pageSize: this.pageSource.size
          },
          keys: this.queryStr
        }),
        {
          beforeRequest: () => {
            self.tableLoading = true;
          },
          successed: res => {
            self.datasource = res.data.list;
            self.pageSource.total = res.data.dataCount;
          },
          afterSuccessed: () => {
            self.tableLoading = false;
          },
          failed: err => {}
        }
      );
    },
    //添加商品
    addGood() {
      //数据验证 恢复初始状态
      this.validGood.restore();
      this.detailTitle = "添加商品";
      this.editing = true;
    },
    //编辑商品
    editGood(row, index) {
      var self = this;
      //请求商品信息
      self.myHttp(self.myRequest.getGoodDetail(row.id), {
        successed: res => {
          //设置数据验证
          self.validGood.set(res.data);
          self.editing = true;
        },
        failed: err => {
          self.message.eror(err.data);
        }
      });
    },
    //删除商品
    deleGood(row, index) {
      var self = this;
      self.modal.warn({
        title: "提醒",
        content: "确定删除该商品?",
        handleOk: () => {
          //删除商品
          self.myHttp(self.myRequest.deleteGood(row.id), {
            successed: res => {
              self.getGoodsList();
              self.message.success("商品删除成功!");
            }
          });
        }
      });
    },
    //取消操作
    cancel() {
      var self = this;
      self.modal.warn({
        title: "提醒",
        content: "确定保存编辑?",
        handleClose: () => {
          self.editing = false;
        },
        handleOk: () => {
          self.submit();
        }
      });
    },
    //上传编辑结果
    submit() {
      var self = this,
        submitData;
      if (self.validGood.check()) {
        submitData = self.validGood.get();
      }
      if (!submitData) {
        this.message.warn("请检查编辑后再保存!");
        return;
      }
      self.modal.info({
        title: "提醒",
        content: "确定保存编辑?",
        handleOk: () => {
          var loadInstance = this.modal.loading({ content: "信息保存中..." });
          self.myHttp(self.myRequest.saveEmployee(submitData), {
            successed: res => {
              if (res.data) {
                loadInstance.modal.close();
                self.getGoodsList();
                self.message.success("保存成功!");
              }
            },
            failed: err => {
              loadInstance.modal.close();
              self.message.error("保存失败,请重试!");
            }
          });
        }
      });
    },
    //数据验证
    getValidator() {
      return {
        goodsId: {
          value: 0
        },
        code: {
          value: "",
          rules: {
            required: true,
            length: 15
          }
        },
        name: {
          value: "",
          rules: {
            required: true,
            maxlength: 20
          }
        },
        imgUrl: {
          value: ""
        },
        classId: {
          value: 0,
          data: {
            key: "class",
            value: {
              id: 0,
              name: ""
            }
          },
          rules: {
            selected: true
          }
        },
        goodsType: {
          value: 0,
          rules: {
            selected: true
          }
        }
      };
    },
    //处理数据验证状态变更
    handleChange(key, val) {
      this.validGood.change(key, val);
    }
  },
  watch: {
    selected(nval, oval) {
      this.getGoodsList();
    }
  }
};
</script>

<style>
.goods-list {
}
</style>
