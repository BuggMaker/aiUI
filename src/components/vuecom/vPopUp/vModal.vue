<template>
  <div class="vmodal">    
    <transition name="fade-in">
      <div v-if="visableMask" class="vmodal-mask"></div>
    </transition>  
    <span class="vmodal-form">
            <transition name="zoom-in">  
               <div v-if="visable&&!loading" class="vmodal-form-in">
                 <div  v-if="!type">
                    <div v-if="title" class="vmodal-head header">
                            <span class="vmodal-title">
                                <slot name="title"></slot>
                                {{title}}
                            </span>
                            <slot name="head"></slot>
                            <span v-if="showClose" class="vmodal-close" v-on:click="cancel">×</span>
                        </div>
                        <div class="vmodal-body0 scroll" v-bind:style="bodyStyle">
                            <slot name="body"></slot>
                            <slot></slot>
                        </div>
                        <div class="vmodal-foot">
                            <slot name="foot"></slot>
                        </div>
                 </div>
                 <div v-else>
                      <div v-if="title" class="vmodal-head header">
                          <span class="vmodal-title">
                                <slot name="title"></slot>
                                {{title}}
                          </span>
                          <slot name="head"></slot>
                          <span class="vmodal-close" v-on:click="cancel">×</span>
                      </div>
                      <div class="vmodal-body1 scroll">
                          <v-icon v-if="icon" v-bind:name="icon" v-bind:scale='1'></v-icon>
                          <span v-if="content" class="vmodal-body-content" v-html="content"></span>
                      </div>
                      <div class="vmodal-foot">
                         <input type="button" class="btn cancel" v-on:click="cancel" value="取消"/>
                         <input type="button" class="btn ok" v-on:click="ok" value="确定"/>
                      </div>
                 </div>
               </div>               
              <div v-else-if="visable&&loading">
                 <v-loading></v-loading>
              </div>
            </transition>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    //是否显示
    value: Boolean,
    source: Object
  },
  data() {
    return {
      visable: false,
      visableMask: false,
      type: 0, //0 标签模式; 1 代码模式
      //form source
      title: "",
      icon: "",
      content: "",
      handleOk: () => {},
      handleCancel: () => {},
      handleClose: () => {},
      autoClose: true,
      showClose: false,
      loading: false
    };
  },
  mounted() {
    this.init();
    this.$watch("source", this.init, { deep: true });
  },
  computed: {
    bodyStyle() {
      let _style = {
        maxHeight: "400px",
        padding:'10px 5px 5px 5px'
      };
      _style.maxHeight = window.innerHeight * 0.8 + "px";

      if (this.loading) {
        _style.padding = "5px";
      }

      return _style;
    }
  },
  methods: {
    init() {
      //标签模式 属性赋值
      let _props = Object.assign(this.$data, this.source);
      Object.keys(_props).forEach(key => {
        this[key] = _props[key];
      }, this);
      if (this.value) this.visable = this.value;
    },
    ok() {
      if (this.autoClose) this.close();
      if (this.handleOk) this.handleOk();
      this.$emit("ok");
    },
    cancel() {
      if (this.autoClose) this.close();
      else if (this.handleClose) this.handleClose();
      if (this.handleCancel) this.handleCancel();
      this.$emit("cancel");
    },
    show(config) {
      //代码模式
      let _props = Object.assign(
        {
          visable: true,
          type: 1
        },
        config
      );
      //属性赋值
      Object.keys(_props).forEach(key => {
        this[key] = _props[key];
      }, this);
      if (this.$el) document.body.appendChild(this.$el);
    },
    close() {
      this.visable = false;
      if (this.handleClose) this.handleClose();
    }
  },
  watch: {
    value(nval, oval) {
      this.visable = nval;
    },
    visable(nval, oval) {
      this.$emit("input", nval);
      //添加 销毁弹窗
      if (this.type == 1) {
        if (!nval && this.$el) {
          this.visableMask = false;
          this.modal.destory(this);
        } else if (nval && this.$el) {
          this.modal.add(this);
          //显示 遮罩层
          this.visableMask = !this.modal.hasMask(this.loading);
        }
      } else {
        if (this.type == 0) {
          if (!nval && this.$el) {
            this.visableMask = false;
            this.visable = false;
          } else if (nval && this.$el) {
            this.visableMask = true;
            this.visable = true;
          }
        }
      }
    }
  }
};
</script>

<style>
.vmodal {
  z-index: 999;
}
.vmodal-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(200, 200, 200, 0.3);
}
.vmodal-form {
  position: absolute;
  /* margin: auto; */
  top: 50%;
  left: 50%;
  max-width: 80%;
  /* min-width: 200px; */
  transform: translate(-50%, -50%);
  border-radius: 5px;
  /* box-shadow: 1px 1px 20px rgb(80, 80, 80); */
  /* overflow: hidden; */
}
.vmodal-form-in {
  position: relative;
  box-shadow: 1px 1px 20px rgb(80, 80, 80);
  /* border: 1px solid lightgray; */
}
.vmodal-form-in:hover {
  box-shadow: 1px 1px 20px rgb(80, 80, 80);
}/* 
.vmodal-head {
  position: relative;
  height: 40px;
  color: white;
  background-color: rgba(30, 180, 170, 0.95);
  border-top: 5px solid rgba(30, 180, 170, 0.95); 
} */
.vmodal-title {
  height: 40px;
  line-height: 40px;
  padding: 5px 10px;
  font-size: 20px;
  /* border-bottom: 1px solid lightgray; */
}
.vmodal-close {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 0;
  top: 0;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
  color: white;
  cursor: pointer;
  user-select: none;
}
.vmodal-close:hover {
  background-color: orange;
  font-size: 25px;
}

.vmodal-body0 {
  position:relative;
  /* padding: 20px 30px; */
  max-height: 80%;
  color: #333;
  background-color: white;
  /* display: flex; */
  line-height: 1.5;
}
.vmodal-body1 {
  position:relative;
  padding: 20px 30px;
  max-height: 80%;
  color: #333;
  background-color: white;
  display: flex;
  line-height: 1.5;
}
.vmodal-body-content {
  margin-left: 15px;
  font-size: 15px;  
}
.vmodal-foot {
  /* padding: 5px 10px; */
  border-top: 1px solid lightgray;
  text-align: center;
  background-color: white;
}
</style>
