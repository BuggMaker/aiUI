<template>
    <div class="v-list">
        <!-- <div class="item v-list-new">新建</div> -->
        <div v-for="(item,k) in items" v-bind:key="k" class="item v-list-item">{{item}}</div>
    </div>
</template>

<script>
export default {
    props: {
        items: Array
    }
}
</script>

<style>
 .v-list{
border:1px solid lightgray;
    background-color: white;
} 

.item{
    margin: 10px;
    border-radius: 5px;
    /* height: 35px; */
    line-height: 35px;
    font-size: 20px;
    text-align: center;    
}

.v-list-new{
    color: white;
    background-color: rgba(5, 16, 22, 0.5);
}

.v-list-item {
    color: rgba(5, 16, 22, 0.8);
}

.v-list-item:hover {
    background-color: rgba(5, 16, 22, 0.8);
    cursor: pointer;
    color: white;
}
</style>
