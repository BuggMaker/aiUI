<template>
  <div class="full">
    <transition name="zoom-in">
      <span v-if="show&&!selectOrg" class="login">
        <form autocomplete="off " v-on:keydown.enter="submit">
          <table class="login-table">
            <tr>
              <!-- 宠物门诊及后台管理系统 -->
              <td class="td-title" colspan="2"></td>
            </tr>
            <tr>
              <td colspan="2">
                <span class="input-txt">
                  <span class="img-username"></span>
                  <input tabindex="1" class="txt-un" id="un" type="text" v-model="userName" autofocus placeholder="用户名" />
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span class="input-txt">
                  <span class="img-password"></span>
                  <input tabindex="2" class="txt-pwd" id="pwd" type="password" v-model="password" placeholder="密码" />
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <input tabindex="3" class="input-btn btn submit" type="button" value="登  录" v-on:click="submit" />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <input tabindex="3" class="input-btn btn common" type="button" value="组件测试" v-on:click="comTest" />
              </td>
            </tr>
          </table>
        </form>
      </span>
    </transition>
    <app-change-org v-if="selectOrg"></app-change-org>
    <transition name="fade-right">
      <v-detail v-model="showComTest" v-on:back="back">
      <app-test slot="body"></app-test>
    </v-detail>
    </transition>
  </div>
</template>

<script>
  import vdetail from '../../vuecom/vDetail.vue'
  import appChangeOrg from "../sysUser/appChangeOrg.vue";
  export default {
    components: {
      "app-change-org": appChangeOrg,
      'v-detail': vdetail
    },
    data: function () {
      return {
        userName: "",
        password: "",
        //控制显示登录窗口
        show: false,
        //控制显示 选择机构弹窗
        selectOrg: false,
        showComTest: false
      };
    },
    mounted: function () {
      var self = this;
      setTimeout(function () {
        self.show = true;
      }, 100);
    },
    methods: {
      submit: function () {
        var self = this;

        //验证登录
        self.myHttp(
          self.myRequest.login({
            loginName: self.userName,
            password: self.password
          }), {
            successed: res => {
              if (res.data == true) {
                //登录成功 判断用户类型
                self.myHttp(self.myRequest.getSysUser(), {
                  successed: res => {
                    //员工
                    if (res.data.type == 0) {
                      //判断是够从属多机构
                      if (res.data.orgIds.length > 1) {
                        self.slelctOrg = true;
                      } else {
                        window.location.href = "/Home/Index";
                      }
                    } else if (res.data.type == 1) {
                      //会员
                      window.location.href = "/ClientUser/Index";
                    }
                  }
                });
              } else {

              }
            },
            failde: err => {
              console.log(err);
            }
          }
        );

      },
      comTest() {
        this.show = false;
        this.showComTest = true;
      },
      back() {
        this.show = true;
        this.showComTest = false;
      }
    }
  };
</script>

<style>
  .login {
    position: absolute;
    margin: -150px -250px;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.7);
    /* box-shadow: 2px 2px 10px lightgray; */
    text-align: center;
    box-sizing: border-box;
  }


  .login-table {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: 10px;
    box-shadow: 2px 2px 10px gray;
  }

  .login-table:hover {
    box-shadow: 2px 2px 10px lightgray;
  }

  .login-table td {
    position: relative;
    height: 40px;
    line-height: 40px;
    /*border: 1px solid red;*/
    font-family: 黑体;
    /* font-size: 20px; */
  }

  .td-title {
    padding: 10px;
    font-size: 35px;
    font-weight: 400;
    color: rgb(50, 50, 50);
    font-family: 宋体;
  }

  .input-txt {
    display: inline-flex;
    width: 70%;
    background-color: rgba(200, 200, 200, 0.5);
  }

  .input-txt:-webkit-autofill {
    background-color: #faffbd;
    background-image: none;
    color: #000;
  }

  .input-txt:hover,
  .txt-un:focus,
  .txt-pwd:focus {
    /* border: 2px solid lightgray; */
    box-shadow: 1px 1px 5px forestgreen;
  }

  .txt-un,
  .txt-pwd {
    /* position: absolute;     */
    box-sizing: border-box;
    height: 50px;
    width: 300px;
    padding: 2px 10px;
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .img-username {
    /* position: absolute; */
    display: inline-block;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: url(http://imgs.weijipet.com/img/user.png) 10px 10px no-repeat;
    background-size: 30px 30px;
    box-sizing: border-box;
  }

  .img-password {
    /* position: absolute; */
    display: inline-block;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: url(http://imgs.weijipet.com/img/lock.png) 10px 10px no-repeat;
    background-size: 30px 30px;
    box-sizing: border-box;
  }

  .input-btn {
    padding: 5px;
    width: 70%;
    font-weight: 600;
    font-size: 25px;
    cursor: pointer;
    margin-bottom: 30px;
  }
</style>