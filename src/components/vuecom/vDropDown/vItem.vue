<template>
    <span class="v-item" v-on:mouseenter="showCloseBtn" v-on:mouseleave="hideCloseBtn">
        {{value.name}}
        <span v-show="show" class="v-item-close" v-on:click.stop="close">×</span>
    </span>
</template>

<script>
export default {
    props: {
        value:  Object
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        showCloseBtn() {
            this.show = true;
        },
        hideCloseBtn() {
            this.show = false;
        }
    }
}
</script>

<style>
.v-item {
    margin: 5px;
    line-height: 20px;
    padding: 0px 10px;
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: rgb(250, 250, 250);
}

.v-item-close {
    position: absolute;
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    color: white;
    background-color: orangered;
    border-radius: 50%;
    cursor: pointer;
}
</style>
