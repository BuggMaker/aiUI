<template>
    <div slot="body" class="notify-config box-horizon full">
        <div style="position:relative;width:300px;margin-right:10px;">
            <app-goods-class v-model="goodsClass"></app-goods-class>            
        </div>
        <div class="box1 hidden">
            <div class="box-vertical full">
                <v-toolbar>
                    <v-search placeholder="商品名称" v-model="queryStr" @query="getGoodsRemindList"></v-search>
                    <v-button class="float-right" name="submit" text='保存设置' @click="submit"></v-button>
                </v-toolbar>
                <div class="box1">
                    <v-panel :loading='loading'>
                            <table>                           
                               <tr class="header">
                                <th>商品名称</th>
                                <th>过期提醒(天)</th>
                                <th>库存提醒(件)</th>
                               </tr>
                            <tr v-for="(good,k) in goodsList" :key="k" :class="'tr-'+ k%2">
                                <td>{{good.name}}</td>
                                <td>
                                    <v-number v-model="good.remindDay"></v-number>
                                </td>
                                 <td>
                                    <v-number v-model="good.remindNum"></v-number>
                                </td>
                            </tr>
                        </table>
                        <v-page :source="pageSource" slot="foot"></v-page>
                       </v-panel>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      goodsClass: {},
      goodsList: [],
      queryStr: "",
      pageSource: {
        total: 0,
        page: 1,
        pages: 1,
        size: 10,
        handlePageChange: this.pageChange
      },
      loading: true
    };
  },
  methods: {
    pageChange(index, size) {
      this.pageSource.page = index;
      this.pageSource.size = size;
      this.getGoodsRemindList();
    },
    getGoodsRemindList() {
      var self = this;
      self.myHttp(
        self.myRequest.getGoodsRemindConfigList({
          goodsClassId: self.goodsClass.id,
          page: {
            pageIndex: self.pageSource.page,
            pageSize: self.pageSource.size
          },
          keys: self.queryStr
        }),
        {
          beforeRequest: () => {
            self.loading = true;
          },
          afterRequest: () => {
            self.loading = false;
          },
          successed: res => {
            self.goodsList = res.data.list;
            self.pageSource.total = res.data.dataCount;
          },
          failed: err => {}
        }
      );
    },
    submit() {
      var self = this;
      self.myHttp(self.myRequest.saveGoodsRemindConfig(self.goodsList), {
        successed: res => {
          self.message.success("保存成功!");
        },
        failed: err => {
          self.message.error(err.data);
        }
      });
    }
  },
  watch: {
    goodsClass(nval) {
      this.getGoodsRemindList();
    }
  }
};
</script>

<style>

</style>
