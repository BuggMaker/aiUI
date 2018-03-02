<template>
  <div class="vdt full">
    <transition name="fade-left">
      <div v-if="!detail.show" class=" box-vertical full">
        <!-- 表格 -->
        <div class="box1" style="overflow:hidden;background-color:white;border:1px solid lightgray;" id="vdt-content">
          <div class="box-vertical full">
            <div class="header">
              <table style="text-align:center;" class="full">
                <thead class="header" id="vdt-head">
                  <tr>
                    <th v-if='selectable' class='vdt-selectable' @click='selectAll'>
                      <Icon :type='headerCheckIcon.type' :color='headerCheckIcon.color'></Icon>
                    </th>
                    <th v-for="(col,k) in columns" :key="k" class="vdt-th" :class="{active:sortCol==col.key}" v-on:click="sortBy(col.key)">
                      {{col.title | capitalize}}
                      <span class="vdt-arrow" :class="sortOrders[col.key]>0? 'asc':'dec'"></span>
                    </th>
                    <th v-if="options">操作</th>
                  </tr>
                </thead>
                <tbody class="scroll" id="vdt-body" style="height:400px;opacity:0;">
                  <tr v-for="(row,rIndex) in resultDatas" :key="rIndex" class="vdt-tr" :class="rIndex%2==1?'tr-1':'tr-0'">
                    <!-- <td class="vdt-td">{{(page-1) *limit+rIndex+1}}</td> -->
                    <td v-if='selectable' :class="unselectableItems[row[keyField]]?'vdt-unselectable':'vdt-selectable'" @click='selectRow(row)'>
                      <Icon v-if='!unselectableItems[row[keyField]]' :type="selectedItems.indexOf(row)>=0?'android-checkbox-outline':'android-checkbox-outline-blank'" :color="selectedItems.indexOf(row)>=0?'dodgerblue':'gray'"></Icon>
                      <Icon v-else type="android-checkbox-outline" color="gray"></Icon>
                    </td>
                    <td class="vdt-td" v-for="(col,key) in columns" :key="key" v-on:click="cellClick(row,col)">
                      {{row[col.key]}}
                    </td>
                    <td class="vdt-td" v-if="options">
                      <!-- <input v-for="(op,k) in options" :key="k" class="vdt-btn btn" :class="op.class" type="button" :value="op.name " @click="optionClick(op,row,rIndex) " /> -->

                      <v-button v-for="(op,k) in options" :key="k" :name="op.class" :text="op.name" @click="optionClick(op,row,rIndex) "></v-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="box1 scroll">
              <table style="text-align:center;margin-top:-40px;" class="full">
                <thead class="header" id="vdt-head" style="opacity:0;">
                  <tr>
                    <td v-if='selectable' class='vdt-selectable' @click='selectAll'>
                      <Icon :type="headerCheckIcon.type" :color='headerCheckIcon.color'></Icon>
                    </td>
                    <th v-for="(col,k) in columns" :key="k" class="vdt-th" :class="{active:sortCol==col}" v-on:click="sortBy(col.key)">
                      {{col.title | capitalize}}
                      <span class="vdt-arrow" :class="sortOrders[col.key]>0? 'asc':'dec'"></span>
                    </th>
                    <th v-if="options">操作</th>
                  </tr>
                </thead>
                <tbody id="vdt-body">
                  <tr v-for="(row,rIndex) in resultDatas" :key="rIndex" class="vdt-tr" :class="rIndex%2==1?'tr-1':'tr-0'">
                    <!-- <td class="vdt-td">{{(page-1) *limit+rIndex+1}}</td> -->
                    <td v-if='selectable' :class="unselectableItems[row[keyField]]?'vdt-unselectable':'vdt-selectable'" @click='selectRow(row)'>
                      <Icon v-if='!unselectableItems[row[keyField]]' :type="selectedItems.indexOf(row)>=0?'android-checkbox-outline':'android-checkbox-outline-blank'" :color="selectedItems.indexOf(row)>=0?'dodgerblue':'gray'"></Icon>
                      <Icon v-else type="android-checkbox-outline" color="gray"></Icon>
                    </td>
                    <td class="vdt-td" v-for="(col,key) in columns" :key="key" v-on:click="cellClick(row,col)">
                      {{row[col.key]}}
                    </td>
                    <td class="vdt-td" v-if="options">
                      <!-- <input v-for="(op,k) in options" :key="k" class="vdt-btn btn" :class="op.class" type="button" :value="op.name " v-on:click="optionClick(op,row,rIndex) " /> -->
                      <v-button v-for="(op,k) in options" :key="k" :name="op.class" :text="op.name" @click="optionClick(op,row,rIndex) "></v-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 页码 -->
        <slot name='page'></slot>
      </div>
    </transition>
    <transition name="fade-right">
      <!-- 详情页 -->
      <v-detail v-if="detail.show" :title="detail.title" v-on:back="back">
        <div slot="head">
          <slot name="detail-head"></slot>
        </div>
        <div slot="body">
          <slot name="detail-body" class="full"></slot>
        </div>
        <div slot="foot">
          <slot name="detail-foot"></slot>
        </div>
      </v-detail>
      <!-- <slot name="detail"  v-if="showInfo" :title="detailTitle" v-on:back="back"></slot> -->
    </transition>
    <v-modal v-model="loading" :source="modalSource"></v-modal>
  </div>
</template>

<script>
// 说明
// 参数 props
// loading:是否加载
// columns:列名
// datasource:数据
// option:是否允许操作表格
// options:操作项及对应执行函数

import vdetail from "./vDetail.vue";
export default {
  components: {
    "v-detail": vdetail
  },
  props: {
    //Loading
    // value: Boolean,
    columns: Array,
    datasource: {
      type: Array,
      require: true
    },
    option: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array
      // default: () => {
      //   return [
      //     { name: "详情", class: "detail" },
      //     { name: "编辑", class: "edit", event: { base: false, fn: () => {} } },
      //     { name: "删除", class: "delete" }
      //   ];
      // }
    },
    loading: Boolean,
    //是否 可选(CheckBox)
    selectable: Boolean,
    //是否单选
    isRadio: Boolean,
    //选择项 index
    // selectedItems: {
    //   type: [Array],
    //   default: () => {
    //     return [];
    //   }
    // },
    unselectableItems: {
      type: Object,
      default: () => {
        return {};
      }
    },
    keyField: String
  },
  data: function() {
    // this.columns = this.getColumns();
    let sortOrders = {};
    this.columns.forEach(function(col) {
      sortOrders[col.key] = 1;
    });
    return {
      sortCol: "",
      sortOrders: sortOrders,
      rowEditable: [],
      rowNew: {},
      detail: {
        show: false,
        title: "详情"
      },
      //loading modal
      modalSource: {
        loading: true
      },
      selectedItems: []
    };
  },
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  computed: {
    resultDatas: function() {
      var colKey = this.sortCol;
      var order = this.sortOrders[colKey] || 1;
      var datas = this.datasource;
      if (colKey) {
        datas.sort(function(a, b) {
          a = a[colKey];
          b = b[colKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return datas;
    },
    //表头 CheckBox选择状态
    headerCheckIcon() {
      var checkIcon = {
        type: "android-checkbox-outline-blank",
        color: "gray"
      };
      var selLength = this.selectedItems.length + this.unselectableItems.length,
        length = this.datasource.length;
      if (
        (selLength > 0 && selLength === length) ||
        (selLength === 1 && this.isRadio)
      ) {
        checkIcon = {
          type: "android-checkbox-outline",
          color: "dodgerblue"
        };
      } else if (selLength > 0) {
        checkIcon = {
          type: "android-checkbox-outline-blank",
          color: "dodgerblue"
        };
      } else {
        checkIcon = {
          type: "android-checkbox-outline-blank",
          color: "gray"
        };
      }
      return checkIcon;
    }
  },
  mounted: function() {
    var self = this;
  },
  methods: {
    sortBy: function(colKey) {
      this.sortCol = colKey;
      this.sortOrders[colKey] *= -1;
    },
    getColumns: function() {
      var cols = [];
      if (this.datasource.length > 0) {
        for (var key in this.datasource[0]) {
          cols.push(key);
        }
      }
      return cols;
    },
    cellClick: function(row, col) {
      this.$emit("cellclick", row, col);
    },
    optionClick: function(op, row, index) {
      if (op.event) {
        op.event.fn(row, index);
      }
    },
    back: function() {
      this.detail.show = false;
    },
    //全选 单选时不起作用
    selectAll() {
      if (this.isRadio) return;
      else {
        var selLength =
            this.selectedItems.length + this.unselectableItems.length,
          length = this.datasource.length;
        if (length === selLength) {
          this.selectedItems = [];
        } else {
          this.selectedItems = [];
          this.datasource.forEach(element => {
            if (!this.unselectableItems[element[this.keyField]])
              this.selectedItems.push(element);
          });
        }
        this.$emit("selectAll", this.selectedItems);
      }
    },
    selectRow(row) {
      if (this.isRadio) {
        this.selectedItems = [];
      }
      var index = this.selectedItems.indexOf(row);
      if (index < 0) this.selectedItems.push(row);
      else this.selectedItems.splice(index, 1);

      this.$emit("selectChange", row, this.selectedItems);
    }
  },
  watch: {
    value(nval, oval) {
      if (nval !== this.selectedItems) {
        this.selectedItems = value;
      }
    },
    selectedItems(nval, oval) {
      // this.$emit("selectedChange", this.selectedItems);
    },
    detail(nval, oval) {
      this.$emit("input", nval);
    },
    loading(nval, oval) {
      console.log(nval);
    }
  }
};
</script>

<style>
.vdt {
  /* position: relative; */
  color: rgb(20, 20, 20);
  overflow: hidden;
  /* border: 1px solid lightgray; */
  /* background-color: white; */
}

.vdt-btn {
  cursor: pointer;
  padding: 5px;
}

.vdt-page {
  float: right;
  height: 25px;
}

.vdt-page-option {
  height: 100%;
  margin: 0;
  padding: 0;
}

.vdt-page-li {
  list-style: none;
  border: 1px solid lightgray;
  min-width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color: gray;
  user-select: none;
  float: left;
}

.vdt-page-li.active {
  background-color: dodgerblue;
  color: white;
}

.vdt-page-li:hover {
  border: 1px solid dodgerblue;
  cursor: pointer;
}

.vdt-page-li.left {
  min-width: 30px;
  border-radius: 10px 0px 0px 10px;
}

.vdt-page-li.right {
  min-width: 30px;
  border-radius: 0px 10px 10px 0px;
}

.vdt-page-num {
  float: left;
  height: 25px;
}

.vdt-page-num select {
  height: 25px;
  border-radius: 5px;
  border: 1px solid lightgray;
}

.vdt-th {
  cursor: pointer;
}

.vdt-th.active {
  background-color: rgba(100, 100, 100, 0.8);
}

/* .vdt-tr:hover {
  background-color: rgba(200, 200, 200, 0.8);
} */

.vdt-td {
  padding: 3px;
  max-width: 300px;
  word-wrap: break-word;
  word-break: break-all;
}

.vdt-arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0px;
  height: 0px;
}

.vdt-arrow.asc {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgb(83, 83, 83);
}

.vdt-arrow.dec {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgb(83, 83, 83);
}

.vdt-selectable {
  cursor: pointer;
}
.vdt-unselectable {
  pointer-events: none;
}
</style>
