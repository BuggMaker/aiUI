<template>
  <div v-if="show" class="full">
    <div v-if='!loading' class="v-detail box-vertical full">
      <div class="v-detail-head">
        <span class="v-detail-back back">
          <!-- <input slot="title" type="button" value="返回" class="v-detail-back back" v-on:click="back" /> -->
          <span class="v-detail-back-btn back" v-on:click="back">
            返回
          </span>
        </span>
        <label class="clear">{{title}}</label>
        <slot name="head"></slot>
      </div>
      <div class="v-detail-body box1 scroll">
        <slot name="body"></slot>
        <slot></slot>
      </div>
      <div class="v-detail-foot">
        <slot name="foot"></slot>
      </div>
    </div>
    <v-modal v-model='loading' :source='{loading:true}'></v-modal>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "详情"
    },
    loading: Boolean
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    back: function() {
      this.$emit("back");
    }
  },
  watch: {
    value(nval) {
      this.show = nval;
    },
    show(nval) {
      this.$emit("input", nval);
    }
  }
};
</script>

<style>
.v-detail {
  border: 1px solid lightgray;
  background-color: white;
  line-height: 1.5;
}

.v-detail-head {
  position: relative;
  font-size: 20px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding-right: 20px;
  border-bottom: 1px solid lightgray;
}

.v-detail-back {
  cursor: pointer;
  float: left;
  font-size: 15px;
  line-height: 18px;
  border: 1px solid rgb(30, 180, 170);
  margin: 5px;
}

.v-detail-back-btn {
  padding: 5px;
  float: left;
  padding-left: 35px;
  background: url(http://imgs.weijipet.com/img/back.png) 5px 5px no-repeat;
  background-size: 20px 20px;
}

.v-detail-back-btn:hover {
  padding: 5px;
  float: left;
  padding-left: 35px;
  background: url(http://imgs.weijipet.com/img/back1.png) 5px 5px no-repeat;
  background-size: 20px 20px;
}

.v-detail-body {
  position: relative;
  box-sizing: border-box;
}

.v-detail-foot {
  position: relative;
  box-sizing: border-box;
  text-align: center;
  border-top: 1px solid lightgray;
}
</style>
