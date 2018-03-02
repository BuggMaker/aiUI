<template>
    <div class="box-horizon full">
        <div style="position:relative;width:250px;">
            <v-tree-list title="角色列表" v-bind:onlytitle="true" v-bind:nodes="roles" v-model="roleSelected" v-bind:levelLimit="1" v-bind:loading="loadingRole">
                <input slot="head" type="button" class="btn common float-right" value="新建角色" v-on:click="addRole" />
            </v-tree-list>
        </div>
        <div class="box3 hidden" style="margin-left:10px;">
            <!-- 权限列表 -->
            <!-- <transition name="fade-left"> -->
                <v-panel v-if="!showRoleInfo" title="权限设置" v-bind:loading="loadingPer">
                    <div class="role-option" slot="head">
                        <label>{{'当前角色:'+ roleSelected.name}}</label>
                        <input class="btn edit" type="button" value="编辑" v-on:click="editRole" />
                        <input class="btn delete" type="button" value="删除" />
                    </div>
                    <div class="box-vertical full" slot="body">
                        <div class="permission box1 scroll">
                            <!-- <div class="permission-title">{{dataSubmit}}</div> -->
                            <section v-for="(p,k) in permissions" v-bind:key="k">
                                <div class="permission-title">
                                    <label>{{p.groupName}}</label>
                                    <div class="permission-select">
                                        <input type="button" value="全选/反选" class="btn common" v-on:click="selectAll(p.permissionItems)" />
                                    </div>
                                </div>
                                <table class="permission-items">
                                    <tr v-for="(r,k) in p.permissionItems" v-bind:key="k" class="permission-item">
                                        <td>{{r.name}}</td>
                                        <td class="permission-option">
                                            <input class="checkbox" type="checkbox" v-bind:id="r" v-bind:value="r.id" v-model="dataSubmit.permissions">
                                        </td>
                                    </tr>
                                </table>
                            </section>
                        </div>
                    </div>
                    <input slot="foot" type="button" value="提交编辑" class="btn submit margin-5" v-on:click="submitRP" />
                    <!-- <input slot="foot" type="button" value="取消" class="btn cancel margin-5" /> -->
                </v-panel>
            <!-- </transition> -->            
        </div>
        <!-- 角色详情页 -->
            <transition name="fade-right">
                <v-detail v-model="showRoleInfo" title="角色编辑" v-on:back="back">
                 <div slot='body'>
                  <div class="setting-item">
                    <label class="setting-item-title">角色名称</label>
                    <div class="setting-item-content">
                      <v-text v-model="validRole.roleName.value" v-validate="validRole.roleName"></v-text>
                    </div>
                  </div>
                  <div class="setting-item">
                    <label class="setting-item-title">机构类型</label>
                    <div class="setting-item-content">
                      <v-combox class="width-input" v-bind:items="orgTypes" v-model="validRole.orgType.value"  v-validate='validRole.orgType'></v-combox>
                    </div>
                  </div>
                  <div class="setting-item">
                    <label class="setting-item-title">角色类型</label>
                    <div class="setting-item-content">
                      <v-combox class="width-input" v-bind:items="roleTypes" v-model="validRole.roleType.value"  v-validate='validRole.roleType'></v-combox>
                    </div>
                  </div>
                 </div>
                    <input slot="foot" type="button" class="btn submit" value="提交编辑" v-on:click="submitR" />
                </v-detail>
            </transition>
    </div>
</template>

<script>
import vdetail from "../../vuecom/vDetail.vue";
export default {
  components: {
    "v-detail": vdetail
  },
  data() {
    return {
      //角色集合
      roles: [],
      //当前编辑角色
      roleSelected: {},
      //角色类型
      roleTypes: [], // this.myunity.Enum.roleTypes,
      orgTypes: [],
      // 权限集合
      permissions: [],
      //显示角色详情页
      showRoleInfo: false,
      //提交数据
      dataSubmit: {},
      //是否新建角色
      isAdd: false,
      loadingRole: true,
      loadingPer: true,
      validRole: new this.validator({ data: this.getValidator() })
    };
  },
  mounted() {
    this.getRoleTypes();
    this.getRoles();
    this.getOrgTypes();
  },
  methods: {
    getRoleTypes() {
      var self = this;
      self.myHttp(
        self.myRequest.getEnumsByType(self.myunity.EnumTypes.RoleType),
        {
          successed: res => {
            self.roleTypes = res.data;
          },
          failed: err => {}
        }
      );
    },
    getOrgTypes() {
      var self = this;
      self.myHttp(
        self.myRequest.getEnumsByType(self.myunity.EnumTypes.OrgType),
        {
          successed: res => {
            self.orgTypes = res.data;
          },
          failed: err => {}
        }
      );
    },
    getRoles() {
      var self = this;
      //获取角色列表 分组形式
      self.myHttp(self.myRequest.getSysRolesNotContainVip(), {
        beforeRequest: () => {
          self.loadingRole = true;
        },
        successed: res => {
          //角色赋值
          var tempRoles = res.data;
          // self.roles = tempRoles;
          self.roles = self.myUtils.AddPropsToTree(tempRoles, [
            {props:[{ name: "selected", value: false }]}
          ]);

          // 判断角色列表是否大于一组 第一组内的角色数是否大于1
          if (self.roles.length > 0 && self.roles[0].items.length > 0) {
            self.roleSelected = self.roles[0].items[0];
            // getRolePermissions();
          }
        },
        afterSuccessed: () => {
          self.loadingRole = false;
        },
        failed: err => {
          console.log(err);
        }
      });
    },
    getRolePermissions() {
      var self = this;
      self.dataSubmit = {
        // role: self.initRole(),
        permissions: []
      };

      //默认通过第一组第一个角色的 权限信息填充页面
      self.myHttp(self.myRequest.getPermissionsByRoleId(self.roleSelected.id), {
        beforeRequest: () => {
          self.loadingPer = true;
        },
        successed: res => {
          self.permissions = res.data;
          self.permissions.forEach(g => {
            g.permissionItems.forEach(p => {
              if (p.isChecked) self.dataSubmit.permissions.push(p.id);
            });
          });
        },
        afterSuccessed: () => {
          self.loadingPer = false;
        },
        failed: err => {
          console.log(err);
        }
      });
    },
    back: function() {
      var self = this;
      self.modal.warn({
        content: "是否保存更改?",
        handleOk: this.submit,
        handleClose: () => {
          self.showRoleInfo = false;
          self.isAdd = false;
        }
      });
    },
    selectAll: function(permissionItems) {
      permissionItems.forEach(p => {
        var index = this.dataSubmit.permissions.indexOf(p.id);
        if (index >= 0) this.dataSubmit.permissions.splice(index, 1);
        else {
          this.dataSubmit.permissions.push(p.id);
        }
      }, this);
    },
    //role validator 角色数据验证
    getValidator() {
      return {
        roleId: {
          key: "id",
          value: 0
        },
        roleName: {
          value: "",
          rules: {
            required: true,
            maxlength: 20
          },
          handle: this.handleChange
        },
        orgType: {
          value: 0,
          rules: {
            roleSelected: true
          },
          handle: this.handleChange,
          data: {
            key: "",
            value: {
              id: 0,
              name: ""
            }
          }
        },
        roleType: {
          value: 0,
          rules: {
            roleSelected: true
          },
          handle: this.handleChange,
          data: {
            key: "",
            value: {
              id: 0,
              name: ""
            }
          }
        }
      };
    },
    handleChange(key, val) {
      this.validRole.change(key, val);
    },
    addRole: function() {
      //添加新的角色
      this.isAdd = true;
      this.validRole.restore();
      this.showRoleInfo = true;
    },
    editRole: function() {
      var self = this;
      // slef.myHttp(self.myRequest.getRoleById(self.roleSelected.id), {
      //   successed: res => {
      //     self.validate.set(res.data);
      //     self.getRoles();
      //   },
      //   failed: er => {}
      // });
      this.showRoleInfo = true;
    },
    //保存角色编辑
    submitR() {
      var self = this;
      var submitData;
      if (self.validRole.check()) {
        submitData = self.validRole.get();
      }
      if (!submitData) {
        this.message.warn("请确认编辑后在保存!");
        return;
      }
      this.myHttp(slef.myRequest.saveRole(submitData), {
        successed: res => {},
        failed: err => {}
      });
    },
    //保存权限编辑
    submitRP() {
      var self = this;
      this.myHttp(
        slef.myRequest.saveRolePermission({
          roleId: slef.roleSelected.id,
          permissionIds: self.dataSubmit.permissions
        }),
        {
          successed: res => {},
          failed: err => {}
        }
      );
      this.isAdd = false;
    }
  },
  watch: {
    roleSelected(val) {
      this.getRolePermissions();
    },
    dataSubmit(val, oval) {
      console.log(val);
    }
  }
};
</script>

<style>
.role-list {
  /* margin: -5px; */
  border: 1px solid lightgray;
}

.role-list-item,
.role-new {
  margin: 10px;
  border-radius: 5px;
  /* height: 35px; */
  line-height: 35px;
  font-size: 20px;
  text-align: center;
  padding: 0;
}

.role-item {
  color: rgba(5, 16, 22, 0.8);
}

.role-list-item:hover,
.role-item.active {
  background-color: rgba(5, 16, 22, 0.8);
  cursor: pointer;
  color: white;
}

.role-option {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding-right: 10px;
  text-align: center;
}

.role-option .btn {
  padding: 5px;
  font-size: 15px;
  /* color: white;
    background-color: rgba(5, 16, 22, 0.5);
    border-radius: 5px; */
}

.permission-select {
  position: absolute;
  right: 0;
  width: 39%;
  top: 0;
  text-align: left;
  padding: 0 0 10px 20px;
}

.permission {
  overflow-x: hidden;
}

.permission-title {
  position: relative;
  margin: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 40px;
  border-bottom: 1px solid lightgray;
}

.permission-items {
  margin-left: 5%;
  width: 90%;
}

.permission-item {
  border-bottom: 1px solid lightgray;
}

.permission-item td {
  padding: 10px 50px;
  text-align: left;
}

.checkbox {
  width: 15px;
  height: 15px;
  background-color: lightgray;
}

.permission-option {
  width: 40%;
}
</style>
