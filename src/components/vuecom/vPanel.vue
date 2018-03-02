<template>
    <div class="panel box-vertical full">
        <div v-if="title" class="header">
            <span class="panel-title">
                {{title}}
                <slot name="title"></slot>
            </span>
            <slot name="head"></slot>
        </div>
        <div class="panel-body box1 hidden scroll">
            <slot name="body"></slot>
            <slot></slot>
        </div>
        <div class="panel-foot">
            <slot name="foot"></slot>
        </div>
        <v-modal v-model="loading" v-bind:source="modalsource"></v-modal>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    loading: true
  },
  data() {
    return {
      modalsource: {
        loading: true
      }
    };
  }
};
</script>

<style>
.panel {
  border: 1px solid lightgray;
  background-color: white;
  line-height: 1.5;
}

.panel-title {
  margin-left: 10px;
}

.panel-foot {
  border-top: 1px solid lightgray;
  text-align: center;
}
</style>
