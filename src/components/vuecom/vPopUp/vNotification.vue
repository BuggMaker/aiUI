<template>
    <div class="vnotification">
<!-- <transition-group name="fade-top">   -->
      <v-notice v-for="(n,k) in notices" 
      v-bind:key="k"     
      v-bind:interval="n.interval"
      v-bind:type="n.type"
      v-bind:msg="n.msg"
      v-bind:name="n.name"
      v-bind:title='n.name'
      v-model="n.value"
      ></v-notice>
      <P v-for="(n,k) in notices" :key="k">
        {{n.name}}
      </P>
<!-- </transition-group> -->
  </div>
</template>

<script>
import vNotice from "./vNotice.vue";
export default {
  components: {
    "v-notice": vNotice
  },
  props: {
    top: [Number, String]
  },
  data() {
    return {
      notices: [],
      timerId: -1
    };
  },
  methods: {
    add(notice) {
      let _notice = Object.assign(
        {
          value: true,
          interval: 3,
          msg: "这是一条消息",
          type: "info"
        },
        notice
      );
      this.notices.push(_notice);
    },
    close() {
     
      var self = this;

      for (var i = 0; i < self.notices.length; i++) {
        if (self.notices[i].value) {
          setTimeout(() => {
            self.close();
          });
          return;
        }
      }

      // console.log("prepare clear");
      clearTimeout(self.timerId);
      self.timerId = setTimeout(() => {
        // console.log("clear");
        self.notices = [];
      }, 3 * 1000);
    }
  }
};
</script>

<style>
.vnotification {
  position: absolute;
  display: inline-block;
  top: 150px;
  /* height: 300px; */
  width: 100%;
  overflow: hidden;
  /* padding: 10px; */
}
.v-notice {
  display: flex;
  margin-top: 5px;
}
</style>
