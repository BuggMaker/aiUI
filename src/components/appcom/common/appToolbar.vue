<template>
    <v-toolbar>
        <v-search v-bind:placeholder="placeholder" v-on:query="query"></v-search>
        <slot></slot>
    </v-toolbar>
</template>

<script>
import vtoolbar from '../../vuecom/vToolbar.vue'
import vsearch from '../../vuecom/vSearch.vue'
export default {
    components: {
        'v-toolbar': vtoolbar,
        'v-search': vsearch
    },
    props: {
        placeholder: String        
    },
    methods: {
        query(val) {
            this.$emit('query',val);
        }
    }
}
</script>

<style>

</style>
