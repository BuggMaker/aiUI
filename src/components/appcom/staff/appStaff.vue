<template>
    <!-- <v-form title="人员管理"> -->
    <v-tab v-bind:titles="source">
        <app-staff-info slot="员工信息" v-bind:datasource="datasource"> </app-staff-info>
        <app-member-info slot="会员" v-bind:datasource="datasource"></app-member-info>
    </v-tab>
    <!-- </v-form> -->
</template>
<script>
// import vTab from '../../vuecom/vTab.vue'
// import vForm from '../../vuecom/vForm.vue'

import appsi from './appStaffInfo.vue'
import appmi from './appMemberInfo.vue'

export default {
    components: {
        // 'v-form': vForm,
        // 'v-tab': vTab,
        'app-staff-info': appsi,
        'app-member-info': appmi
    },
    data() {
        return {
            source: ['员工信息', '会员'],
            datasource: [
                { '用户名': 'yaxongfeng', '年龄': 27, '工资': 14000, '地址': '广埠屯' },
                { '用户名': 'lisi', '年龄': 23, '工资': 6800, '地址': '街道口' },
                { '用户名': 'wangwu', '年龄': 26, '工资': 12800, '地址': '广八路1' },
                { '用户名': 'lisi', '年龄': 23, '工资': 6800, '地址': '街道口' },
                { '用户名': 'wangwu', '年龄': 28, '工资': 12800, '地址': '广八路' },
                { '用户名': 'lisi', '年龄': 23, '工资': 6800, '地址': '街道口' },
                { '用户名': 'wangwu', '年龄': 28, '工资': 12800, '地址': '广八路' },
                { '用户名': 'lisi', '年龄': 23, '工资': 6800, '地址': '街道口' },
                { '用户名': 'wangwu', '年龄': 28, '工资': 12800, '地址': '广八路' },
                { '用户名': 'lisi', '年龄': 23, '工资': 6800, '地址': '街道口' },
                { '用户名': 'wangwu', '年龄': 28, '工资': 12800, '地址': '广八路' },
                { '用户名': 'lisi', '年龄': 23, '工资': 6800, '地址': '街道口' }]
        }
    }
}
</script>
<style>

</style>

