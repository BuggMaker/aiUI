<template>
  <div class="toolbar">
    <slot class="toolbar-item"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.toolbar {
  border: 1px solid lightgray;
  padding: 0 8px 5px 8px;
  margin-bottom: 5px;
  background: white;
}

.toolbar-item {
  margin: 8px 0 0 0;
  vertical-align: middle;
}
</style>
