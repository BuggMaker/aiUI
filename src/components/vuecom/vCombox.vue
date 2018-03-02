<template>
     <span class="combox" v-on:click.stop="show_items" > <!--v-bind:style="{width:width}" -->
         <div class="combox-head" ><!--v-bind:style="{width:width+'px'}" -->
            <span style="margin:5px 10px;display:inline-block;">{{items.length>=1&&index>=0?items[index].name:'请选择'}}</span>
            <!-- <span class="combox-arrow" v-bind:class="show?'up':'down'"></span> -->
            <v-icon style="position:absolute;right:0px;top:0px;" :name="show?'up':'down'" :scale='0.4'></v-icon>
        </div>
        <transition name="combox-fade-top">
            <div v-show="show" class="combox-items scroll">
                <ul>
                    <li v-for="(item,k) in items" v-bind:key="k" class="combox-item" v-bind:class="{active:item.id == index}" v-on:click.stop="item_click(item)">{{item.name}}</li>
                </ul>
            </div>
        </transition>
    </span>
</template>

<script>
//自定义组件通过v-model实现数据双向绑定
//1 最好在组件根节点绑定 value,即v-bind:value="value"
//2 props中添加'value'字段 (命名必须是value)
//3 在data()中添加与之对应的字段(命名自定义,如tempValue),可将value赋值给该字段,也可赋默认值
//4 最后通过watch监视value和tempValue
//  当value值发生改变时赋值给tempValue,当tempValue值改变时触发input函数,并将新值作为参数转回
export default {
  props: {
    //选中项
    value: {
      type: Number,
      default: 0
    }, //步骤1
    groups: Array,
    //下拉单项目
    items: Array,
    //宽度px
    width: {
      type: String,
      default: "100%"
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: 0, //步骤2
      show: false
    };
  },
  mounted() {
    // this.items.splice(0,0,'请选择');
    this.index = this.value;
  },
  updated() {
    var self = this;
    if (document.onclick) document.onclick = null;
    document.onclick = function(e) {
      if (self.show) self.show = false;
    };
  },
  methods: {
    item_click(item) {
      this.index = item.id;
      this.show = false;
    },
    show_items() {
      if (!this.readonly) this.show = !this.show;
    }
  },
  watch: {
    index(val) {
      this.$emit("input", val); //步骤3
    },
    value(val, oval) {
      this.index = val;
    },
    items(nval){
      console.log(nval);
    }
  }
};
</script>

<style>
.combox {
  position: relative;
  display: inline-block;
  /* color: white; */
  background-color: white;
  cursor: pointer;
  min-width: 50px;
  padding-right: 30px;
  border: 1px solid lightgray;
  box-sizing: border-box;
}

.combox-arrow {
  position: absolute;
  right: 10px;
  display: inline-block;
  width: 0;
  height: 0;
}

.combox-head {
  overflow: hidden;
  height: 30px;
}

.combox-arrow.down {
  margin: 0px -3px 0 0;
  border-top: 6px solid black;
  border-right: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid transparent;
  top: 50%;
}

.combox-arrow.up {
  margin: 0px -3px 0 0;
  border-bottom: 6px solid black;
  border-right: 6px solid transparent;
  border-top: 6px solid transparent;
  border-left: 6px solid transparent;
  bottom: 50%;
}

.combox-items {
  position: absolute;
  margin-top: 2px;
  list-style: none;
  width: 100%;
  max-height: 200px;
  background-color: white;
  border: 1px solid lightgray;
  z-index: 100;
}

.combox-item {
  box-sizing: border-box;
  padding: 5px;
  height: 30px;
  overflow: hidden;
}

.combox-item.active,
.combox-item:hover {
  background-color: rgb(30, 170, 180);
  color: white;
}

.combox-fade-top-enter,
.combox-fade-top-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.combox-fade-top-enter-active,
.combox-fade-top-leave-active {
  transition: all 0.5s ease;
}
</style>
