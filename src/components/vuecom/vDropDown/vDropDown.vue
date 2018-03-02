<template>
    <div class="v-drop-down" v-bind:style="{width:width+'px'}" v-bind:class="readonly?'readonly':''" v-on:click.stop="showItems">
        <div class="v-drop-down-head">
            <slot name="head"></slot>
            <!-- <span class="arrow" v-bind:class="show?'up':'down'"> </span> -->
            <!-- <span class="arrow down"></span> -->
            <v-icon style="position:absolute;right:0px;" :name="show?'up':'down'" :scale='0.4'></v-icon>
        </div>
        <transition name="dd-fade-top">
            <span v-show="show" class="v-drop-down-items scroll" v-bind:style="{marginTop:marginTop+'px',height:bodyHeight+'px'}">
                <v-search v-if="showQuery" class="margin-5"></v-search>
                <slot name="body" v-on:click="show= false"></slot>
            </span>
        </transition>
    </div>
</template>

<script>
import vSearch from "../vSearch.vue";
export default {
  components: {
    "v-search": vSearch
  },
  props: {
    width: String,
    readonly: {
      type: Boolean,
      default: false
    },
    showQuery: Boolean
  },
  data() {
    return {
      show: false,
      marginTop: 32,
      bodyHeight: 200
    };
  },
  methods: {
    showItems() {
      if (!this.readonly) this.show = !this.show;
    }
  },
  updated() {
    var self = this;
    if (document.onclick) document.onclick = null;
    document.onclick = function(e) {
      if (self.show) self.show = false;
    };
    if (this.show) {
      if (this.$el) this.marginTop = this.$el.offsetHeight + 2;
      else this.marginTop = 32;

      if (this.$el) {
        var childs = this.$el.lastChild.children;
        var height = 0;
        for (var i = 0; i < childs.length; i++) {
          height += childs[i].offsetHeight;
        }
        this.bodyHeight = height;
      }
    }
  },
  watch: {
    show(nval, oval) {
      if (nval) {
      }
    }
  }
};
</script>

<style>
.v-drop-down {
  position: relative;
  cursor: pointer;
  line-height: 30px;
  min-height: 30px;
  display: inline-block;
  vertical-align: middle;
  min-width: 50px;
  border: 1px solid lightgray;
}

.v-drop-down.readonly {
  background-color: rgb(230, 230, 230);
  cursor: not-allowed;
}

.v-drop-down-head {
  padding: 0 30px 0 10px;
  max-width: 300px;
}

.v-drop-down-items {
  position: absolute;
  /* margin-top: 32px; */
  list-style: none;
  width: 100%;
  max-height: 200px;
  background-color: white;
  border: 1px solid lightgray;
  z-index: 100;
}

/* css过渡效果 */

.dd-fade-top-enter,
.dd-fade-top-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dd-fade-top-enter-active,
.dd-fade-top-leave-active {
  transition: all 0.5s ease;
}
</style>
