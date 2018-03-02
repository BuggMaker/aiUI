<template>
    <transition name="fade-top">
            <div style="display:flex;" v-if="visable">               
                <span class="vNotice">
                  <!-- 图标 -->
                  <v-icon v-bind:name="type" v-bind:scale="0.75"></v-icon>
                <!-- 内容 -->
                <span class="vNotice-content">
                  {{msg}}
                </span> 
                <!-- 关闭按钮 -->
                <span class="vNotice-close" title="关闭" v-on:click="close">×</span>
                </span>
            </div>
    </transition>
</template>    
<script>
import vicon from "../../vuecom/vIcon.vue";
export default {
  components: {
    "v-icon": vicon
  },
  props: {
    value:Boolean,
    //停留时间
    interval: {
      type: Number,
      default: 3
    },
    //提示类别 info/success/warn/error/fail
    type: {
      type: String,
      default: "info common"
    },
    msg: {
      type: String,
      default: "提示"
    },
    name: String
  },
  mounted: function() {
    this.setCloseTimer();
  },
  data() {
    return {
      visable: true,
      timerId: -1
    };
  },
  methods: {
    close() {
      this.visable = false;
      this.$parent.close();
    },
    setCloseTimer() {
      var self = this;
      //计时
      self.timerId = setTimeout(function() {
        self.close();
        clearTimeout(self.timerId);
      }, self.interval * 1000);
    }
  },
  watch:{
    visable(nval,oval){
      this.$emit('input',nval);
    },
    value(nval,oval){
      this.visable = nval;
    }
  }
};
</script>

<style>
/*.vNotice*/

.vNotice {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-top: 10px;
  padding: 5px 20px 5px 10px;
  margin-bottom: 10px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  color: gray;
  border-radius: 3px;
  background-color: white;
  z-index: 999;
  box-shadow: 1px 1px 10px gray;
}

.vNotice-content {
  margin: 0 5px;
}

.vNotice-close {
  position: absolute;
  top: 0;
  display: inline-block;
  right: 0;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 0 5px 0 0;
}

.vNotice-close:hover {
  background-color: orangered;
  color: white;
}
</style>
    
    