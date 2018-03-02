<template>
    <span class="v-userinfo">
        <v-user-icon v-bind:info="userInfo" v-on:click="showInfo"></v-user-icon>
        <v-modal v-dom-portal v-model="show"  title="用户信息设置">
            <table slot="body">
                <tr>
                    <td class="td-common td-label">昵称:</td>
                    <td class="td-common"><input type="text" class="text edit" v-model="userInfo.loginName" /></td>
                    <td class="td-common" rowspan="2">
                        <img class="v-userinfo-icon" v-bind:src="oFile.url">
                    </td>
                </tr>
                <tr>
                    <td class="td-common td-label">用户名:</td>
                    <td class="td-common"><input type="text" class="text edit" readonly v-model="userInfo.userName" /></td>
                </tr>
                <tr>
                    <td class="td-common td-label">所属机构:</td>
                    <td class="td-common"><input type="text" class="text edit" v-model="userInfo.loginName" /></td>
                    <td class="td-common center">
                        <span v-on:click="file" class="btn common">更换头像
                            <input type="file" accept="image/png,image/gif" id="v-userinfo-file" style="display:none" />
                        </span>
                    </td>
                </tr>
            </table>
            <input slot="foot" type="submit" class="btn submit" value="确定" @click="submit" />
        </v-modal>
    </span>
</template>

<script>
// import vModal from "../../vuecom/vPopUp/vModal.vue";
import vUsericon from "../../vuecom/vUserIcon.vue";
export default {
  components: {
    // "v-modal": vModal,
    "v-user-icon": vUsericon
  },
  data() {
    return {
      show: false,
      userInfo: {},
      oFile: {
        url: "",
        value: {}
      }
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      var self = this;
      self.myhttp({
        method: "get",
        url: "/api/Member/GetSysUser",
        successed: res => {
          self.userInfo = res.data;
          self.userInfo.userHeadImg =
            "http://imgs.weijipet.com/img/usericon.jpg";
          self.oFile.url = self.userInfo.userHeadImg;
        },
        failed: err => {}
      });
    },
    showInfo() {
      this.show = true;
      // var self = this;
      // this.modal.show({
      //   title: "用户信息",
      //   content: "确定要更改用户信息?",
      //   handleOk: () => {
      //     self.message.success("你点击了确定!");
      //   }
      // });
    },
    submit() {
      var self = this;
      self.show = false;
      var formData = new FormData();
      formData.append("file", self.oFile.value);
      self.myhttp({
        method: "post",
        url: "",
        data: {},
        config: {
          headers: { "Content-Type": "multipart/form-data" }
        },
        successed: res => {
          //重新获取用户信息
        },
        failed: err => {}
      });
    },
    file(e) {
      var self = this;
      var temFile = document.getElementById("v-userinfo-file");
      temFile.onchange = function(e) {
        try {
          if (temFile.files && temFile.files[0]) {
            self.oFile = {
              value: temFile.files[0],
              url: window.URL.createObjectURL(temFile.files[0])
            };
            console.log(self.oFile);
          }
        } catch (err) {
          console.log(err);
        }
      };
      temFile.click();
    }
  },
  watch: {}
};
</script>

<style>
.v-userinfo {
  position: relative;
  display: inline-block;
}
.v-userinfo-icon {
  padding: 5px;
  width: 150px;
  height: 150px;
  border: 1px solid lightgray;
}
</style>
