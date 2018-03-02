<template>
  <div class="box-vertical full">
    <v-toolbar>
      <Row>
        <Col span="18">
        <v-search class="toolbar-item" placeholder="输入申请人/机构/处理人" v-model="queryStr" @query='getGoodsApplyList'></v-search>
        <v-combox class="toolbar-item" :items="applyTypes" v-model="selectedType"></v-combox>
        <!-- <v-combox class="toolbar-item" :items="applyTypes" v-model="selectedType"></v-combox> -->
        <span class="toolbar-item">处理状态</span>
        </Col>
        <Col span="6">
        <DatePicker class="toolbar-item" type='daterange' placement="bottom-end" placeholder='选择查询时间段' v-model="queryDate" :options='queryDateOptions' format="yyyy/MM/dd" @on-change='getGoodsApplyList'></DatePicker>
        </Col>
      </Row>
    </v-toolbar>
    <div class="box1">
      <!-- 商品申请页 -->
      <v-data-table v-bind:loading="loadingList" v-bind:datasource="datasource" v-bind:columns="columns" :options="options">
        <v-page slot="page" v-bind:source="pageSource"></v-page>
      </v-data-table>
    </div>
    <transition name='fade-right'>
      <!-- 申请详情页 -->
      <v-detail v-model="showDetail" @back="handleBack" :loading='loadingDeatil'>
        <span slot='head' class="float-right">
          <input type="button" value="添加其他商品" class="btn edit" @click="addOtherGoods" />
          <v-button name="submit" text="提交处理" @click="submit"></v-button>
        </span>
        <div slot="body">
          <v-row>
            <v-col :span='8'>
              <div class="setting-item">
                <label class="setting-item-title">申请机构</label>
                <div class="setting-item-content">
                  <span>{{validApply.orgName.value}}</span>
                </div>
              </div>
            </v-col>
            <v-col :span='8'>
              <div class="setting-item">
                <label class="setting-item-title">申请类型</label>
                <div class="setting-item-content">
                  <v-combox :items="applyTypes" v-model="validApply.applyType.value" :readonly='true' class="toolbar-item"></v-combox>
                </div>
              </div>
            </v-col>
            <c-col :span='8'>
              <div class="setting-item">
                <label class="setting-item-title">申请时间</label>
                <div class="setting-item-content">
                  <span>{{validApply.applyDate.value}}</span>
                </div>
              </div>
            </c-col>
          </v-row>
          <v-row>
            <v-col :span='8'>
              <div v-if="validApply.applyType.value == 0" class="setting-item">
                <label class="setting-item-title">是否包含新商品</label>
                <div class="setting-item-content">
                  <span>{{validApply.isContainNew.value?'包含':'不包含'}}</span>
                </div>
              </div>
            </v-col>
            <v-col :span='8'>
              <div class="setting-item">
                <label class="setting-item-title">最晚处理时间</label>
                <div class="setting-item-content">
                  <span>{{validApply.statusTime2.value}}</span>
                </div>
              </div>
            </v-col>
            <v-col :span='8'>
              <div class="setting-item">
                <!-- <label class="setting-item-title">处理状态</label>
                <div class="setting-item-content">
                  <v-combox :items="applyStatusTypes" v-model="validApply.status.value" class="toolbar-item"></v-combox>
                </div> -->
                 <div v-if="validApply.applyType.value==0" class="setting-item">
                <label class="setting-item-title">是否包含赠送商品</label>
                <label><input type="radio" :value="true" v-model="validApply.isContainGive.value" />不含</label>
                <label><input type="radio" :value="false" v-model="validApply.isContainGive.value" /> 含</label>
              </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col :span='24'>
              <div class="setting-item">
                <label class="setting-item-title">申请商品明细</label>
                <div class="setting-item-content">
                  <table style="border:1px solid lightgray;" class="center">
                    <tr class="header1">
                      <th>商品名称</th>
                      <th>申请数量(件)</th>
                      <th>供应数量(件)</th>
                      <th>批次码</th>
                    </tr>
                    <tr v-for="(g,k) in validApply.goodsApplyDetails.value" :key="k" :class="'tr-'+ k%2">
                      <td>{{g.goodsName}}</td>
                      <td>
                        <b>{{g.applyCount}}</b>
                      </td>
                      <td>
                        <v-number v-model="g.supplyCount"></v-number>
                      </td>
                      <td>
                        <v-text v-if="validApply.applyType.value==0" v-model="g.batchCode" placeholder="请输入批次码"></v-text>
                        <v-text v-else :readonly='true' v-model="g.batchCode" placeholder="请输入批次码"></v-text>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col :span='12'>
             <div class="setting-item">
                <label class="setting-item-title">申请备注</label>
                <div class="setting-item-content">
                  <v-textarea v-model="validApply.applyMsg.value" class="width-input"></v-textarea>
                </div>
              </div>
            </v-col>
            <v-col :span='12'>
              <div class="setting-item">
                <label class="setting-item-title">处理备注</label>
                <div class="setting-item-content">
                  <v-textarea v-model="validApply.handleMsg.value" class="width-input"></v-textarea>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-detail>
    </transition>
  </div>
</template>

<script>
// import vdt from '../../vuecom/vTable.vue'
export default {
  // components: {
  //   'v-data-table': vdt
  // },
  data() {
    return {
      options: [
        // { name: "详情", class: "detail", event: { fn: this.detail, base: true } },
        {
          name: "处理",
          class: "edit",
          event: {
            fn: this.handleApply,
            base: true
          }
        },
        {
          name: "退回",
          class: "remove",
          event: {
            fn: this.removeApply,
            base: true
          }
        }
      ],
      selectedType: 0,
      //都不选和都选是一样的 采购/清库
      applyTypes: [],
      applyStatusTypes: [],
      queryStr: "",
      queryDate: [this.dateOption.setDay(new Date(), -15), new Date()],
      queryDateOptions: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      loadingList: true,
      columns: [
        {
          key: "goodsApplyId",
          title: "申请Id"
        },
        {
          key: "applyUserName",
          title: "申请人"
        },
        {
          key: "orgName",
          title: "申请机构"
        },
        // { key: "isContainNew", title: "是否包含新商品" },
        {
          key: "statusTime2Stamp",
          title: "最晚出货时间"
        },
        {
          key: "applyDateStamp",
          title: "申请时间"
        },
        {
          key: "statusName",
          title: "处理状态"
        },
        {
          key: "handleUserName",
          title: "处理人"
        }
        // { key: "handleDate", title: "处理时间" }
        // goodsApplyId": 0,
        // "applyUserName": "string",
        // "orgName": "string",
        // "typeName": "string",
        // "applyDate": "2017-12-05T01:08:47.877Z",
        // "applyMsg": "string",
        // "isContainNew": true,
        // "statusTime2": "2017-12-05T01:08:47.877Z",
        // "handleUserName": "string",
        // "handleDate": "2017-12-05T01:08:47.877Z",
        // "handleMsg": "string",
        // "isContainGive": true,
        // "status": 0,
        // "statusName": "string",
        // "applyUserId": 0,
        // "applyType": 0,
        // "handleUserId": 0
      ],
      dateCols: ["applyDateStamp", "statusTime2Stamp", "handleDateStamp"],
      datasource: [],
      pageSource: {
        total: 0,
        page: 1,
        pages: 1,
        size: 10,
        handlePageChange: this.pageChange
      },
      showDetail: false,
      loadingDeatil: false,
      validApply: new this.validator({
        data:this.getValidator(),
        handle:this.handleValidChange
      })
    };
  },
  mounted() {
    this.getApplyTypes();
    this.getApplyStatusType();
    this.getGoodsApplyList();
  },
  methods: {
    //获取申请类型
    getApplyTypes() {
      var self = this;
      self.myHttp(
        self.myRequest.getEnumsByType(self.myUtils.EnumTypes.ApplyType),
        {
          successed: res => {
            self.applyTypes = res.data;
            // self.applyTypes.push({ id: null, name: "全部申请" });
          },
          failed: err => {
            self.message.error(er.data);
          }
        }
      );
    },
    //获取申请处理状态枚举
    getApplyStatusType() {
      var self = this;
      self.myHttp(
        self.myRequest.getEnumsByType(self.myUtils.EnumTypes.ApplyStatusType),
        {
          successed: res => {
            self.applyStatusTypes = res.data;
          }
        }
      );
    },
    //获取申请列表
    getGoodsApplyList(newDate) {
      var self = this;
      if (newDate) {
        self.queryDate = newDate;
      }
      self.myHttp(
        self.myRequest.getGoodsApplyList({
          applyType: self.selectedType,
          applyDateFrom: self.dateOption.toSeconds(self.queryDate[0]),
          applyDateTo: self.dateOption.toSeconds(self.queryDate[1]),
          page: {
            pageIndex: self.pageSource.page,
            pageSize: self.pageSource.size
          },
          keys: self.queryStr
        }),
        {
          beforeRequest: () => {
            self.loadingList = true;
          },
          afterSuccessed: () => {
            self.loadingList = false;
          },
          successed: res => {
            self.datasource = res.data.list;
            self.pageSource.total = self.datasource.length;
            self.datasource.forEach(row => {
              self.dateCols.forEach(col => {
                row[col] = self.dateOption.toDate(row[col], "yyyy/MM/dd");
              });
            });
          }
        }
      );
    },
    //处理申请
    handleApply(row) {
      var self = this;
      self.showDetail = true;
      var data = {
        applyId: row["goodsApplyId"],
        orgName: row["orgName"],
        applyType: row["applyType"],
        applyMsg: row["applyMsg"],
        applyDate: row["applyDateStamp"],
        isContainNew: row["isContainNew"],
        statusTime2: row["statusTime2Stamp"],
        handleMsg: row["handleMsg"],
        status: row["status"]
      };
      Object.keys(data).forEach(key => {
        self.validApply[key].value = data[key];
      });
      // 处理申请
      //根据申请id 读取信息填充详情表
      self.myHttp(self.myRequest.getGoodsApplyDetail(row["goodsApplyId"]), {
        beforeRequest: () => {
          self.loadingDeatil = true;
        },
        afterSuccessed: () => {
          self.loadingDeatil = false;
        },
        successed: res => {
          self.validApply.goodsApplyDetails.value = res.data;
        }
      });
    },
    removeApply(row) {
      var self = this;
      var removeModal = self.modal.warn({
        content: "确认退回该申请?",
        autoClose: false,
        handleOk: () => {
          self.myHttp(self.myRequest.deleteGoodsApply(row["goodsApplyId"]), {
            successed: res => {
              removeModal.close();
              self.message.success("申请退回成功!");
              self.getGoodsApplyList();
            },
            failed: res => {
              self.message.error("申请退回失败!");
            }
          });
        }
      });
    },
    handleBack() {
      this.modal.info({
        content: "取消申请处理?",
        handleOk: () => {
          this.showDetail = false;
        }
      });
    },
    addOtherGoods() {},
    getValidator() {
      return {
        orgId: { value: 0 },
        orgName: { value: "" },
        applyType: { value: 0 },
        applyDate: { value: new Date().format("yyyy-MM-dd hh:mm:ss") },
        isContainNew: { value: false },
        statusTime2: { value: new Date().format("yyyy-MM-dd hh:mm:ss") },
        applyMsg:{value:''},
        applyId: { value: 0 },
        handleMsg: { value: "", rules: {} },
        isContainGive: { value: false },
        status: { value: 0 },
        goodsApplyDetails: {
          value: [
            {
              goodsId: 0,
              applyCount: 0,
              batchCode: "",
              supplyCount: 0,
              isGive: false,
              remark: ""
            }
          ],
          rules: {}
        }
      };
    },
    handleValidChange(key, val) {
      this.validApply.change(key, val);
    },
    submit() {
      var self = this;
      var submitData = {
        applyId: validApply.applyId.value,
        handleMsg: validApply.handleMsg.value,
        isContainGive: validApply.isContainGive.value,
        status: validApply.status.value,
        handleGoodsApplyDetails: validApply.goodsApplyDetails.value
      };

      self.myHttp(self.myRequest.handleGoodsApply(submitData), {
        successed: res => {
          self.message.success("申请处理,保存成功!");
        }
      });
    }
  },
  watch: {
    selectedType(val) {
      this.getGoodsApplyList();
    }
  }
};
</script>

<style>

</style>
