<template>
    <!-- <v-form title="分支管理"> -->
    <v-tab v-bind:titles="source">
        <app-good-sell slot="商品销售"></app-good-sell>

        <app-profit-rate slot="提成比例"> </app-profit-rate>

        <app-discount slot="折扣信息">3</app-discount>

        <app-notify-config slot="设置提醒">4</app-notify-config>
    </v-tab>
    <!-- </v-form> -->
</template>
<script>
// import vTab from '../../vuecom/vTab.vue'
import appGS from './appGoodsSell.vue'
import appPR from './appProfitRate.vue'
import appDiscount from './appDiscount.vue'
import appNC from './appNotifyConfig.vue'

export default {
    components: {
        // 'v-tab': vTab,
        'app-good-sell': appGS,
        'app-profit-rate': appPR,
        'app-discount': appDiscount,
        'app-notify-config': appNC
    },
    data() {
        return {
            source: ['商品销售', '提成比例', '折扣信息', '设置提醒']
        }
    }
}
</script>
<style>

</style>

