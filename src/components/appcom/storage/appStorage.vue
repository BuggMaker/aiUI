<template>
    <v-tab v-bind:titles="source">
        <app-apply-mag slot="申请管理"></app-apply-mag>
        <app-apply slot="采购/清库申请"></app-apply>
        <!-- <v-data-table slot="库存情况" :option='false' :datasource="datasource5">
          <span slot='option'>操作</span>
        </v-data-table> -->
    </v-tab>
    <!-- </v-form> -->
    <!-- <span>开发中...</span> -->
</template>
<script>
import appAM from "./appApplyMag.vue";
import appA from "./appApply.vue";
// import vTab from '../../vuecom/vTab.vue'
// import vPanel from '../../vuecom/vPanel.vue'
// import vdt from '../../vuecom/vTable.vue'
export default {
  components: {
    // 'v-panel': vPanel,
    // 'v-tab': vTab,
    // 'v-data-table': vdt,
    "app-apply-mag": appAM,
    "app-apply": appA
  },
  data() {
    return {
      source: ["申请管理", "采购/清库申请", "库存情况"],
      options: [
        {
          name: "处理",
          class: "edit"
        }
      ],
      datasource4: [
        {
          商品名称: "阿莫西林",
          库存数量: 5,
          生产日期: "",
          有效期: "",
          状态: "提醒中"
        },
        {
          商品名称: "某狗粮",
          库存数量: 5,
          生产日期: "",
          有效期: "",
          状态: "提醒中"
        },
        {
          商品名称: "某药剂",
          库存数量: 5,
          生产日期: "",
          有效期: "",
          状态: "提醒中"
        }
      ],
      datasource5: [
        {
          商品名称: "阿莫西林",
          一级分类: "",
          二级分类: "",
          三级分类: "",
          库存数量: 100,
          进价: "",
          生产日期: new Date().toDateString(),
          有效期: ""
        },
        {
          商品名称: "某狗粮",
          一级分类: "",
          二级分类: "",
          三级分类: "",
          库存数量: 100,
          进价: "",
          生产日期: new Date().toDateString(),
          有效期: ""
        },
        {
          商品名称: "某药剂",
          一级分类: "",
          二级分类: "",
          三级分类: "",
          库存数量: 100,
          进价: "",
          生产日期: new Date().toDateString(),
          有效期: ""
        }
      ],
      goodsApply2: []
    };
  },
  methods: {
    addApply(good) {
      if (
        this.goodsApply1.filter(g => {
          return g.name == good.商品名称;
        }) == 0
      )
        this.goodsApply1.push({
          name: good.商品名称,
          num: 100
        });
      else alert("不能重复添加");
    },
    addAll() {
      this.goodsApply1 = [];
      this.datasource3.forEach(function(good) {
        this.goodsApply1.push({
          name: good.商品名称,
          num: 100
        });
      }, this);
    },
    addApply2(good) {
      if (
        this.goodsApply2.filter(g => {
          return g.name == good.商品名称;
        }) == 0
      )
        this.goodsApply2.push({
          name: good.商品名称,
          num: good.库存数量
        });
      else alert("不能重复添加");
    },
    addAll2() {
      this.goodsApply2 = [];
      this.datasource3.forEach(function(good) {
        this.goodsApply2.push({
          name: good.商品名称,
          num: good.库存数量
        });
      }, this);
    }
  }
};
</script>
<style>

</style>

