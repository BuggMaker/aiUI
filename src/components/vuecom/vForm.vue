<template>
    <div class="v-form">
        <div v-if="title" class="header">
            <span class="v-form-title">
                {{title}}
                <slot name="title"></slot>
            </span>
            <slot name="head"></slot>
        </div>
        <div class="v-form-body box1 hidden scroll">
            <slot name="body"></slot>
            <slot></slot>
        </div>
        <div class="v-form-foot">
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
.v-form {
  position: relative;
  border: 1px solid lightgray;
  background-color: white;
  line-height: 1.5;
  margin-top: 10px;
}
.v-form-body{
    padding: 5px 10px;
}

.v-form-title {
  margin-left: 10px;
}

.v-form-foot {
  /* border-top: 1px solid lightgray; */
  text-align: center;
}
</style>
