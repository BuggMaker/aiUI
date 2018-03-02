<template>
  <div class="box-horizon full">
    <div class="box1">
      <div class="box-vertical full">
        <v-toolbar>
          <Row>
            <Col span='20'>
            <v-search class="toolbar-item" placeholder='请输入商品名称' v-model="queryStr" @query="getRemindList"></v-search>
            <v-combox class="toolbar-item" :items="applyTypes" v-model="applyType"></v-combox>
            </Col>
            <Col span='4'>
            <!-- <v-button class="toolbar-item" :name="['ok','remove']" :text="['全部添加','全部取消']" @click="addAllFromTable"></v-button> -->
            <v-button class="toolbar-item" :name="buttonSource.name" :text="buttonSource.title" @click="createApply"></v-button>
            </Col>
          </Row>
        </v-toolbar>
        <div class="box1">
          <!-- 商品提醒列表 -->
          <v-data-table :datasource="datasource3" :columns="columns" :unselectableItems='goodsPicks' :selectable='showApply' keyField='goodsId' @selectChange='goodsSelectChange' @selectAll='goodsSelectAll' :loading='loadingRemindList'>
          </v-data-table>
        </div>
      </div>
    </div>
    <div style="position:relative;width:50%;margin-left:10px;overflow:hidden;">
      <transition name="fade-right">
        <!-- 申请详情 -->
        <v-detail v-model="showApply" @back="handleBack" title="申请记录" :loading='loadingDeatil'>
          <span slot='head' class="float-right">
            <!-- <input type="button" value="添加其他商品" class="btn edit" @click="addOtherGoods" />         -->
            <!-- <v-button name="edit" text="添加其他商品" @click="addOtherGoods" /> -->
            <v-button name="submit" text="提交申请" @click="submitApply" />
          </span>
          <div slot="body">
            <!-- 申请类型 枚举-->
            <div class="setting-item">
              <label class="setting-item-title">申请商品明细</label>
              <div class="setting-item-content">
                <div v-validate='validApply.goodsApplyDetails'>
                  <div class="goods-items" v-for="(g,k) in validApply.goodsApplyDetails.value" :key="k">
                    <v-row>
                      <v-col span='6'>名称</v-col>
                      <v-col span='16'>
                        <b>{{g.goodsName}}</b>
                      </v-col>
                      <v-col span='2'>
                        <v-icon name='close' class="apply-goods-closebtn" :scale='0.5' @click="removeGood(g)"></v-icon>
                      </v-col>
                    </v-row>
                    <v-row v-if="applyType==0">
                      <v-col span='6'>数量</v-col>
                      <v-col span='18'>
                        <v-number v-model="g.applyCount" :min='1' :max='1000'></v-number>
                      </v-col>
                    </v-row>
                    <v-row v-if="applyType==1">
                      <v-col span='6'>批次码</v-col>
                      <v-col span='18'>
                        <v-text v-model="g.batchCode" placeholder="请输入批次码"></v-text>
                      </v-col>
                    </v-row>
                  </div>
                  <input type="button" value="添加商品" class="btn edit" @click="addOtherGoods" />
                </div>
              </div>
            </div>
            <div v-if="applyType == 0" class="setting-item">
              <label class="setting-item-title">是否包含新商品</label>
              <div class="setting-item-content">
                <label><input type="radio" :value="false" v-model="validApply.isContainNew.value" />不含</label>
                <label><input type="radio" :value="true" v-model="validApply.isContainNew.value" /> 含</label>
              </div>
            </div>
            <div class="setting-item">
              <label class="setting-item-title">最晚处理时间</label>
              <div class="setting-item-content">
                <!-- 后续要改成datetimePicker -->
                <!-- <v-text v-model="validApply.statusTime2.value"></v-text> -->
                <DatePicker v-validate='validApply.statusTime2' type='date' v-model="validApply.statusTime2.value" :options='applyDateOptions' format='yyyy/MM/dd'></DatePicker>
              </div>
            </div>
            <div class="setting-item">
              <label class="setting-item-title">补充说明</label>
              <div class="setting-item-content">
                <v-textarea v-model="validApply.applyMsg.value" placeholder='申请说明' v-validate="validApply.applyMsg" class="width-input"></v-textarea>
              </div>
            </div>
          </div>
        </v-detail>
      </transition>
      <transition name="fade-left">
        <div v-if="!showApply" class="box-vertical full">
          <!-- 申请列表 -->
          <v-toolbar>
            <Row>
              <Col :sm='12' :lg="16">
              <v-search style="width:120px" class="toolbar-item" placeholder="申请人" v-model="listQueryStr" @query='getGoodsApplyList'></v-search>
              <v-combox class="toolbar-item" :items="applyTypes" v-model="listApplyType"></v-combox>
              <span class="toolbar-item">处理状态</span>
              </Col>
              <Col :sm='12' :lg="8">
              <DatePicker class="toolbar-item" type='daterange' placement="bottom-end" placeholder='选择查询时间段' v-model="listQueryDate" :options='listDateOptions' format="yyyy/MM/dd" @on-change='getGoodsApplyList'></DatePicker>
              </Col>
            </Row>
          </v-toolbar>
          <div class="box1">
            <v-data-table :loading="loadingApplyList" :datasource="listSource" :columns="listColumns" :options="listOptions">
              <v-page slot="page" :source="listPageSource"></v-page>
            </v-data-table>
          </div>
        </div>
      </transition>
    </div>
    <!-- 弹窗 添加其他商品 -->
    <v-modal v-dom-portal v-model="showModal" :source="modalSource">
      <div slot="body" style="position:relative;width:750px;height:400px;">
        <div class="goods-list box-horizon full">
          <div style="position:relative;width:250px;">
            <app-goods-class v-model="goodsClassSelected"></app-goods-class>
          </div>
          <div class="box1 hidden" style="margin-left: 10px;">
            <div class="box-vertical full">
              <v-toolbar style="margin-top:5px">
                <v-search class="toolbar-item" placeholder="商品名称" v-model="queryStr" v-on:query="getGoodsList"></v-search>
              </v-toolbar>
              <!-- 这里应该是个数据表 datatable 包括商品的基本信息 -->
              <div class="box1">
                <v-panel>
                  <v-data-table slot="body" :datasource="datasource" :columns="columns" :loading='loadingGoods' :selectable='true' :unselectableItems='goodsPicks' keyField='goodsId' @selectAll="addAllToSelect" @selectChange='addRowToSelect'>
                    <v-page slot="page" :source="pageSource"></v-page>
                  </v-data-table>
                  <span slot="foot">
                    <input type="button" class="btn ok" @click="modalSource.handleOk" value="添加" />
                    <input type="button" class="btn common" @click="modalSource.handleCancel" value="完成" />
                  </span>
                </v-panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //申请类型枚举
      applyTypes: [],
      applyType: 0,
      //显示申请详单页
      showApply: false,
      //加载商品提醒
      loadingRemindList: true,
      //商品提醒数据
      datasource3: [],
      //申请详单 数据校验
      validApply: new this.validator({
        data: this.getValidator(),
        handle: this.handleValidChange
      }),
      //显示弹窗
      showModal: false,
      //弹窗 配置
      modalSource: {
        title: "选择需要添加的其他商品",
        autoClose: false,
        handleOk: () => {
          this.modal.info({
            content: "确认添加商品?",
            handleOk: this.addGoodsFromModal
          });
        },
        handleCancel: () => {
          this.modal.info({
            content: "完成添加商品?",
            handleOk: () => {
              this.showModal = false;
            }
          });
        }
      },
      //弹窗中 商品类选中项
      goodsClassSelected: {},
      //商品提醒 筛选条件
      queryStr: "",
      //弹窗 商品数据
      datasource: [],
      //弹窗 分页
      pageSource: {
        total: 0,
        page: 1,
        pages: 1,
        size: 10,
        handlePageChange: this.pageChange
      },
      goodsSelected: [],
      goodsSelected2: [],
      tmpGoodsSelect: {},
      goodsPicks: {},
      //[废除]
      isSelectedAll: false,
      //申请筛选内容
      listQueryStr: "",
      //申请 时间筛选条件
      applyDateOptions: {
        disabledDate(date) {
          return date && date.valueOf() <= Date.now() + 3 * 24 * 3600;
        }
      },
      //申请查询时间段
      listQueryDate: [this.dateOption.setDay(new Date(), -15), new Date()],
      listDateOptions: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      listApplyType: 0,
      //申请 表单配置
      listColumns: [
        {
          key: "applyUserName",
          title: "申请人"
        },
        {
          key: "applyDateStamp",
          title: "申请时间"
        },
        {
          key: "statusTime2Stamp",
          title: "最晚出货时间"
        },
        {
          key: "statusName",
          title: "处理状态"
        }
      ],
      //申请 表单操作项
      listOptions: [
        {
          name: "详情",
          class: "edit",
          event: {
            fn: (row, index) => {
              this.showApply = true;
              //根据申请id 读取信息填充详情表
              this.myHttp(
                this.myRequest.getGoodsApplyDetail(row["goodsApplyId"]),
                {
                  beforeRequest: () => {
                    this.loadingDeatil = true;
                  },
                  afterSuccessed: () => {
                    this.loadingDeatil = false;
                  },
                  successed: res => {
                    this.validApply.goodsApplyDetails.value = res.data;
                  }
                }
              );
            }
          }
        }
      ],
      //申请 table数据
      listSource: [],
      //需要作日期格式装换的列名
      dateCols: ["applyDateStamp", "statusTime2Stamp"],
      //弹窗 分页
      listPageSource: {
        total: 0,
        page: 1,
        pages: 1,
        size: 10,
        handlePageChange: this.listPageChange
      },
      //加载申请列表
      loadingApplyList: false,
      //加载详情页
      loadingDeatil: false,
      loadingGoods: false
    };
  },
  mounted() {
    this.getGoodsApplyType();
    this.getRemindList();
    this.getGoodsApplyList();
  },
  computed: {
    options3() {
      return !this.showModal
        ? [
            {
              name: ["添加申请", "取消申请"],
              class: ["edit", "cancel"],
              event: {
                fn: this.addGoodFromTable
              }
            }
          ]
        : [
            {
              name: ["添加申请", "取消申请"],
              class: ["edit", "cancel"],
              event: {
                fn: this.selectGood
              }
            }
          ];
    },
    columns() {
      return !this.applyType
        ? [
            { key: "goodsName", title: "商品名称" },
            { key: "restNum", title: "剩余件数" }
          ]
        : [
            { key: "goodsName", title: "商品名称" },
            { key: "restNum", title: "剩余天数" },
            { key: "batchCode", title: "批次码" }
          ];
    },
    buttonSource() {
      var obj = { name: "", title: "" };
      if (this.showApply) {
        obj = { name: "remove", title: "取消创建" };
      } else {
        obj = { name: "ok", title: "创建申请" };
      }
      return obj;
    }
  },
  methods: {
    // 获取商品申请类型
    getGoodsApplyType() {
      var self = this;
      self.myHttp(
        self.myRequest.getEnumsByType(self.myUtils.EnumTypes.ApplyType),
        {
          successed: res => {
            self.applyTypes = res.data;
          }
        }
      );
    },
    //获取商品提醒清单
    getRemindList() {
      var self = this;
      self.myHttp(
        self.myRequest.getGoodsRemindList({
          goodsName: self.queryStr,
          type: self.applyType
        }),
        {
          beforeRequest: () => {
            self.loadingRemindList = true;
          },
          afterSuccessed: () => {
            self.loadingRemindList = false;
          },
          successed: res => {
            self.datasource3 = res.data;
          }
        }
      );
    },
    //获取申请列表
    getGoodsApplyList(newDate) {
      var self = this;
      if (newDate) {
        self.listQueryDate = newDate;
      }
      self.myHttp(
        self.myRequest.getGoodsApplyList({
          applyType: self.listApplyType,
          applyDateFrom: self.dateOption.toSeconds(self.listQueryDate[0]),
          applyDateTo: self.dateOption.toSeconds(self.listQueryDate[1]),
          page: {
            pageIndex: self.listPageSource.page,
            pageSize: self.listPageSource.size
          },
          keys: self.listQueryStr
        }),
        {
          beforeRequest: () => {
            self.loadingApplyList = true;
          },
          afterSuccessed: () => {
            self.loadingApplyList = false;
          },
          successed: res => {
            self.listSource = res.data.list;
            self.listPageSource.total = self.listSource.length;
            self.listSource.forEach(row => {
              self.dateCols.forEach(col => {
                row[col] = self.dateOption.toDate(row[col], "yyyy/MM/dd");
              });
            });
          }
        }
      );
    },
    //申请列表 分页
    listPageChange(page, size) {
      this.listPageSource.page = page;
      this.listPageSource.size = size;
      this.getGoodsApplyList();
    },
    createApply() {
      this.goodsSelected = [];
      this.showApply = !this.showApply;
    },
    goodsSelectChange(row, selectedItems) {
      this.goodsSelected = selectedItems;
    },
    goodsSelectAll(selectedItems) {
      this.goodsSelected = selectedItems;
    },
    removeGood(g) {
      var index = this.goodsSelected.indexOf(g);
      this.goodsSelected.splice(index, 1);

      var index = this.goodsSelected2.indexOf(g);
      this.goodsSelected2.splice(index, 1);
    },
    addAllToSelect(items) {
      if (items.length == 0) {
        this.tmpGoodsSelect = {};
      } else {
        items.forEach(g => {
          this.tmpGoodsSelect[g["goodsId"]] = g;
        });
      }
    },
    addRowToSelect(g, items) {
      if (this.tmpGoodsSelect[g["goodsId"]]) {
        delete this.tmpGoodsSelect(g["goodsId"]);
      } else {
        this.tmpGoodsSelect[g["goodsId"]] = g;
      }
    },
    addGoodsFromModal() {
      this.goodsSelected2 = [];
      Object.keys(this.tmpGoodsSelect).forEach(key => {
        this.goodsSelected2.push(this.tmpGoodsSelect[key]);
      });
    },
    handleBack() {
      this.modal.info({
        content: "取消申请处理?",
        handleOk: () => {
          this.showApply = false;
        }
      });
    },
    //弹窗
    addOtherGoods() {
      this.showModal = true;
    },
    //根据商品类别和关键字 查询商品列表
    getGoodsList() {
      var self = this;
      self.myHttp(
        self.myRequest.getGoodsNotInRemindList({
          goodsClassId: this.goodsClassSelected.id,
          page: {
            pageIndex: this.pageSource.page,
            pageSize: this.pageSource.size
          },
          keys: this.queryStr
        }),
        {
          beforeRequest: () => {
            self.loadingGoods = true;
          },
          successed: res => {
            self.datasource = res.data.list;
            self.pageSource.total = res.data.dataCount;
          },
          afterSuccessed: () => {
            self.loadingGoods = false;
          }
        }
      );
    },
    //弹窗 商品分页
    pageChange(page, size) {
      this.pageSource.page = page;
      this.pageSource.size = size;
      this.getGoodsList();
    },
    updateApplyGoods() {
      var ary = [],
        goods = {};
      var g = {
        goodsId: 0,
        batchCode: "000000",
        applyCount: 100
      };
      this.goodsSelected.forEach(good => {
        goods[good.goodsId] = good;
        ary.push(good);
      });
      this.goodsSelected2.forEach(good => {
        if (!goods[good.goodsId]) {
          goods[good.goodsId] = good;
          ary.push(good);
        }
      });
      this.goodsPicks = goods;
      this.validApply.goodsApplyDetails.value = ary;
    },
    //数据校验
    getValidator() {
      return {
        applyType: {
          value: this.applyType
        },
        isContainNew: {
          value: false
        },
        applyMsg: {
          value: "",
          rules: {
            maxlength: 50
          }
        },
        goodsApplyDetails: {
          value: [],
          rules: [
            {
              required: true,
              message: "请添加商品"
            }
          ],
          data: {
            key: "",
            value: ""
          }
        },
        statusTime2: {
          value: Date.now(),
          rules: [
            {
              required: true,
              message: "请选择最晚处理日期"
            }
          ]
        }
      };
    },
    handleValidChange(key, val) {
      this.validApply.change(key, val);
    },
    submitApply() {
      var self = this;
      var submitData = null;

      if (this.validApply.check()) {
        submitData = this.validApply.get();
      }
      if (!submitData) {
        this.message.warn("请完善信息后再保存!");
        return;
      } else {
        var modal = self.modal.info({
          content: "确定提交申请?",
          autoClose: false,
          handleOk: () => {
            self.submit(modal, submitData);
          },
          handleCancel: () => {
            modal.close();
          }
        });
      }
    },
    submit(modal, submitData) {
      var self = this;
      self.myHttp(self.myRequest.saveGoodsApply(submitData), {
        successed: res => {
          self.message.success("申请提交成功!");
          this.getGoodsApplyList();
          this.showApply = false;
        },
        error: res => {
          self.message.warn("申请提交失败!");
        },
        afterRequest: () => {
          modal.close();
          this.showApply = false;
        }
      });
    }
  },
  watch: {
    goodsClassSelected(val) {
      this.getGoodsList();
    },
    applyType(val) {
      this.getRemindList();
      this.validApply = new this.validator({
        data: this.getValidator(),
        handle: this.handleValidChange
      });
      this.goodsSelected = [];
      this.goodsSelected2 = [];
      this.tmpGoodsSelect = {};
      this.goodsPicks = {};
    },
    listApplyType(val) {
      this.getGoodsApplyList();
    },
    goodsSelected() {
      this.updateApplyGoods();
    },
    goodsSelected2() {
      this.updateApplyGoods();
    }
  }
};
</script>

<style>
/* .goods-items {
  position: relative;
  margin-bottom: 15px;
} */
/* .goods-items:hover {
  box-shadow: 0 0 5px lightgray;
} */
.goods-item {
  margin-bottom: 5px;
}
.goods-select-item {
  padding: 5px 10px;
  width: 50%;
  display: inline-block;
  cursor: pointer;
}
.goods-select-item:hover {
  box-shadow: 0 0 5px lightgray;
}

.apply-goods-closebtn {
  position: absolute;
  /* top: 5px;
  right: 5px; */
  opacity: 0.3;
  color: orangered;
}
.apply-goods-closebtn:hover {
  cursor: pointer;
  opacity: 1;
}
</style>
