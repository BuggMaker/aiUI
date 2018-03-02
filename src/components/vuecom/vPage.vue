<template>
  <!-- 页码 -->
  <div class="v-page">
    <div class="v-page-size ">
      <label>每页</label>
      <select v-model="size " v-on:change="sizeChange ">
        <option v-for="(n,key) in sizes" v-bind:key="key">{{n}}</option>
      </select>      
      <label>条</label>
    </div>
    <label v-if="clientWidth >= 400">共{{total}}条记录,显示第{{(page-1) *size+1}} 至 {{page*size>total?total: page*size}}条 </label>
    <div class="v-page-num">
      <ul class="v-page-option">
        <li class="v-page-li left" v-on:click="toFirstPage" title="首页">«
        </li>
        <li class="v-page-li" v-on:click="downPage" title="下一页">
          ‹</li>
        <template v-if="pages>=5">
          <li class="v-page-li" v-for="(p,k) in 5" :key="k" v-bind:class="{active:page==pageLeft+p}" v-on:click="selectPage(pageLeft+p)">
            <span>{{pageLeft+p}}</span>
          </li>
        </template>
        <template v-else>
          <li class="v-page-li" v-for="(p,k) in pages" :key="k" v-bind:class="{active:page==pageLeft+p}" v-on:click="selectPage(pageLeft+p)">
            <span>{{pageLeft+p}}</span>
          </li>
        </template>
        <li class="v-page-li" v-on:click="upPage" title="下一页">›</li>
        <li class="v-page-li right" v-on:click="toLastPage" title="末页">»</li>
      </ul>
    </div>
  </div>
</template>

<script>
//共有多少页
//当前第几页
//每页记录数
//共多少条记录
export default {
  props: {
    source: Object
  },
  data() {
    return {
      total: 0, //总记录数
      size: 10, //每页记录数
      pages: 1, //共多少页
      page: 1, //当前页码
      handlePageChange: () => {},
      sizes: [10, 20, 50],
      pageLeft: 0,
      clientWidth: 500
    };
  },
  mounted() {
    this.init();
    this.clientWidth = this.$el.clientWidth;

    this.$watch("source", this.init, { deep: true });
  },
  methods: {
    init() {
      var _p = Object.assign({}, this.source);
      Object.keys(_p).forEach(key => {
        this[key] = _p[key];
      });
      this.pages = Math.ceil(this.total / this.size);
    },
    selectPage: function(p) {
      this.page = p;
    },
    upPage: function() {
      if (this.page < this.pages) this.page++;

      if (this.page > 3 && this.page <= this.pages - 2) {
        this.pageLeft = this.page - 3;
      }
    },
    downPage: function() {
      if (this.page > 1) this.page--;
      if (this.page <= this.pages - 2 && this.page >= 3) {
        this.pageLeft = this.page - 3;
      }
    },
    toFirstPage: function() {
      this.page = 1;
      this.pageLeft = 0;
    },
    toLastPage: function() {
      this.page = this.pages;
      if (this.pages >= 5) this.pageLeft = this.pages - 5;
    },
    sizeChange: function() {
      this.pages = Math.ceil(this.total / this.size);
      this.page = 1;
      this.pageLeft = 0;
      //重新发送get请求
    }
  },
  watch: {
    page(nval, oval) {
      this.handlePageChange(nval, this.size);
    },
    total(nval, oval) {
      // this.message.info("Totla " + nval);
    },
    source(nval, oval) {
      console.log(nval);
    },
    pageCount(nval, oval) {
      console.log(nval);
    }
  }
};
</script>

<style>
.v-page {
  position: relative;
  padding: 5px;
  line-height: 25px;
  text-align: center;
  /* border: 1px solid lightgray; */
  background-color: white;
  overflow: hidden;
  color: gray;
}
.v-page-num {
  float: right;
}

.v-page-option {
  height: 100%;
  margin: 0;
  padding: 0;
}

.v-page-li {
  list-style: none;
  border: 1px solid lightgray;
  min-width: 25px;
  text-align: center;
  user-select: none;
  float: left;
}

.v-page-li.active {
  background-color: dodgerblue;
  color: white;
}

.v-page-li:hover {
  border: 1px solid dodgerblue;
  cursor: pointer;
}

.v-page-li.left {
  min-width: 30px;
  border-radius: 10px 0px 0px 10px;
}

.v-page-li.right {
  min-width: 30px;
  border-radius: 0px 10px 10px 0px;
}

.v-page-size {
  float: left;
}

.v-page-size select {
  border-radius: 5px;
  border: 1px solid lightgray;
}
</style>
