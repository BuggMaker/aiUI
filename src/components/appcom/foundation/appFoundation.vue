<template>
    <!-- <v-form title="基础管理" v-bind:colored='true'> -->
    <v-tab v-bind:titles="tabTitles">
        <app-org-dep slot="机构部门"></app-org-dep>

        <app-role-permission slot="角色权限"></app-role-permission>

        <app-goods-class  slot="商品分类"></app-goods-class>

        <app-goods-list slot="商品列表" v-bind:nodes="nodeGoods.items" v-bind:editable="false"></app-goods-list>

        <v-tree-list slot="宠物分类" v-bind:nodes="nodePets.items" v-bind:editable="true" title="宠物类别"> </v-tree-list>

        <app-member-classify slot="会员等级" v-bind:classifies="classifies"></app-member-classify>

    </v-tab>
    <!-- </v-form> -->
</template>
<script>
// import vTab from '../../vuecom/vTab.vue'
// import vTreeList from '../../vuecom/vTree/vTreeList.vue'

import appOrgDep from './appOrgDep.vue'
import appRolePermission from './appRolePermission.vue'
import appMemberClassify from './appMemberClassify.vue'
import appGoodsList from './appGoodsList.vue'
import appGoodsClass from './appGoodsClass.vue'


export default {
    components: {
        // 'v-form': vForm,
        // 'v-tab': vTab,
        // 'v-tree-list': vTreeList,
        'app-org-dep': appOrgDep,
        'app-role-permission': appRolePermission,
        'app-member-classify': appMemberClassify,
        'app-goods-list': appGoodsList,
        'app-goods-class':appGoodsClass
    },
    data() {
        return {
            tabTitles: ['机构部门', '角色权限', '商品分类', '商品列表', '宠物分类', '会员等级'],
            node: {
                name: '纬济',//名字
                description: '总部',//描述
                editable: false,//是否可以增删改
                items://子节点 (同样包含父节点一样的属性:名字/描述/编辑/子节点)
                [
                    {
                        name: '赢众',
                        description: '销售公司',
                        editable: true,
                        items: [{
                            name: '仓储',
                            description: '部门',
                            editable: true
                        }, {
                            name: '财务',
                            description: '部门',
                            editable: true
                        }]
                    }, {
                        name: '某诊所',
                        items: [
                            {
                                name: '前台',
                                description: '部门',
                                editable: true
                            }, {
                                name: '门诊',
                                description: '部门',
                                editable: true
                            }, {
                                name: '护理',
                                description: '部门',
                                editable: true
                            }, {
                                name: '仓储',
                                description: '部门',
                                editable: true
                            }, {
                                name: '财务',
                                description: '部门'
                            }
                        ]
                    }]
            }
            ,
            nodeGoods:
            {
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
            nodePets: {
                name: '宠物',//名字
                // description: '总部',//描述
                editable: false,//是否可以增删改
                items://子节点 (同样包含父节点一样的属性:名字/描述/编辑/子节点)
                [{
                    name: '犬类',
                    description: '犬类',
                    editable: true,
                    items: [{
                        name: '哈士奇',
                        description: '犬',
                        editable: true
                    },
                    {
                        name: '金毛',
                        description: '犬',
                        editable: true
                    }, {
                        name: '藏獒',
                        description: '犬',
                        editable: true
                    }, {
                        name: '贵宾犬',
                        description: '犬',
                        editable: true
                    }]
                }, {
                    name: '猫类',
                    items: [{
                        name: '加菲猫',
                        description: '猫',
                        editable: true
                    }, {
                        name: '波斯猫',
                        description: '猫',
                        editable: true
                    }, {
                        name: '美国短毛猫',
                        description: '猫',
                        editable: true
                    },]
                }, {
                    name: '其他',
                    items: [{
                        name: '仓鼠'
                    }, {
                        name: '鱼'
                    }, {
                        name: '蛇'
                    }, {
                        name: '龟'
                    }]
                }]
            },
            datasource: [
                { username: 'yaxongfeng', age: 27, salary: 14000, address: '广埠屯' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 26, salary: 12800, address: '广八路1' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口创意城珞喻路129号资源与环境科学学院' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'wangwu', age: 26, salary: 12800, address: '广八路1' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口创意城珞喻路129号资源与环境科学学院' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' },
                { username: 'lisi', age: 23, salary: 6800, address: '街道口' },
                { username: 'wangwu', age: 28, salary: 12800, address: '广八路' }],
            classifies: [
                { name: '白银会员', limit: '5000' },
                { name: '青铜会员', limit: '2000' },
                { name: '钻石会员', limit: '20000' },
                { name: '黄金会员', limit: '10000' },
                { name: '普通会员', limit: '0' },
            ],
            curNode: {}
        }
    }
}
</script>
<style>

</style>