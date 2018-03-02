<template>
    <div class="member-info box-horizon full">
        <div style="position:relative;width:250px;">
            <!-- <v-tree-list title="机构部门" v-bind:onlytitle="true" v-bind:nodes="orgNodes" v-model='selected'></v-tree-list> -->
            <app-sys-user-org v-model='selected'></app-sys-user-org>
        </div>
        <div class="box1" style="margin-left: 10px;">
            <div class="box-vertical full">
                <v-toolbar>
                    <v-search placeholder="会员名称/手机号" v-on:query="query"></v-search>
                    <input type="button" class="btn common" value="添加会员" v-on:click="addMember" />
                    <span class="margin-right-10">
                        <input type="radio" id="m_p" value="0" v-model="picked" />
                        <label for="m_p">个体会员</label>
                    </span>
                    <span class="margin-right-10">
                        <input type="radio" id="m_e" value="1" v-model="picked" />
                        <label for="m_e">企业会员</label>
                    </span>
                    <span class="margin-right-10">
                        <input type="radio" id="m_all" value="2" v-model="picked" />
                        <label for="m_all">全部会员</label>
                    </span>
                </v-toolbar>
                <div class="box1">
                    <v-table v-bind:datasource="datasource" v-model="detail">
                        <table slot="detail-body">
                            <tr class="tr-0">
                                <td class="common-td left">姓名</td>
                                <td class="common-td"></td>
                                <td class="common-td left">职务</td>
                                <td class="common-td"></td>
                            </tr>
                            <tr class="tr-1">
                                <td class="common-td left">性别</td>
                                <td class="common-td"></td>
                                <td class="common-td left">生日</td>
                                <td class="common-td"></td>
                            </tr>
                            <tr class="tr-0">
                                <td class="common-td left">联系方式</td>
                                <td class="common-td"></td>
                                <td class="common-td left">邮箱</td>
                                <td class="common-td"></td>
                            </tr>
                            <tr class="tr-1">
                                <td class="common-td left">地址</td>
                                <td class="common-td"></td>
                                <td class="common-td left">详细地址</td>
                                <td class="common-td"></td>
                            </tr>
                            <tr class="tr-0">
                                <td class="common-td left">会员等级</td>
                                <td class="common-td"></td>
                                <td class="common-td left">会员积分</td>
                                <td class="common-td"></td>
                            </tr>
                            <tr class="tr-1">
                                <td class="common-td left">会员卡号</td>
                                <td class="common-td"></td>
                                <td class="common-td left">余额</td>
                                <td class="common-td"></td>
                            </tr>
                        </table>

                    </v-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import vAddress from "../../vuecom/vAddress.vue";
// import vTable from "../../vuecom/vTable.vue";
// import vTreeList from "../../vuecom/vTree/vTreeList.vue";
// import appSysUserOrg from "../common/appTree/appSysUserOrg.vue";
// import vSearch from "../../vuecom/vSearch.vue";
// import vToolbar from "../../vuecom/vToolbar.vue";

export default {
  // components: {
  //   "v-address": vAddress,
  //   "v-table": vTable,
  //   "app-sysuserorg": appSysUserOrg,
  //   "v-search": vSearch,
  //   "v-toolbar": vToolbar
  // },
  props: {
    datasource: Array
  },
  data() {
    return {
      picked: "",
      selected: {},
      orgNodes: {},
      detail: {
        show: false,
        title: "详情"
      }
    };
  },
  mounted() {
    this.getOrgs();
  },
  methods: {
    query(str) {
      alert(str);
    },
    getOrgs() {
      var self = this;
      self.myHttp(self.myRequest.getSysUserOrg(), {
        beforeRequest: () => {
          // self.progress.visable = true;
        },
        successed: res => {
          //添加其他属性
          self.orgNodes = self.myunity.AddPropsToTree(res.data, [
            { name: "selected", value: false }
          ]);

          if (self.orgNodes instanceof Array) {
            self.selected = self.orgNodes[0];
          } else {
            self.selected = self.orgNodes;
          }
        },
        afterSuccessed: () => {
          // self.progress.visable = false;
        },
        failed: err => {
          console.log(err);
        }
      });
    },
    addMember() {
      this.detail = {
        show: true,
        title: "添加会员"
      };
    }
  },
  watch: {
    selected(nval, oval) {
      //重新请求数据
    }
  }
};
</script>

<style>

</style>
