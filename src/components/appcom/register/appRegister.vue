<template>
  <div class="full scroll" style="padding:10px">
    <v-form title='挂号'>
      <v-row>
        <v-col span='3'> 编号: </v-col>
        <v-col sapn='5'>
          <label>{{registerNum}}</label>
        </v-col>
        <v-col span='3'> 接单人: </v-col>
        <v-col sapn='5'>
          <label>{{employeeId}}</label>
        </v-col>
      </v-row>
      <v-row>
        <v-col span='3'> 挂号类型: </v-col>
        <v-col span='5'>
          <v-combox :items="registerTypes" v-model="registerType"></v-combox>
        </v-col>
        <v-col span='3'> 挂号模式: </v-col>
        <v-col span='5'>
          <v-combox :items='orderTypes' v-model="orderType"></v-combox>
        </v-col>
      </v-row>
      <section>
        <h3>会员信息</h3>
      </section>
      <v-row>
        <v-col span='3'>姓名: </v-col>
        <v-col span='5'></v-col>
        <v-col span='3'>电话: </v-col>
        <v-col span='5'></v-col>
        <v-col span='3'>会员类型: </v-col>
        <v-col span='3'></v-col>
        <v-col span='2'>
          <Button type="primary" icon="edit">修改</Button>
        </v-col>
      </v-row>
      <section>
        <h3>宠物信息</h3>
      </section>
      <v-row>
        <v-col span='3'>名称: </v-col>
        <v-col span='5'>
          <v-combox :items='pets' v-model="petId"></v-combox>
        </v-col>
        <v-col span='3'>性别: </v-col>
        <v-col span='5'></v-col>
        <v-col span='3'>品种: </v-col>
        <v-col span='5'></v-col>
      </v-row>
      <v-row>
        <v-col span='3'>体重: </v-col>
        <v-col span='5'></v-col>
        <v-col span='3'>毛色: </v-col>
        <v-col span='5'></v-col>
        <v-col span='3'>生日: </v-col>
        <v-col span='5'></v-col>
      </v-row>
    </v-form>
    <v-form title='分诊'>
      <v-row>
        <v-col span='3'>类型: </v-col>
        <v-col span='5'>
          <v-combox :items='pets' v-model="petId"></v-combox>
        </v-col>
        <v-col span='3'>医师: </v-col>
        <v-col span='5'>
          <v-combox :items='pets' v-model="petId"></v-combox>
        </v-col>
      </v-row>
      <v-row style="height:220px">
        <v-col span='3'>时间： </v-col>
        <v-col span='5'>
          <DatePicker open=true type='date' v-model="visitTime" :options='applyDateOptions' format='yyyy/MM/dd'></DatePicker>
        </v-col>
      </v-row>
    </v-form>
    <v-form title='商品销售'>
      <v-row>
        <v-col span='3'>
          <Button type="primary" icon="plus">添加商品</Button>
        </v-col>
      </v-row>
      <h3>商品列表</h3>
      <v-row>
        <v-col>暂无商品</v-col>
      </v-row>
    </v-form>
    <v-form>
       <v-row>
        <v-col span='12'>
          <Button type="primary" icon="plus">提交</Button>
          <Button type="primary" icon="plus">打印</Button>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 单号
      registerNum: "20160203015",
      // 员工
      employeeId: "",
      // 类型
      registerType: 0,
      // 模式
      orderType: 0,
      // 宠物
      petId: 0,
      // 就诊时间
      visitTime: new Date(),
      //申请 时间筛选条件
      applyDateOptions: {
        disabledDate(date) {
          return date && date.valueOf() <= Date.now() + 3 * 22 * 3600;
        }
      },
      name: "",
      gender: "",
      tel: "",
      interest: [],
      date: "",
      time: "",
      desc: "",
      orderTypes: [{ id: 0, name: "会员" }, { id: 1, name: "散客" }],
      registerTypes: [
        { id: 1, name: "专家挂号" },
        { id: 2, name: "普通挂号" },
        { id: 0, name: "急诊挂号" }
      ],
      pets: [{ id: 0, name: "宠物1" }, { id: 1, name: "宠物2" }]
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style>
.content {
  border: 1px solid lightgray;
  padding: 10px;
}
</style>
