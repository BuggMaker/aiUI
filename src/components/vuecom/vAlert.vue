    <template>
    <transition name="zoom-in">
        <div v-if="show" style="position:absolute;width:100%;height:100%;top:0;left:0;background-color:rgba(250,250,250,0.8);overflow: auto;z-index: 10; ">
            <div class="valert" v-on:keydown.enter='enter' v-bind:value="value">
                <div class="valert-head header">
                    <label class="valert-title">{{title}}</label>
                    <slot name="head"></slot>
                    <span class="valert-close" v-on:click="close">×</span>
                </div>
                <div class="valert-body">
                    <slot name="body"></slot>
                </div>
                <div class="valert-foot">
                    <slot name="foot"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

    <script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Alert'
        }
    },
    data: function() {
        return { show: this.value }
    },
    methods: {
        close() {
            this.show = false;
            // this.$emit('valuechange', this.show);
        },
        enter() {
            this.$emit('enter');
        }
    },
    updated: function() {
    },
    watch: {
        value: function(newval, oldval) {
            this.show = newval;
        },
        show(nval, oval) {
            this.$emit('input', nval);
        }
    }
}
</script>

    <style lang="">
.valert {
    position: absolute;
    top: 5%;
    min-width: 200px;
    max-width: 90%px;
    max-height: 90%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 2px 2px 10px gray;
    background-color: white;
}

.valert-head {
    position: relative;
    height: 40px;
    background-color: rgba(30, 180, 170, 0.95);
}

.valert-title {
    line-height: 40px;
    color: white;
    font-size: 23px;
    margin-left: 10px;
    user-select: none;
}

.valert-close {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 0;
    top: 0;
    line-height: 40px;
    font-size: 25px;
    text-align: center;
    color: white;
    cursor: pointer;
    user-select: none;
}

.valert-close:hover {
    background-color: orange;
}

.valert-body {
    /*min-height: 50px;*/
    padding: 10px;
    /* background-color: rgba(255, 255, 255, 0.9); */
    max-height: 500px;
    overflow: auto;
}

.valert-foot {
    border-top: 1px solid lightgray;
    padding: 5px;
    text-align: center;
    /* background-color: lightgray; */
}
</style>