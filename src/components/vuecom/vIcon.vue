<template>
  <span class="vicon" v-bind:style="style" v-on:click="click">
      <span v-bind:class="'vicon-'+name"></span>
  </span>
</template>

<script>
export default {
  props: {
    name: String, //info warn check close search left right up down fresh back
    scale: [Number, String],
    zoom: [Number, String]
  },
  computed: {
    style: function() {
      if (this.scale) return `transform: scale(+${this.scale})`;
      else if (this.zoom) return `zoom:${this.zoom}`;
    }
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style>
[class*="vicon"] {
  display: inline-block;
}
[class*="vicon-"] {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  /* color: #333; */
  border: 2px solid;
  pointer-events: none;
  width: 30px;
  height: 30px;
  overflow: hidden;
  vertical-align: middle;
}

[class*="vicon-"]:before,
[class*="vicon-"]:after {
  content: "";
  position: absolute;
}
[class*="-checked"] {
  cursor: pointer;
}

.vicon-info {
  border-radius: 50%;
}

.vicon-info:before {
  width: 4px;
  height: 5px;
  left: 50%;
  top: 4px;
  transform: translateX(-50%);
  box-shadow: inset 0px 5px, 0 8px, 0 13px;
}

.vicon-warn {
  border-radius: 50%;
}

.vicon-warn:before {
  width: 4px;
  height: 5px;
  left: 50%;
  top: 4px;
  transform: translateX(-50%);
  box-shadow: inset 0px 5px, 0 5px, 0 13px;
}

.vicon-success {
  border-radius: 50%;
  transform: rotate(-45deg);
}

.vicon-success:before {
  width: 4px;
  height: 12px;
  top: 5px;
  left: 5px;
  box-shadow: inset 0px 10px;
}

.vicon-success:after {
  width: 18px;
  height: 4px;
  left: 5px;
  top: 12px;
  box-shadow: inset 18px 0px;
}

.vicon-complete {
  border-radius: 50%;
  transform: rotate(-45deg);
}

.vicon-complete:before {
  width: 4px;
  height: 12px;
  top: 5px;
  left: 5px;
  box-shadow: inset 0px 10px;
}

.vicon-complete:after {
  width: 18px;
  height: 4px;
  left: 5px;
  top: 12px;
  box-shadow: inset 18px 0px;
}

.vicon-close {
  border-radius: 50%;
  transform: rotate(-45deg);
}

.vicon-close:before {
  width: 4px;
  height: 18px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset 0px 18px;
}

.vicon-close:after {
  width: 18px;
  height: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset 18px 0px;
}

.vicon-search {
  border: none;
  /*border-radius: 50%;*/
  transform: rotate(-45deg);
}

.vicon-search:before {
  width: 16px;
  height: 16px;
  border: 2px solid;
  border-radius: 50%;
  top: 2px;
  left: 6px;
}

.vicon-search:after {
  width: 6px;
  height: 15px;
  left: 11px;
  top: 16px;
  box-shadow: inset 18px 0px;
}

.vicon-left {
  border: none;
  transform: rotate(-45deg);
}

.vicon-right {
  border: none;
  transform: rotate(135deg);
}

.vicon-up {
  border: none;
  transform: rotate(45deg);
}

.vicon-down {
  border: none;
  transform: rotate(-135deg);
}

.vicon-left:before,
.vicon-right:before,
.vicon-up:before,
.vicon-down:before {
  width: 14px;
  height: 14px;
  border: 3px solid;
  border-bottom-color: transparent;
  border-right-color: transparent;
  top: 50%;
  left: 50%;
  transform: translate(-25%, -25%);
}

.vicon-fresh {
  border: none;
}

.vicon-fresh:before {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid;
  border-left-color: transparent;
}

.vicon-fresh:after {
  border: 5px solid;
  border-right-color: transparent;
  border-bottom-color: transparent;
  top: 18px;
  left: 2px;
}

.vicon-back {
  border: none;
  cursor: pointer;
}

.vicon-back:before {
  top: 5px;
  left: 4px;
  border: 5px solid;
  border-right-color: transparent;
  border-bottom-color: transparent;
  transform: rotate(-45deg);
}

.vicon-back:after {
  width: 20px;
  height: 15px;
  top: 8px;
  left: 3px;
  border: 2px solid;
  border-radius: 0 40% 40% 0;
  border-left-color: transparent;
}

.vicon-plus {
  border: 2px solid;
}

.vicon-plus:before {
  top: 3px;
  left: 11px;
  width: 0px;
  height: 16px;
  border: 2px solid;
}

.vicon-plus:after {
  left: 3px;
  top: 11px;
  height: 0px;
  width: 16px;
  border: 2px solid;
}

.vicon-minus {
  border: 2px solid;
}

.vicon-minus:after {
  left: 3px;
  top: 11px;
  height: 0px;
  width: 16px;
  border: 2px solid;
}

.vicon-checked {
  border: 2px solid;
  color: dodgerblue;
}

.vicon-checked:before {
  top: 4px;
  left: 14px;
  width: 0px;
  height: 14px;
  border: 2px solid;
  /* background-color: dodgerblue; */
  transform: rotateZ(45deg);
}

.vicon-checked:after {
  left: 2px;
  top: 13px;
  height: 0px;
  width: 8px;
  border: 2px solid;
  /* background-color: dodgerblue; */
  transform: rotateZ(45deg);
}

.vicon-unchecked {
  border: 2px solid;
}

.vicon-unchecked:before {
  top: 4px;
  left: 14px;
  width: 0px;
  height: 14px;
  border: 2px solid;
  background-color: #333;
  transform: rotateZ(45deg);
}

.vicon-unchecked:after {
  left: 2px;
  top: 13px;
  height: 0px;
  width: 8px;
  border: 2px solid;
  background-color: #333;
  transform: rotateZ(45deg);
}

.vicon-checked-fill {
  border: 2px solid dodgerblue;
  background-color: dodgerblue;
  color: white;
}

.vicon-unchecked-fill {
  border: 2px solid #333;
  background-color: #333;
  color: white;
}

.vicon-checked-fill:before,
.vicon-unchecked-fill:before {
  top: 4px;
  left: 14px;
  width: 0px;
  height: 14px;
  border: 2px solid;
  background-color: white;
  transform: rotateZ(45deg);
}

.vicon-checked-fill:after,
.vicon-unchecked-fill:after {
  left: 2px;
  top: 13px;
  height: 0px;
  width: 8px;
  border: 2px solid;
  background-color: white;
  transform: rotateZ(45deg);
}

.vicon-delete,
.vicon-trash {
  border: none;
}

.vicon-delete:before,
.vicon-trash:before {
  left: 50%;
  top: 2px;
  transform: translateX(-50%);
  width: 2px;
  height: 0px;
  border: 1px solid;
  box-shadow: -2px 0, 2px 0, -9px 2px, -7px 2px, -5px 2px, -5px 2px, -3px 2px,
    -1px 2px, 1px 2px, 3px 2px, 5px 2px, 7px 2px, 9px 2px, -3px 8px, 3px 8px,
    -3px 9px, 3px 9px, -3px 10px, 3px 10px, -3px 11px, 3px 11px, -3px 12px,
    3px 12px, -3px 13px, 3px 13px, -3px 14px, 3px 14px, -3px 15px, 3px 15px,
    -3px 16px, 3px 16px;
}

.vicon-delete:after,
.vicon-trash:after {
  left: 50%;
  top: 7px;
  transform: translateX(-50%);
  width: 14px;
  height: 16px;
  border: 2px solid;
  border-top: none;
}

.vicon-download {
  border: none;
}

.vicon-download:before {
  left: 50%;
  transform: translateX(-50%);
  bottom: 2px;
  width: 0px;
  height: 0px;
  border: 2px solid;
  box-shadow: -4px 0, 4px 0, -8px 0, 8px 0, 12px 0, -12px 0, 12px -3px,
    -12px -3px, 12px -6px, -12px -6px, 0 -16px, 0 -13px, 0 -19px, 0 -22px;
}

.vicon-download:after {
  left: 50%;
  transform: translateX(-50%);
  bottom: 4px;
  width: 0;
  height: 0;
  border-top: 7px solid;
  border-bottom: 7px solid transparent;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
}

.vicon-upload,
.vicon-submit {
  border: none;
}

.vicon-upload:before,
.vicon-submit:before {
  left: 50%;
  transform: translateX(-50%);
  bottom: 2px;
  width: 0px;
  height: 0px;
  border: 2px solid;
  box-shadow: -4px 0, 4px 0, -8px 0, 8px 0, 12px 0, -12px 0, 12px -3px,
    -12px -3px, 12px -6px, -12px -6px, 0 -16px, 0 -13px, 0 -19px, 0 -10px;
}

.vicon-upload:after,
.vicon-submit:after {
  left: 50%;
  transform: translateX(-50%);
  top: -5px;
  width: 0;
  height: 0;
  border-bottom: 7px solid;
  border-top: 7px solid transparent;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
}

/* 旋转 spin */
.spin {
  -webkit-animation: loading-spinner 2s infinite linear;
  -moz-animation: loading-spinner 2s infinite linear;
  -o-animation: loading-spinner 2s infinite linear;
  animation: loading-spinner 2s infinite linear;
}

@keyframes loading-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
