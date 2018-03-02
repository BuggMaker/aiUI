<template>
  <div class="full">
     <transition name='fade-left'>
    <v-tree-list v-show="!editting" v-bind:title="'机构部门'" v-bind:nodes="orgNodes" v-bind:editable="true" v-bind:editType='1' v-model="selected" v-bind:addProp="addProp">     
    </v-tree-list>
    </transition>
    <transition name='fade-right'>
      <v-detail v-model="editting" v-on:back="back">
       <!-- 机构详情 -->
      <div v-if="orgdep" slot="body" class="full">
        <div class="setting-item">
          <label class="setting-item-title">机构名称</label>
          <div class="setting-item-content">
            <v-text v-model="validOrg.orgName.value" v-validate="validOrg.orgName"></v-text>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">机构类型</label>
          <div class="setting-item-content">
            <v-combox class="width-input" v-bind:items="orgTypes" v-model="validOrg.orgType.value"  v-validate='validOrg.orgType'></v-combox>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">负责人</label>
          <div class="setting-item-content">
            <v-group-drop-down  class="width-input" v-bind:items="employees" v-model="validOrg.principalId.value" v-bind:multiple="false" v-validate='validOrg.principalId'></v-group-drop-down>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">营业许可证号</label>
          <div class="setting-item-content">
            <v-text type="text" v-model="validOrg.businessNum.value" v-validate='validOrg.businessNum'></v-text>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">营业起始时间</label>
          <div class="setting-item-content">
            <v-combox v-bind:items="hours" width="50" v-model="validOrg.openTimeHour.value"></v-combox>
            <span style="padding:3px">时</span>
            <v-combox v-bind:items="minutes" width="50" v-model="validOrg.openTimeMinute.value"></v-combox>
            <span style="padding:3px">分</span>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">营业结束时间</label>
          <div class="setting-item-content">
            <v-combox v-bind:items="hours" width="50" v-model="validOrg.closeTimeHour.value"></v-combox>
            <span style="padding:3px">时</span>
            <v-combox v-bind:items="minutes" width="50" v-model="validOrg.closeTimeMinute.value"></v-combox>
            <span style="padding:3px">分</span>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">行政区划</label>
          <div class="setting-item-content">
            <v-address v-model="validOrg.districtCode.value"></v-address>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">详细地址</label>
          <div class="setting-item-content">
            <v-textarea   class="width-input" v-model="validOrg.address.value"></v-textarea>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">机构描述</label>
          <div class="setting-item-content">
            <v-textarea  class="width-input" v-model="validOrg.description.value" v-bind:rows="3">某某机构,主营...</v-textarea>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">机构图片</label>
          <div class="setting-item-content">
            图片            
          </div>
        </div>       
      </div>
      <!-- 部门详情 -->
      <div v-if="!orgdep" slot="body" class="full">
         <div class="setting-item">
          <label class="setting-item-title">所属机构</label>
          <div class="setting-item-content">
            <v-text v-bind:txtModel="validDep.orgId.data.value"></v-text>
          </div>
        </div> 
        <div class="setting-item">
          <label class="setting-item-title">上级部门</label>
          <div class="setting-item-content">
           <v-tree-drop-down v-bind:txtModel="validDep.parentId.data.value"></v-tree-drop-down>     
          </div>
        </div>     
        <div class="setting-item">
          <label class="setting-item-title">部门名称</label>
          <div class="setting-item-content">
            <v-text v-model="validDep.depName.value" v-validate="validDep.depName"></v-text>         
          </div>
        </div>  
        <div class="setting-item">
          <label class="setting-item-title">负责人</label>
          <div class="setting-item-content">
            <v-group-drop-down  class="width-input" v-bind:items="employees" v-model="validDep.principalId.value" v-bind:multiple="false" v-validate='validDep.principalId'></v-group-drop-down>
          </div>
        </div>
        <div class="setting-item">
          <label class="setting-item-title">部门描述</label>
          <div class="setting-item-content">
            <v-textarea  class="width-input" v-model="validDep.description.value" v-bind:rows="3"></v-textarea>
          </div>
        </div>
      </div>
      <input slot="foot" type="button" class="btn submit" value="提交编辑" v-on:click="submit" />
    </v-detail>
    </transition>
    <v-modal v-model="loading" v-bind:source="{type: 1,
        loading: true}"></v-modal>
  </div>
</template>

<script>
import vDetail from "../../vuecom/vDetail.vue";
export default {
  components: {
    "v-detail": vDetail
  },
  data() {
    return {
      //树结构
      orgNodes: null,
      //选中项
      selected: {},
      // 机构类型
      orgTypes: [], //[{ id: 0, name: '总部' }, { id: 1, name: '销售公司' }, { id: 2, name: '医院' }],
      //操作机构还是部门 true机构;false部门
      orgdep: true,
      //当前节点
      curNode: {},
      validOrg: new this.validator({ data: this.getValidator(true) }),
      // validOrgResult: undefined,
      validDep: new this.validator({ data: this.getValidator(false) }),
      // validDepResult: undefined,
      hours: (() => {
        var ms = [];
        for (var i = 0; i < 24; i++) {
          ms.push({
            id: i,
            name: i
          });
        }
        return ms;
      })(),
      minutes: (() => {
        var ms = [];
        for (var i = 0; i < 60; i += 5) {
          ms.push({
            id: i,
            name: i
          });
        }
        return ms;
      })(),
      //总部 编辑机构/添加机构/删除机构   添加详情?
      orgOptions1: [
        {
          name: "添加机构",
          css: "add",
          event: {
            base: true,
            fn: this.orgAdd
          }
        },
        {
          name: "编辑机构",
          css: "edit",
          event: {
            base: true,
            fn: this.orgEdit
          }
        },
        {
          name: "删除机构",
          css: "delete",
          event: {
            base: true,
            fn: this.orgDel
          }
        }
      ],
      //机构 编辑机构/添加部门/删除机构
      orgOptions2: [
        {
          name: "添加部门",
          css: "add",
          event: {
            base: true,
            fn: this.orgAdd
          }
        },
        {
          name: "编辑机构",
          css: "edit",
          event: {
            base: true,
            fn: this.orgEdit
          }
        },
        {
          name: "删除机构",
          css: "delete",
          event: {
            base: false,
            fn: this.orgDel
          }
        }
      ],
      //部门 编辑部门/删除部门
      orgOptions3: [
        {
          name: "编辑部门",
          css: "edit",
          event: {
            base: true,
            fn: this.orgEdit
          }
        },
        {
          name: "删除部门",
          css: "delete",
          event: {
            base: false,
            fn: this.orgDel
          }
        }
      ],
      //员工列表
      employees: [],
      //是否加载中
      loading: true,
      //是否在编辑
      editting: false
    };
  },
  mounted() {
    //获取所有机构设置
    this.getOrgs();
    this.getOrgTypes();
    this.getEmployees();
  },
  methods: {
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
    getEmployees() {
      var self = this;
      self.myHttp(self.myRequest.getAllEmployees(), {
        successed: res => {
          self.employees = res.data;
        },
        beforeRequest: () => {
          self.loading = true;
        },
        afterSuccessed: () => {
          self.loading = false;
        }
      });
    },
    getOrgs() {
      var self = this;
      this.myHttp(self.myRequest.getSysUserOrg(), {
        successed: res => {
          //添加其他属性
          self.orgNodes = self.myUtils.AddPropsToTree(res.data, self.addProp);

          if (self.orgNodes instanceof Array) {
            self.selected = self.orgNodes[0];
          } else {
            self.selected = self.orgNodes;
          }
        },
        beforeRequest: () => {
          self.loading = true;
        },
        afterSuccessed: () => {
          self.loading = false;
        },
        failed: err => {}
      });
    },
    orgEdit(val) {
      var self = this;
      if (val.typeNum == 3) {
        //部门
        //获取部门信息
        self.orgdep = false;
        self.myHttp(self.myRequest.getDepartDetailById(val.id), {
          beforeRequest: () => {
            self.loading = true;
          },
          successed: res => {
            self.validDep.set(res.data);
          },
          afterSuccessed: () => {
            self.loading = false;
          },
          failed: err => {
            console.log(err);
          }
        });
      } else {
        //获取机构信息
        self.orgdep = true;
        self.myHttp(self.myRequest.getOrgDetailById(val.id), {
          successed: res => {
            self.validOrg.set(res.data);
          },
          beforeRequest: () => {
            self.loading = true;
          },
          afterSuccessed: () => {
            self.loading = false;
          },
          failed: err => {}
        });
      }
      self.editting = true;
    },
    orgAdd(val) {
      var self = this;
      //添加机构
      if (val.typeNum == 0) {
        this.validOrg.restore();
        this.orgdep = true;
      } else {
        //添加部门
        this.validDep.restore();

        this.validDep.orgId.value = val.id;
        this.validDep.orgId.data.value = val;
        this.orgdep = false;
      }
      this.editting = true;
    },
    orgDel(val) {
      var self = this;
      this.modal.warn({
        content: "确定删除该机构或部门?",
        handleOk: () => {
          self.myHttp(self.myRequest.deleteOrgById(val.id), {
            successed: res => {
              if (res.data == true) {
                this.message.success("删除成功!");
                self.getSysUserOrg();
              }
            }
          });
        }
      });
    },
    //validator
    getValidator(org) {
      if (org) {
        return {
          orgId: {
            key: "id",
            value: 0
          },
          orgName: {
            key: "name",
            value: "",
            rules: {
              required: true,
              maxlength: 20
            },
            handle: this.handleValidate
          },
          orgType: {
            key: "type",
            value: 0,
            rules: {
              required: true,
              selected: true
            },
            handle: this.handleValidate
          },
          principalId: {
            value: 0,
            data: {
              key: "principal",
              value: {
                id: 0,
                name: ""
              }
            }
          },
          businessNum: {
            value: "",
            rules: {
              required: true,
              length: 15
            },
            handle: this.handleValidate
          },
          openTimeHour: {
            value: 0
          },
          openTimeMinute: {
            value: 0
          },
          closeTimeHour: {
            value: 0
          },
          closeTimeMinute: {
            value: 0
          },
          districtCode: {
            value: 0
          },
          address: {
            value: ""
          },
          description: {
            value: ""
          },
          images: {
            value: []
          }
        };
      } else {
        return {
          depId: {
            key: "id",
            value: 0
          },
          orgId: {
            value: 0,
            data: {
              key: "org",
              value: {
                id: 0,
                name: ""
              }
            }
          },
          parentId: {
            value: 0,
            data: {
              key: "parent",
              value: {
                id: 0,
                name: ""
              }
            }
          },
          depName: {
            key: "name",
            value: "",
            rules: {
              required: true
            },
            handle: this.handleValidate
          },
          principalId: {
            value: 0,
            data: {
              key: "principal",
              value: {
                id: 0,
                name: ""
              }
            }
          },
          description: {
            value: ""
          }
        };
      }
    },
    handleValidate(key, val) {
      if (this.orgdep) {
        this.validOrg.change(key, val);
      } else {
        this.validDep.change(key, val);
      }
    },
    submit() {
      var self = this;
      //判断数据是否通过验证
      var submitData;
      if (self.orgdep) {
        // //机构
        if (self.validOrg.check()) {
          submitData = self.validOrg.get();
        }
      } else {
        // //部门
        if (self.validDep.check()) {
          submitData = self.validDep.get();
        }
      }

      if (!submitData) {
        this.message.error("请完善编辑后再保存!");
        return;
      }

      self.modal.info({
        content: "确定保存编辑?",
        handleOk: () => {
          //机构信息
          if (self.orgdep) {
            //更新或者创建机构;id>0更新 id<0创建
            self.myHttp(self.myRequest.saveOrg(submitData), {
              beforeRequest: () => {
                self.loading = true;
              },
              afterSuccessed: () => {
                self.loading = false;
              },
              successed: res => {
                //刷新机构树
                self.getOrgs();
                self.message.success("保存成功!");
                self.editting = false;
              }
            });
          } else {
            //更新或者创建部门;id>0更新 id<0创建
            self.myHttp(self.myRequest.saveDepart(submitData), {
              beforeRequest: () => {
                self.loading = true;
              },
              afterSuccessed: () => {
                self.loading = false;
              },
              successed: res => {
                //刷新机构树
                self.getOrgs();
                self.message.success("保存成功!");
                self.editting = false;
              }
            });
          }
        }
      });
    },
    //根据不同层级 添加不同操作属性
    addProp(node) {
      switch (node.typeNum) {
        case 0:
          node.options = this.orgOptions1;
          break;
        case 1:
        case 2:
          node.options = this.orgOptions2;
          break;
        case 3:
          node.options = this.orgOptions3;
          break;
      }
      node.selected = false;
      if (node.items) {
        node.items.forEach(function(subNode) {
          this.addProp(subNode);
        }, this);
      }
    },
    back() {
      var self = this;
      self.modal.warn({
        content: "是否保存更改?",
        handleOk: this.submit,
        handleClose: () => {
          self.editting = false;
        }
      });
    }
  },
  watch: {
    validDep(val) {
      console.log("changed");
    }
  }
};
</script>

<style>

</style>