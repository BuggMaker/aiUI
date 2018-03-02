<template>
    <v-tree-list title="商品分类" v-bind:onlytitle="true" v-bind:nodes="goodsClassNodes" v-model="selected" v-bind:loading="loading">
    </v-tree-list>
</template>
</template>

<script>
// import vTreeList from '../../../vuecom/vTree/vTreeList.vue'
export default {
  // components: {
  //     'v-tree-list': vTreeList
  // },
  props: {
    value: Object
  },
  data() {
    return {
      goodsClassNodes: [],
      selected: {},
      loading: true
    };
  },
  mounted() {
    this.getGoodsClass();
  },
  methods: {
    getGoodsClass() {
      var self = this;
      this.myHttp(self.myRequest.getAllGoodsClass(), {
        beforeRequest: () => {
          self.loading = true;
        },
        successed: res => {
          self.goodsClassNodes = self.myUtils.AddPropsToTree(res.data, [
            { props: [{ name: "selected", value: false }] }
          ]);
          if (self.goodsClassNodes.length > 0)
            self.selected = self.goodsClassNodes[0];
          self.loading = false;
        },
        failed: err => {}
      });
    }
  },
  watch: {
    selected(nval, oval) {
      //appTree
      this.$emit("input", nval);
    },
    value(nval, oval) {
      this.selected = nval;
    }
  }
};
</script>

<style>

</style>
