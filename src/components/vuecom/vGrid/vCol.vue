<template>
  <div class="v-col" :class="'v-grid-span-'+span">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    span: {
      type: [String, Number],
      default: 24
    },
    order: Number
  }
};
</script>

<style>
.v-col {
  position: relative;
  display: block;
  margin-bottom: 10px;
  /* flex: 0 0 auto;   */

  /* justify-content: center;
  align-items: center; */
}
.v-grid-span-1 {
  width: 4.166667%;
}
.v-grid-span-2 {
  width: 8.333333%;
}
.v-grid-span-3 {
  width: 12.5%;
}
.v-grid-span-4 {
  width: 16.666667%;
}
.v-grid-span-5 {
  width: 20.888883%;
}
.v-grid-span-6 {
  width: 25%;
}
.v-grid-span-7 {
  width: 29.166667%;
}
.v-grid-span-8 {
  width: 33.333333%;
}
.v-grid-span-9 {
  width: 37.5%;
}
.v-grid-span-10 {
  width: 41.666667%;
}
.v-grid-span-11 {
  width: 45.833333%;
}
.v-grid-span-12 {
  width: 50%;
}
.v-grid-span-13 {
  width: 54.166667%;
}
.v-grid-span-14 {
  width: 58.333333%;
}
.v-grid-span-15 {
  width: 62.5%;
}
.v-grid-span-16 {
  width: 66.666667%;
}
.v-grid-span-17 {
  width: 70.888883%;
}
.v-grid-span-18 {
  width: 75%;
}
.v-grid-span-19 {
  width: 79.166667%;
}
.v-grid-span-20 {
  width: 83.333333%;
}
.v-grid-span-31 {
  width: 87.5%;
}
.v-grid-span-22 {
  width: 91.666667%;
}
.v-grid-span-23 {
  width: 95.833333%;
}
.v-grid-span-24 {
  width: 100%;
}
</style>
