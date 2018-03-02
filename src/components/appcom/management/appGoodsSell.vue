<template>
    <div class="goos-sell box-horizon full">
        <div style="position:relative;width:250px;margin-right:10px;">
            <v-tree-list title="角色列表" v-model="selectedRole" v-bind:onlytitle="true" v-bind:nodes="orgRoleNodes" :loading="!selectedRole.id"></v-tree-list>
        </div>
        <div class="box1">
            <!-- <v-panel title="商品列表及销售许可"> -->
            <div slot="body" class="box-horizon full">
                <div style="position:relative;width:250px;margin-right:10px;">
                    <app-goods-class v-model="selectedGoodClass"></app-goods-class>
                </div>
                <div class="box1">                   
                   <div class="box-horizon full">
                     <div class="box1">
                       <v-panel title='商品列表' :loading="loading">
                     <div slot="body">
                       <div class="check-items" v-for="(good,k) in goods" :key="k" @click="select(good)">
                         <v-icon :name="picks[good.id].isChecked?'checked-fill':'unchecked-fill'" :scale='0.5'></v-icon>
                         <span>{{good.name}}</span>
                       </div>
                     </div>                     
                     <span class="float-right" slot="head">
                       <!-- <input type="button" class="btn edit" value="全选/反选" @click="selectAll"></v-button> -->
                       <v-button name="checked-fill ok" :text="isSelectedAll?'反选':'全选'" @click="selectAll"></v-button>
                     </span>
                   </v-panel>
                     </div>
                     <div class="box1">
                       <v-panel title='可售商品' :loading="loading">
                     <div slot="body">
                       <div class="check-items" v-for="(good,k) in sellGoods" :key="k" @click="select(good)">
                         <v-icon name='checked-fill':scale='0.5'></v-icon>
                         <span>{{good.name}}</span>
                       </div>
                     </div>
                     <span class="float-right" slot="head">
                       <v-button name='submit' text="保存配置" 
                       :disabled='sellGoods.length==0' @click="submit"></v-button>
                     </span>
                   </v-panel>
                     </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      orgRoleNodes: [],
      selectedRole: {},
      selectedGoodClass: {},
      goods: [],
      picks: {},
      sellGoods: [],
      loading: false,
      isSelectedAll: false
    };
  },
  mounted() {
    this.getOrgRoles();
  },
  methods: {
    getOrgRoles() {
      var self = this;
      self.myHttp(self.myRequest.getOrgRolesNotContainVip(), {
        successed: res => {
          self.orgRoleNodes = self.myUtils.AddPropsToTree(res.data, [
            {props:[{ name: "selected", value: false }]}
          ]);
          if (
            self.orgRoleNodes.length > 0 &&
            self.orgRoleNodes[0].items.length > 0
          ) {
            self.selectedRole = self.orgRoleNodes[0].items[0];
          }
        },
        failed: err => {
          self.message(er.data);
        }
      });
    },
    getRoleGoodsInfo() {
      var self = this;
      if (self.selectedRole.id && self.selectedGoodClass.id) {
        self.myHttp(
          self.myRequest.getRoleGoodsInfo(
            self.selectedRole.id,
            self.selectedGoodClass.id
          ),
          {
            beforeRequest: () => {
              self.loading = true;
            },
            afterSuccessed: () => {
              self.loading = false;
            },
            successed: res => {
              self.goods = res.data;
              self.goods.forEach(function(good) {
                if (!self.picks[good.id]) self.$set(self.picks, good.id, good);
                // self.$set(self.picks, good.id, good.isChecked);
                // self.picks[good.id] = good.isChecked;
              });
            },
            failed: err => {
              self.message.error(err.data);
            }
          }
        );
      }
    },
    //后续优化效率问题 根据变更项作出更改
    getSellGoods() {
      var goodsAry = [];
      var self = this;
      Object.keys(self.picks).forEach(key => {
        if (self.picks[key].isChecked) goodsAry.push(self.picks[key]);
      });
      this.sellGoods = goodsAry;
    },
    //全部选中或反选
    selectAll() {
      var self = this;
      self.goods.forEach(function(good) {
        // good.isChecked = true;
        self.picks[good.id].isChecked = !self.isSelectedAll;
      });
      this.getSellGoods();
      this.isSelectedAll = !this.isSelectedAll;
    },
    select(good) {
      // good.isChecked = !good.isChecked;
      this.picks[good.id].isChecked = !this.picks[good.id].isChecked;
      this.getSellGoods();
    },
    submit() {
      var self = this;
      self.myHttp(
        self.myRequest.saveRoleGoodsInfo({
          roleId: self.selectedRole.id,
          goodStructList: self.sellGoods
        }),
        {
          successed: res => {
            if (res.data == true) self.message.success("");
          }
        }
      );
    }
  },
  watch: {
    selectedRole(nval) {
      this.getRoleGoodsInfo();
    },
    selectedGoodClass(nval) {
      this.getRoleGoodsInfo();
    }
  }
};
</script>

<style>
.check-items {
  border-bottom: 1px dashed rgba(200, 200, 200, 0.25);
  padding: 10px 30px;
  cursor: pointer;
}
.check-items:hover {
  box-shadow: 0 0 5px lightgray;
}
</style>
