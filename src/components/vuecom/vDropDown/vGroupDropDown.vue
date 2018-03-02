<template>
    <v-drop-down v-bind:readonly="readonly">
        <span v-if="multiple" slot="head">
            <v-item v-for="(item,k) in selectedItems" v-bind:key="k" v-bind:value="item" v-on:close="removeItem(item)"></v-item>
        </span>
        <label v-else slot="head">{{selectedItems?selectedItems.name:'请选择'}}</label>
        <ul slot="body">
            <li v-for="(item,k) in items" v-bind:key="k" class="v-group-drop-down-item" v-on:click="selectItem(item)">
                {{item.name}}
                <span class="v-group-drop-down-item-state" v-bind:class="selected==item.id || (selected instanceof Array && selected.indexOf(item.id)>=0) ? 'selected':''">✔</span>
            </li>
        </ul>
    </v-drop-down>
</template>

<script>
import vdropdown from './vDropDown.vue'
import vitem from './vItem.vue'
export default {
    components: {
        'v-drop-down': vdropdown,
        'v-item': vitem
    },
    props: {
        //双向绑定
        value: [Array, Number],
        //集合
        items: Array,
        //是否多选
        multiple: {
            type: Boolean,
            default: true
        },
        //只读
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            //选中元素id集合
            selected: this.value
        }
    },
    computed: {
        //选中元素结集合
        selectedItems() {
            var self = this,
                ary = [];
            if (self.multiple) {
                self.selected.forEach(id => {
                    ary.push(self.items.find(item => { return item.id == id }));
                });
                return ary;
            }
            else
                return self.items.find(item => { return item.id == self.selected });
        }
    },
    methods: {
        removeItem(val) {
            var index = this.selected.indexOf(val.id);
            this.selected.splice(index, 1);
        },
        selectItem(val) {
            //多选
            if (this.multiple) {
                var index = this.selected.indexOf(val.id);
                if (index >= 0) {
                    this.selected.splice(index, 1);
                }
                else {
                    this.selected.push(val.id);
                }
            }
            //单选
            else {
                this.selected = val.id;
            }
        }
    },
    watch: {
        value(nval, oval) {
            this.selected = nval;
        },
        selected(nval, oval) {
            this.$emit('input', nval);
        }
    }

}
</script>

<style>
.v-group-drop-down-item {
    padding: 0px 10px;
    overflow: hidden;
}

.v-group-drop-down-item:hover,
.v-group-drop-down-item-state.selected:hover {
    background-color: rgb(30, 170, 180);
    color: white;
}

.v-group-drop-down-item-state {
    color: rgb(250,250,250);
    float: right;
}

.v-group-drop-down-item-state.selected {
    color: green;
}
</style>
