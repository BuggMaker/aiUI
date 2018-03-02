<template>
    <v-tree-list title="机构部门" v-bind:onlytitle="true" v-bind:nodes="orgNodes" v-model="selected" v-bind:loading="loading">
    </v-tree-list>
</template>
</template>

<script>
// import vTreeList from "../../../vuecom/vTree/vTreeList.vue";
export default {
  // components: {
  //   "v-tree-list": vTreeList
  // },
  props: {
    value: Object
  },
  data() {
    return {
      orgNodes: [],
      selected: {},
      loading: true
    };
  },
  mounted() {
    this.getSysUserOrg();
  },
  methods: {
    getSysUserOrg() {
      var self = this;
      this.myHttp(self.myRequest.getSysUserOrg(), {
        beforeRequest: () => {
          self.loading = true;
        },
        successed: res => {
          self.orgNodes = self.myUtils.AddPropsToTree(res.data, [
            {props:[{ name: "selected", value: false }]}
          ]);
          if (self.orgNodes instanceof Array) {
            self.selected = self.orgNodes[0];
          } else {
            self.selected = self.orgNodes;
          }
        },
        afterSuccessed: () => {
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
    }
    // value(nval, oval) {
    //   this.selected = nval;
    // }
  }
};
</script>

<style>

</style>
