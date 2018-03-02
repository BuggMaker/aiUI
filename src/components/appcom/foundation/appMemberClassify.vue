<template>
    <div class="mermber-classify">
        <v-panel>
            <table slot="body">
                <tr class="header">
                    <td class="class-td">会员等级</td>
                    <td class="class-td">分级限制(积分)</td>
                    <td class="class-td">操作</td>
                </tr>
                <tr class="class-item" v-for="(c,k) in source" v-bind:key="k">
                    <td class="class-td">
                        <!-- {{c.name}} -->
                        <input class="text" v-bind:class="{edit:editIndex==k}" size="15" type="text" v-model="c.name" v-bind:readonly="editIndex != k" />
                    </td>
                    <td class="calss-td">
                        <!-- {{c.limit}} -->
                        <input class="text" v-bind:class="{edit:editIndex==k}" size="15" type="text" v-model="c.limit" v-bind:readonly="editIndex != k" />
                    </td>
                    <td class="calss-td">
                        <span v-if="editIndex==k" class="vsimpletreenode-option submit" title="提交" v-on:click.stop="submit(k)">✔</span>
                        <input class="class-button edit" type="button" value="编辑" v-on:click="edit(k)" />
                        <input class="class-button delete" type="button" value="删除" v-on:click="dele(k)" />
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="class-td">
                        <input class="class-button add" type="button" value="添加等级" v-on:click="add" />
                    </td>
                </tr>
            </table>
        </v-panel>
    </div>
</template>

<script>
// import vPanel from '../../vuecom/vPanel.vue'
export default {
    // components: {
    //     'v-panel': vPanel
    // },
    props: {
        classifies: Array
    },
    data() {
        return {
            source: this.classifies,
            editIndex: NaN
        }
    },
    mounted() {
        this.sortedData()
    },
    methods: {
        sortedData: function() {
            this.source = this.source.sort((c1, c2) => { return c2.limit - c1.limit });
        },
        add: function() {
            //添加等级设置
            this.source.push({ name: '新等级', limit: 0 })
        },
        edit: function(index) {
            if (this.editIndex == index)
                this.editIndex = NaN;
            else
                this.editIndex = index;
        },
        dele: function(index) {

        },
        submit: function(index) {
            this.editIndex = NaN;
            this.sortedData()
        }
    }
}
</script>

<style>
.mermber-classify {
    border: 1px solid lightgray;
}

.mermber-classify table {
    text-align: center;
}

.class-item {
    border-bottom: 1px solid lightgray;
}

.class-item:hover {
    background-color: lightgray;
}

.class-td {
    font-size: 20px;
    line-height: 20px;
    padding: 10px;
}

.class-button {
    padding: 5px;
}
</style>
