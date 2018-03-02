    <template>
    <transition name="fade-top">
        <!-- <div style="position:absolute;left:0;top:0;"> -->
            <div v-show="visable" class="vnotify" v-bind:class="type">
                <span class="vnotify-close" title="关闭" v-on:click="close">×</span>
                <slot></slot>
            </div>
        <!-- </div> -->
    </transition>
</template>
    
    <script>
export default {
    props: {
        //v-model双向绑定字段 控制提示显示状态
        value: Boolean,
        //停留时间
        interval: {
            type: Number,
            default: 3000
        },
        //提示类别 default/success/warn/error/fail
        type: {
            type: String,
            default: 'default'
        }
    },
    mounted: function() {
    },
    data() {
        return { visable: this.value};
    },
    methods: {
        close() {
            this.visable = false;
        }
    },
    watch: {
        visable(nval, oval) {
            this.$emit('input', nval);
            if (nval) {
                var self = this;
                setTimeout(function() {
                    self.visable = false;
                }, self.interval);
            }
        },
        value(nval, oval) {
            this.visable = nval;
        }
    }
}
</script>

    <style>
/*.vnotify*/

.vnotify {
    position: absolute;
    /* min-width: 200px; */
    /* min-height: 20px; */
    line-height: 20px;
    padding: 10px;
    text-align: center;
    /* left: 50%; */
    /* top:50%; */
    /* transform: translateX(-50%);     */
    /* transform: translateY(-50%); */
    color: white;
    z-index: 999;
}

.vnotify-close {
    position: absolute;
    top: 0;
    display: inline-block;
    right: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    color: white;
    border-radius: 0 5px 0 0;
}

.vnotify-close:hover {
    background-color: orangered;
}
</style>
    
    