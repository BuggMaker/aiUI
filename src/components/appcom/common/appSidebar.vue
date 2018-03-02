<template>
  <v-sidebar1 v-bind:datas="source1" v-model="activeItem" v-on:activeChange="changePage"></v-sidebar1>
</template>
<script>
import vSidebar from "../../vuecom/vSidebar.vue";
import vSidebar1 from "../../vuecom/vSidebar1.vue";
export default {
  components: {
    "v-sidebar": vSidebar,
    "v-sidebar1": vSidebar1
  },
  props: {
    activemenu: {
      type: String,
      default: "首页"
    }
  },
  data() {
    return {
      source1: [
        {
          url_icon: "http://imgs.weijipet.com/img/home.png",
          url: "../Home/Index",
          name: "首页"
        },
        {
          url_icon: "http://imgs.weijipet.com/img/phone.png",
          url: "../Register/Index",
          name: "预约挂号"
        },
        {
          url_icon: "http://imgs.weijipet.com/img/hospital.png",
          url: "",
          name: "门诊部"
        },
        {
          url_icon: "http://imgs.weijipet.com/img/storage.png",
          url: "../Storage/Index",
          name: "仓库中心"
        },
        {
          url_icon: "http://imgs.weijipet.com/img/statistics.png",
          url: "",
          name: "财务部"
        },
        {
          url_icon: "http://imgs.weijipet.com/img/settings.png",
          url: "../Foundation/Index",
          name: "基础管理"
        },
        {
          url_icon: "http://imgs.weijipet.com/img/admin.png",
          url: "../Staff/Index",
          name: "人员管理"
        },
        {
          url_icon: "http://imgs.weijipet.com/img/set.png",
          url: "../Management/Index",
          name: "分支管理"
        }
      ],
      activeItem: {}
    };
  },
  mounted() {
    //根据title获取当前激活的menu
    this.activeItem = this.getPageByName(this.activemenu);
  },
  methods: {
    //相应menuchange事件
    changePage(item) {
      if (item.name == this.activemenu) return;
      var self = this;
      // this.modal.info({
      //   title: "跳转",
      //   content: "是否跳转到" + item.name + "?",
      //   handleOk: () => {
          window.location.href = item.url;
      //   }
      // });
    },
    getPageByName(name) {
      for (var i = 0; i < this.source1.length; i++) {
        if (this.source1[i].name == name) {
          return this.source1[i];
        }
      }
    }
  },
  watch: {}
};
</script>
<style>

</style>