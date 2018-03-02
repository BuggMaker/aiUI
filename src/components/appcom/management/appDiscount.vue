<template>
    <div class="profit-rate box-horizon full">
        <div style="position:relative;width:200px;margin-right:10px;">
            <v-panel title="会员等级">
                <v-list slot="body" v-bind:items="memberClassifies"></v-list>
            </v-panel>
        </div>
        <div class="box1">
            <!-- <v-panel title="商品列表及销售许可"> -->
            <div slot="body" class="box-horizon full">
                <div style="position:relative;width:300px;">
                    <v-tree-list title="商品列表" v-bind:node="nodeGoods" v-bind:onlytitle="true"></v-tree-list>
                </div>
                <div class="box1 scroll">
                    <table class="center">
                        <thead class="header">
                            <tr>
                                <td>商品名称</td>
                                <td>提成比率</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(good,k) in goodList" v-bind:key="k" v-bind:class="'tr-'+k%2">
                                <td class="common-td">{{good}}</td>
                                <td class="common-td"><input type="number" value="1" size="5" />%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- </v-panel> -->
        </div>
    </div>
</template>

<script>
// import vpanel from '../../vuecom/vPanel.vue'
// import vList from '../../vuecom/vList.vue'
// import vTreeList from '../../vuecom/vTree/vTreeList.vue'

export default {
    // components: {
    //     'v-panel': vpanel,
    //     'v-list': vList,
    //     'v-tree-list': vTreeList
    // },
    data() {
        return {
            memberClassifies: ['钻石会员', '黄金会员', '白银会员', '青铜会员', '普通会员'],
            nodeGoods: {
                name: '商品',
                items: [
                    {
                        name: '挂号',
                        items: [
                            {
                                name: '挂号',
                                items: [{
                                    name: '普通'
                                },
                                {
                                    name: '专科'
                                },
                                {
                                    name: '专家'
                                },
                                {
                                    name: '夜间'
                                },
                                {
                                    name: '其他'
                                }]
                            }
                        ]
                    },
                    {
                        name: '住院',
                        items: [
                            {
                                name: '住院',
                                items: [{
                                    name: '普通'
                                },
                                {
                                    name: '体型'
                                },
                                {
                                    name: '其他'
                                }]
                            }
                        ]
                    },
                    {
                        name: '物品',
                        items: [
                            {
                                name: '狗粮',
                                items: [{
                                    name: '普通'
                                },
                                {
                                    name: '精致'
                                },
                                {
                                    name: '其他'
                                }]
                            },
                            {
                                name: '沐浴露',
                                items: [{
                                    name: '普通'
                                },
                                {
                                    name: '过敏体质'
                                },
                                {
                                    name: '除臭'
                                },
                                {
                                    name: '其他'
                                }]
                            }, {
                                name: '狗垫',
                                items: [{
                                    name: '普通'
                                },
                                {
                                    name: '香型'
                                },
                                {
                                    name: '材料'
                                },
                                {
                                    name: '其他'
                                }]
                            }, {
                                name: '狗链',
                                items: [{
                                    name: '普通'
                                },
                                {
                                    name: '尺寸'
                                },
                                {
                                    name: '材料'
                                },
                                {
                                    name: '其他'
                                }]
                            }
                        ]
                    }
                ]
            },
            goodList: ['普通挂号', '夜间挂号', '专家挂号', '专科挂号', '...'],
        }
    }
}
</script>

<style>

</style>
