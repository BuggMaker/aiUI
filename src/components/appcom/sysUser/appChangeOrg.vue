<template>
    <div class="change-org full">
        <div class="change-org-body">
            <table>
                <tr>
                    <td class="padding-10">
                        <span>请选择机构</span>
                    </td>
                </tr>
                <tr class="padding-5">
                    <td class="">
                        <v-combox v-bind:items="orgs" v-on:select="select" width=90></v-combox>
                    </td>
                </tr>
                <tr class="padding-5">
                    <td class="">
                        <input type="button" class="btn submit" v-on:click="submit" value="确定" />
                    </td>
                </tr>
            </table>

        </div>
    </div>
</template>

<script>
import vCombox from '../../vuecom/vCombox.vue'
export default {
    components: {
        'v-combox': vCombox
    },
    data() {
        return {
            orgs: [
                { id: 0, name: 'weji' },
                { id: 1, name: 'yingzhong' }
            ],
            selectedOrg: {}
        }
    },
    mounted() {
        var self = this;
        self.$http.get('/api/Org/QueryMyOrgs')
            .then(response => {
                self.orgs = response.data;
            })
            .catch(error => {
                console.log(error);
            })
    },
    methods: {
        select(org) {
            this.selectedOrg = org;
        },
        submit() {
            var self = this;
            self.$http.post('/api/Member/ChangeOrgById', self.selectedOrg.id)
                .then(res => {
                    //成功 跳转
                    if (res.data) {
                        window.location.href = 'Home/Index';
                    }
                    else {

                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>

<style>
.change-org {
    background-color: rgba(30, 30, 30, 0.3);
}

.change-org-body {
    position: absolute;
    margin: -55px -100px;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 120px;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 2px 2px 10px lightgray;
    text-align: center;
    box-shadow: 2px 2px 10px gray;
}
</style>
