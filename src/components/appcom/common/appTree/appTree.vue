<template>
    <v-tree-list v-bind:title="title" v-bind:onlytitle="onlytitle" v-bind:nodes="goodsClassNodes" v-model="selected">
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
        value: Object,
        title:String,
        onlytitle:Boolean,
        method:String
    },
    data() {
        return {
            goodsClassNodes: [],
            selected: {}
        }
    },
    mounted() {
        this.getNodes();
    },
    methods: {
        getNodes() {
            var self = this;
            this.myHttp(self.myRequest[self.method](), {
                successed: res => {
                    self.goodsClassNodes = self.myUtils.AddPropsToTree(res.data, [{ name: 'selected', value: false }]);
                    if (self.goodsClassNodes.length > 0)
                        self.selected = self.goodsClassNodes[0];
                },
                failed: err => {

                }
            })
        }
    },
    watch: {
        selected(nval, oval) {
            //appTree
            this.$emit('input', nval);
        },
        value(nval, oval) {
            this.selected = nval;
        }
    }
}
</script>

<style>

</style>
