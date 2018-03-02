<template>
    <div class="member-info box-horizon full">
        <div style="position:relative;width:250px;">
            <app-sys-user-org v-model='selected'></app-sys-user-org>
        </div>
        <div class="box1" style="margin-left: 10px;">
            <div class="box-vertical full">
                <v-toolbar>
                    <v-search placeholder="员工姓名/手机号" v-on:query="getStaffs" v-model="queryStr"></v-search>
                    <input type="button" class="btn common" value="添加员工" v-on:click="addEmployee" /> 
                </v-toolbar>
                <div class="box1">
                    <v-data-table 
                    :datasource="datasource" 
                    :options='options' 
                    :columns="columns" 
                    :pageSource="pageSource"
                    :loading='dataLoading'></v-data-table> 
                </div>
            </div>
        </div>
        <transition name="fade-right">
           <v-detail v-model="detail.show" 
           :title="detail.title"
            @back="cancel">
              <div slot="body">
                <div class="setting-item">
                   <h3>基本信息</h3>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">姓名</label>
                  <div class="setting-item-content">
                    <v-text v-model="validStaff.name.value" v-validate="validStaff.name"></v-text>
                  </div>
                </div>  
                 <div class="setting-item">
                  <label class="setting-item-title">性别</label>
                  <div class="setting-item-content">
                    <v-combox class="width-input" :items='genders' v-model="validStaff.gender.value" v-validate='validStaff.gender'></v-combox>
                  </div>
                </div>  
                <div class="setting-item">
                  <label class="setting-item-title">生日</label>
                  <div class="setting-item-content">
                    <v-date class="width-input" v-model="validStaff.birthday.value" v-validate="validStaff.birthday"></v-date>         
                  </div>
                </div>  
                <div class="setting-item">
                  <label class="setting-item-title">邮箱</label>
                  <div class="setting-item-content">
                    <v-text v-model="validStaff.email.value" v-validate="validStaff.email"></v-text>
                  </div>
                </div>  
                <div class="setting-item">
                  <label class="setting-item-title">身份证号</label>
                  <div class="setting-item-content">
                    <v-text v-model="validStaff.idCardNum.value" v-validate="validStaff.idCardNum"></v-text>
                  </div>
                </div>  
                <div class="setting-item">
                  <label class="setting-item-title">联系电话</label>
                  <div class="setting-item-content">
                    <v-text v-model="validStaff.tel.value" v-validate="validStaff.tel"></v-text>         
                  </div>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">原住地区县</label>
                  <div class="setting-item-content">
                    <v-address class="width-input" v-model="validStaff.originalDistrictCode.value" v-validate="validStaff.originalDistrictCode"></v-address>         
                  </div>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">原住地详细地址</label>
                  <div class="setting-item-content">
                    <v-textarea class="width-input" v-model="validStaff.originalAddress.value" v-validate="validStaff.originalAddress"></v-textarea>         
                  </div>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">现住地区县</label>
                  <div class="setting-item-content">
                    <v-address class="width-input" v-model="validStaff.temporaryDistrictCode.value" v-validate="validStaff.temporaryDistrictCode"></v-address> 
                  </div>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">现住地详细地址</label>
                  <div class="setting-item-content">
                    <v-textarea class="width-input" v-model="validStaff.temporaryAddress.value" v-validate="validStaff.temporaryAddress"></v-textarea>         
                  </div>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">紧急联系人</label>
                  <div class="setting-item-content">
                    <v-text v-model="validStaff.urgentContactName.value" v-validate="validStaff.urgentContactName"></v-text>         
                  </div>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">紧急联系人电话</label>
                  <div class="setting-item-content">
                    <v-text v-model="validStaff.urgentContactTel.value" v-validate="validStaff.urgentContactTel"></v-text>         
                  </div>
                </div>
                <div class="setting-item">
                   <h3>就职信息</h3>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">工作状态</label>
                  <div class="setting-item-content">
                    <!-- <v-combox class="width-input" :items='genders' v-model="validStaff.status.value" v-validate="validStaff.status"></v-combox>          -->                    
                    <v-text v-model="validStaff.status.value" v-validate="validStaff.status"></v-text>   
                  </div>
                </div>
                 <div class="setting-item">
                    <label class="setting-item-title">就职部门与职务</label>
                    <div class="setting-item-content">
                          <span class="btn edit" @click="addDepAndRole(pr)">添加</span>
                          <div style="margin-top:15px;" v-for="(pr,k) in validStaff.departmentIds.value" :key='k'>
                            <sapn style="padding-right">
                               <label>部门{{k+1}}</label>
                               <v-drop-down-tree class="width-input" :nodes='sysDeps' v-model="pr.id" :selected="pr" :multiple="false" v-validate="validStaff.departmentIds"></v-drop-down-tree>
                            </sapn>  
                            <label>职务{{k+1}}</label>
                            <v-text v-model.lazy="pr.extendField" v-validate="validStaff.departmentIds"></v-text>
                            <span class="btn remove" @click="removeDepAndRole(pr)">移除</span>
                          </div>
                    </div>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">角色权限</label>
                  <div class="setting-item-content">
                    <v-drop-down-tree class="width-input" :multiple='true' :nodes='sysRoles' v-model="validStaff.roleIds.value" v-validate="validStaff.roleIds"></v-drop-down-tree>         
                  </div>
                </div>
                <div class="setting-item">
                  <label class="setting-item-title">备注</label>
                  <div class="setting-item-content">
                    <v-textarea class="width-input" v-model="validStaff.remark.value" v-validate="validStaff.remark"></v-textarea>         
                  </div>
                </div>
              </div>                       
              <span slot="foot">
                  <input type="button" class="btn cancel" value="取消" v-on:click="cancel"/>
                  <input type="button" class="btn submit" value="保存" v-on:click="submit"/>
              </span>
                    </v-detail>
        </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      selected: {},
      detail: {
        show: false,
        title: "详情"
      },
      //datatable params
      columns: [
        { key: "name", title: "姓名" },
        { key: "sex", title: "性别" },
        { key: "tel", title: "电话" },
        { key: "position", title: "职位" }
      ],
      dataLoading: true,
      datasource: [],
      options: [
        {
          name: "编辑",
          class: "edit",
          event: { base: false, fn: this.editEmployee }
        },
        {
          name: "删除",
          class: "delete",
          event: { base: false, fn: this.deleteEmployee }
        }
      ],
      pageSource: {
        total: 0,
        pages: 1,
        page: 1,
        size: 10,
        handlePageChange: this.pageChange
      },
      //search params
      queryStr: "",
      //detail page
      genders: [],
      sysDeps: {},
      sysRoles: {},
      //validator
      validStaff: new this.validator({
        data: this.getValidator(),
        handle: this.handleValidChange
      })
    };
  },
  mounted() {
    // this.getStaffs(1, 10);
    this.getGenders();
    this.getSysDeps();
    this.getSysRoles();
  },
  methods: {
    getGenders() {
      var self = this;
      self.myHttp(
        this.myRequest.getEnumsByType(this.myUtils.EnumTypes.SexType),
        {
          successed: res => {
            self.genders = res.data;
          },
          failed: err => {
            self.message.error(err.data);
          }
        }
      );
    },
    getSysDeps() {
      var self = this;
      self.myHttp(self.myRequest.getSysUserOrg(), {
        successed: res => {
          self.sysDeps = self.myUtils.AddPropsToTree(res.data, [
            {
              rules: {
                levelNum: 1
              },
              props: [
                { name: "expended", value: true },
                { name: "disabled", value: true }
              ]
            }
          ]);
        },
        failde: err => {
          self.message.error(err.data);
        }
      });
    },
    getSysRoles() {
      var self = this;
      self.myHttp(self.myRequest.getOrgRolesNotContainVip(), {
        successed: res => {
          self.sysRoles = self.myUtils.AddPropsToTree(res.data, [
            {
              rules: {
                levelNum: 1
              },
              props: [
                { name: "expended", value: true },
                { name: "disabled", value: true }
              ]
            }
          ]);
        },
        failde: err => {
          self.message.error(err.data);
        }
      });
    },
    pageChange(indx, size) {
      this.pageSource.page = indx;
      this.pageSource.size = size;
      this.getStaffs();
    },
    getStaffs() {
      var self = this;
      self.myHttp(
        self.myRequest.getEmployeeList({
          departmentId: self.selected.id,
          type: self.selected.typeNum,
          orgId: 0,
          page: {
            pageIndex: self.pageSource.page,
            pageSize: self.pageSource.size
          },
          keys: self.queryStr
        }),
        {
          beforeRequest: () => {
            self.dataLoading = true;
          },
          afterSuccessed: () => {
            self.dataLoading = false;
          },
          successed: res => {
            // self.message.success("员工数据查询完成!");
            self.datasource = res.data.list;
          },
          failed: err => {
            self.message.error(err.data);
          }
        }
      );
    },
    addEmployee() {
      this.detail = {
        show: true,
        title: "添加员工"
      };
    },
    editEmployee(row) {
      // employeeId
      var self = this;
      self.myHttp(self.myRequest.getEmployeeInfo(row.employeeId), {
        successed: res => {
          self.validStaff.set(res.data);
          self.detail = {
            title: "编辑",
            show: true
          };
        },
        failed: err => {
          self.message.error(err.data);
        }
      });
    },
    deleteEmployee(row) {
      var self = this;
      self.modal.warn({
        content: "确实删除该员工?",
        handleOk: () => {
          self.myHttp(self.myRequest.deleteEmployee(row.employeeId), {
            successed: res => {
              self.message.success("成功删除一名员工!");
              self.getStaffs();
            },
            failed: err => {
              self.message.error(er.data);
            }
          });
        }
      });
    },
    cancel() {
      var self = this;
      self.modal.warn({
        content: "是否保存编辑?",
        handleOk: () => {
          self.submit();
        },
        handleClose: () => {
          self.detail.show = false;
        }
      });
    },
    addDepAndRole() {
      this.validStaff.departmentIds.value.push({
        id: 0,
        name: "",
        extendField: ""
      });
    },
    removeDepAndRole(pr) {
      var index = this.validStaff.departmentIds.value.indexOf(pr);
      this.validStaff.departmentIds.value.splice(index, 1);
    },
    //validator
    getValidator() {
      var valid = {
        employeeId: {
          value: 0
        },
        name: {
          value: "",
          rules: {
            required: true,
            maxlength: 20
          }
        },
        gender: {
          key: "sex",
          value: 0,
          rules: {
            required: true
          }
        },
        birthday: {
          value: "",
          rules: {
            date: true
          }
        },
        email: {
          value: "",
          rules: {
            email: true,
            maxlength: 20
          }
        },
        idCardNum: {
          value: "",
          rules: {
            required: true,
            length: 18
          }
        },
        tel: {
          value: "",
          rules: {
            required: true,
            length: 11
          }
        },
        originalDistrictCode: {
          value: 0,
          rules: {
            required: true
          }
        },
        originalAddress: {
          value: "",
          rules: {
            required: true,
            maxlength: 50
          }
        },
        temporaryDistrictCode: {
          value: 0,
          rules: {
            required: true
          }
        },
        temporaryAddress: {
          value: "",
          rules: {
            required: true,
            maxlength: 50
          }
        },
        urgentContactName: {
          vlaue: "",
          rules: {
            required: true
          }
        },
        urgentContactTel: {
          value: "",
          rules: {
            required: true,
            length: 11
          }
        },
        status: {
          value: "",
          rules: {
            required: true,
            maxlength: 10
          }
        },
        roleIds: {
          value: [],
          rules: { required: true },
          data: {
            key: "roles",
            value: [],
            fields: new Array("id", "name")
          }
        },
        departmentIds: {
          value: [
            {
              id: 0,
              name: "",
              extendField: ""
            }
          ],
          rules: { required: true },
          data: {
            key: "departments",
            value: [],
            fields: new Array("id", "name", "extendField")
          }
        },
        remark: {
          value: ""
        }
      };
      return valid;
    },
    handleValidChange(key, val) {
      this.validStaff.change(key, val);
    },
    submit() {
      var self = this;
      var submitData;
      if (this.validStaff.check()) {
        submitData = this.validStaff.get();
      }

      if (!submitData) {
        this.message.error("请完善编辑后再保存!");
        return;
      }
      self.modal.info({
        content: "确定保存编辑?",
        handleOk: () => {
          //
          var loadInstance = this.modal.loading({ content: "信息保存中..." });
          self.myHttp(self.myRequest.saveEmployee(submitData), {
            successed: res => {
              loadInstance.modal.close();
              if (res.data) {
                self.getStaffs();
                this.detail.show = false;
                self.message.success("保存成功!");
              } else {
                self.message.error("保存失败!");
              }
            },
            failed: err => {
              loadInstance.modal.close();
              self.message.error(err.data);
            }
          });
        }
      });
    }
  },
  watch: {
    selected(nval, oval) {
      //重新请求数据
      this.getStaffs();
    }
  }
};
</script>

<style>

</style>
