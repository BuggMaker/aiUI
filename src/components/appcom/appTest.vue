<template>
  <div slot="body" class="test">
    <Row type="flex" justify="center" align="top">
      <Col span="24">
      <h1>iView组件</h1>
      </Col>
    </Row>
    <Row>
      <Col span="4">
      <Button type='primary'>Primary</Button>
      </Col>
      <Col span="4">
      <Button type='info'>Info</Button>
      </Col>
      <Col span="4">
      <Button type='success'>Success</Button>
      </Col>
      <Col span="4">
      <Icon style="font-size:20xp" type="checkmark" />
      </Col>
      <Col span="4">
      <i-switch size="large"></i-switch>
      </Col>
      <Col span="4">
      <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      </Col>
    </Row>
    <Row>
      <Col span="12">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="Name" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
          <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="City" prop="city">
          <Select v-model="formValidate.city" placeholder="Select your city">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="Date">
          <Row>
            <Col span="11">
            <FormItem prop="date">
              <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
            </FormItem>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
            <FormItem prop="time">
              <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Gender" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
          <CheckboxGroup v-model="formValidate.interest">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="Desc" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
          <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
    <input type="button" value="提示3s" class="btn common" v-on:click="btn_click" />
    <input taype="button" value="提示10s" class="btn common" v-on:click="btn0_click" />
    <input type="button" value="弹出一个对话框" class="btn common" v-on:click="btn1_click" />
    <input type="button" value="弹出嵌套对话框" class="btn common" v-on:click="btn2_click" />
    <input type="button" value="弹出自定义对话框" class="btn common" v-on:click="btn3_click" />
    <v-modal v-model="show" v-bind:source="modalSource">
      <div>pppppppppppppppppppppppppppppppppppppppppppppppp</div>
      <div>pppppppppppppppppppppppppppppppppppppppppppppppp</div>
      <div>pppppppppppppppppppppppppppppppppppppppppppppppp</div>
      <div>pppppppppppppppppppppppppppppppppppppppppppppppp</div>
      <span slot="foot">
        <input type="button" class="btn cancel" v-on:click="modalSource.handleCancel" value="取消" />
        <input type="button" class="btn edit" v-on:click="modalSource.handleOk" value="确定" />
      </span>
    </v-modal>
    <input type="button" value="弹出Loading..." class="btn common" v-on:click="btn4_click" />
    <v-page v-bind:source="pageSource"></v-page>
    <div>
      <input type="text" class="text edit" v-model.lazy="model1.value" v-validate="model1">
    </div>
    <div>
      <input type="text" class="text edit" v-model.lazy="model2.value" v-validate="model2">
    </div>
    <div>
      <v-text v-model.lazy="model4.value" v-validate="model4" :readonly='true'></v-text>
    </div>
    <div>
      <v-tree-drop-down class="width-input" v-bind:items="orgNodes" v-model="selectIndex"></v-tree-drop-down>
      {{selectIndex}}
    </div>
    <div>
      <v-button :name="['delete','edit']" :text="['删除','编辑']"></v-button>
      <v-button name='submit' text="提交编辑"></v-button>
      <v-number v-model='num' :step='5'></v-number>
    </div>
    <div>
      Checked:
      <span v-for='(node,k) in checkedNodes' :key='k'>{{node.name}}</span>
    </div>
    <div>
      Selected:
      <span v-for='(node,k) in selectedNodes' :key='k'>{{node.name+"/ "}}</span>
    </div>
    <div>
      <v-tree :nodes="orgNodes" :multiple='false' :showCheckbox='false' @checkChange='handleCheckChange' @selectChange='handleSelectChange'></v-tree>
    </div>
    <div style="height:300px" class="scroll">
      <v-drop-down-tree class='width-input' :nodes="orgNodes" :multiple='false' v-model="selectedItems"></v-drop-down-tree>
    </div>
    <div v-if="selectedItems instanceof Array">
      Selected:
      <span v-for='(node,k) in selectedItems' :key='k'>{{node+'/'}}</span>
    </div>
    <div v-else>
      Selected:
      <span>{{selectedItems}}</span>
    </div>
    <v-row :gutter='16' class="row">
      <v-col class="col" :span='6'>
        <div class="item">111</div>
      </v-col>
      <v-col class="col" :span='12'>
        <div class="item">222</div>
      </v-col>
      <v-col class="col" :span='6'>
        <div class="item">333</div>
      </v-col>
    </v-row>

  </div>
</template>
<script>
import vtree from "../vuecom/vTree/vTree.vue";
import vDropDownTree from "../vuecom/vDropDown/vDropDownTree.vue";
export default {
  components: {
    "v-tree": vtree,
    "v-drop-down-tree": vDropDownTree
  },
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "date",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      datetime1: "",
      show: false,
      id: 0,
      modalSource: {
        title: "测试",
        autoClose: "false",
        handleOk: () => {
          var self = this;
          let modal2 = this.modal.info({
            title: "确认",
            content: "确认提交编辑?",
            handleOk: () => {
              this.message.info("2 点击了确定!");
              self.show = false;
            },
            handleCancel: () => {
              this.message.info("2 点击了取消!");
            }
          });
        },
        handleCancel: () => {
          var self = this;
          let modal2 = this.modal.info({
            title: "取消",
            content: "确认取消编辑?",
            handleOk: () => {
              this.message.info("3 点击了确定!");
              self.show = false;
            },
            handleCancel: () => {
              this.message.info("3 点击了取消!");
            }
          });
        }
      },
      pageSource: {
        total: 80,
        limit: 15,
        pages: 9,
        page: 4,
        handlePageChange: (p, l) => {
          // this.message.info(`第${p}页,每页${l}条记录!`, 5);
        }
      },
      model1: {
        name: "",
        rules: {
          required: true,
          maxlength: 10
        },
        value: "",
        handle: this.handleValidator
      },
      model2: {
        name: "",
        rules: {
          required: true,
          maxlength: 10
        },
        value: "",
        handle: this.handleValidator
      },
      model3: {
        name: "",
        rules: {
          required: true,
          maxlength: 10
        },
        value: 0,
        handle: this.handleValidator
      },
      model4: {
        name: "",
        rules: {
          required: true,
          maxlength: 10,
          minlength: 5
        },
        value: 0,
        handle: this.handleValidator
      },
      picks: {},
      group: [
        {
          id: 0,
          name: "总部"
        },
        {
          id: 1,
          name: "销售公司"
        },
        {
          id: 2,
          name: "医院"
        },
        {
          id: 3,
          name: "总部3"
        },
        {
          id: 4,
          name: "销售公司4"
        },
        {
          id: 5,
          name: "医院5"
        }
      ],
      orgNodes: {},
      selectIndex: 7,
      enableEdit: false,
      num: 3,
      checkedNodes: [],
      selectedNodes: [],
      selectedItems: {
        id: 1,
        name: "采购"
      }
    };
  },
  mounted() {
    var self = this;
    self.getOrgs();
  },
  methods: {
    btn_click() {
      this.message.info("这是一个提示" + ++this.id);
    },
    btn0_click() {
      this.message.info("这是一个提示" + ++this.id, 10);
    },
    btn1_click() {
      this.modal.info({
        title: "确认",
        content: "点击取消/确认关闭对话框!",
        handleOk: () => {
          this.message.info("点击了确定!");
        },
        handleCancel: () => {
          this.message.info("点击了取消!");
        }
      });
    },
    btn2_click() {
      let modal1 = this.modal.info({
        title: "确认",
        content: "开始编辑...",
        autoClose: false,
        handleOk: () => {
          this.message.info("1 点击了确定!");
          let modal2 = this.modal.info({
            title: "确认",
            content: "确认提交编辑?",
            handleOk: () => {
              // this.message.info("2 点击了确定!");
              // modal1.modal.close();
              var loadingModal = this.modal.loading({
                content: "信息保存中...",
                handleClose: () => {
                  modal1.modal.close();
                }
              });
              setTimeout(() => {
                loadingModal.modal.close();
              }, 5000);
            },
            handleCancel: () => {
              this.message.info("2 点击了取消!");
            }
          });
        },
        handleCancel: () => {
          this.message.info("1 点击了取消!");
          let modal2 = this.modal.info({
            title: "取消",
            content: "确认取消编辑?",
            handleOk: () => {
              this.message.info("3 点击了确定!");
              modal1.modal.close();
            },
            handleCancel: () => {
              this.message.info("3 点击了取消!");
            }
          });
        }
      });
    },
    btn3_click() {
      this.show = true;
    },
    btn4_click() {
      let loadingModal = this.modal.loading({
        content: "Loading..."
      });
      setTimeout(() => {
        loadingModal.modal.close();
      }, 60 * 1000);
    },
    handleValidator(key, val) {
      this.picks[key] = val;
    },
    getOrgs() {
      var self = this;
      this.myHttp(self.myRequest.getAllOrg(), {
        successed: res => {
          //添加其他属性
          self.orgNodes = self.myUtils.AddPropsToTree(res.data, [
            {
              rules: {
                typeNum: 3
              },
              props: [{ name: "showCheckbox", value: true }]
            },
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
        failed: err => {}
      });
    },
    handleCheckChange(nodes) {
      this.checkedNodes = nodes;
    },
    handleSelectChange(nodes) {
      this.selectedNodes = nodes;
    },
    handleSubmit() {
      var self = this;
      var name = "Congratulations!";

      (() => {
        console.log(this);
      })();

      var func1 = function func1() {
        console.log(this);
        self.modal.success({
          content: name,
          handleOk: () => {
            console.log(this);
          }
        });
      };
      function func2() {
        var name = "sorry";
        console.log(this);
        self.modal.success({
          content: name,
          handleOk: () => {
            console.log(this);
          }
        });
        var ary = ["1", "2"];
        ary.forEach(() => {
          console.log(this);
        });
        ary.forEach(function() {
          console.log(this);
        });
      }

      // func1();
      func2();
    }
  }
};
</script>
<style>
.test {
  padding: 10px 20px;
}

.row {
  /* width: 600px; */
  /* height: 60px; */
}
.col {
  /* padding: 5px; */
  border: 1px solid lightgray;
}
.item {
  /* margin: 5px; */
  background-color: dodgerblue;
}
</style>