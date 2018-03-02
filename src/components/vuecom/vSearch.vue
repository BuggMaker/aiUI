<template>
  <!-- <span> -->
  <div class="search" v-on:keydown.enter="query" v-on:click.stop="()=>{return 0}" v-bind:title="placeholder">
    <input class="search-value" v-on:change="change" type="text" v-bind:placeholder="placeholder" v-model="queryStr" />
    <v-icon v-show="queryStr.length>0" class="search-btn close" name="close error" v-bind:scale="0.6" title="清空" v-on:click="clear"></v-icon>
    <v-icon name="search search-btn query" v-bind:scale="0.8" title="查询" v-on:click="query"></v-icon>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "请输入查询内容"
    },
    lazy: true
  },
  data() {
    return {
      queryStr: "",
      timerId: -1
    };
  },
  methods: {
    clear: function() {
      this.queryStr = "";
    },
    //查询钩子
    query() {
      this.$emit("query", this.queryStr);
    },
    change() {
      if (this.lazy) {
        this.query();
      }
    }
  },
  watch: {
    queryStr(nval, oval) {
      if (!this.lazy) {
        var self = this;
        this.$emit("input", nval);
        self.query();
      }
    }
  }
};
</script>

<style>
.search {
  position: relative;
  display: inline-flex;
  border: 1px solid lightgray;
  /* border-radius: 5px; */
  overflow: hidden;
}

.search:hover {
  border: 1px solid dodgerblue;
}

.search-value {
  padding: 0 10px;
  /* padding-right: 35px; */
  font-size: 15px;
  width: 100%;
}

.search-btn {
  /* width: 30px;
    height: 30px; */
  cursor: pointer;
}

.search-btn.query:hover {
  /* padding: 5px; */
  color: white;
  background-color: dodgerblue;
}

.search-btn.close {
  position: absolute;
  right: 30px;
  /* margin: 10px; */
  /* width: 10px;
    height: 10px; */
  border-radius: 50%;
  /* opacity: 0.5; */
}

.search-btn.close:hover {
  color: white;
  background-color: orangered;
}

.search-btn:hover {
  cursor: pointer;
  opacity: 1;
}
</style>
