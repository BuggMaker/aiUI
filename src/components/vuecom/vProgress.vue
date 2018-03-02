<template>
    <div v-show="progress.visable" class="vprogress full" v-bind:value="value">
        <div class="vprogress-body">
            <div v-if="!loading" class="vprogress-column1" v-bind:style="{width:(progress.val*3)+'px'}"></div>
            <div v-if="loading" class="vprogress-column2" v-bind:style="{marginLeft:(-20+progress.val*3)+'px'}"></div>
            <label v-if="!loading" v-show="showlabel" class="vprogress-label">{{loading?'正在加载...':progress.val+'%'}}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        //是否显示 当前val
        value: {
            type: Object,
            default: () => {
                return {
                    visable: false,
                    val: NaN
                }
            }
        },
        //说服显示
        showlabel: {
            type: Boolean,
            default: true
        },
        //是否未加载等待
        loading: {
            type: Boolean,
            default: false
        }
    },
    beforeMount() {
        var self = this;
        if (isNaN(self.value.val) || self.loading) {
            self.progress.val = 1;
            //self.showlabel = false;
            setInterval(function() {
                self.progress.val++;
                self.progress.val %= 101;
            }, 16);
        }
    },
    mounted() { },
    data: function() {
        return { progress: this.value }
    },
    methods: {},
    watch: {
        value: function(newVal, oldVal) {
             this.progress = newVal;
        },
        progress(nval, oval) {
            this.$emit('inpput', nval);
        }
    }
}
</script>

<style>
/*vprogress*/

.vprogress {
    background-color: rgba(200, 200, 200, 0.5);
}

.vprogress-body {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 30px;
    margin: -15px 0 0 -150px;
    border: 2px solid rgba(30, 180, 170, 0.9);
    background-color: rgba(30, 180, 170, 0.4);
    text-align: center;
    overflow: hidden;
}

.vprogress-column1 {
    /*position: absolute;
            top: 0;
            left: 0;*/
    /*width: 150px;*/
    height: 30px;
    background-color: rgba(30, 180, 170, 0.9);
}

.vprogress-column2 {
    position: absolute;
    top: 0;
    left: 0px;
    width: 150px;
    height: 30px;
    width: 20px;
    margin-left: -20px;
    background-color: rgba(30, 180, 170, 0.9);
}

.vprogress-label {
    position: absolute;
    top: 0;
    margin-left: -15px;
    color: white;
    line-height: 30px;
}
</style>