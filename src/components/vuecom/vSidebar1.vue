
   <template>
    <div class="v-sidebar1" v-bind:id="uid">
        <div v-if="animate" class="v-sidebar1-title" v-on:click="menu_click()">
            <label>
                <img class="v-sidebar1-icon" src="http://imgs.weijipet.com/img/menu.png" />
            </label>
        </div>
    
        <a v-for="(ul,key) in datas" v-bind:key="key" class="v-sidebar1-url">
            <div class="v-sidebar1-title" v-on:click="title_click(ul)" v-bind:title="ul.name" v-bind:class="{active:activeItem.name==ul.name}">
                <label>
                    <img class="v-sidebar1-icon" v-bind:src="ul.url_icon" />
                    <span v-if="!hidden">
                        {{ul.name}}
                    </span>
                </label>
            </div>
        </a>
        <div v-if="animate" class="v-sidebar1-title" v-on:click="menu_click()">
            <label>
                <img class="v-sidebar1-icon" v-bind:src="hidden?'http://imgs.weijipet.com/img/exit-right.png':'http://imgs.weijipet.com/img/exit-left.png'" />
            </label>
        </div>
    </div>
</template>

   <script>
// import Velocity from 'velocity'
export default {
  props: {
    value: Object,
    uid: {
      type: String,
      default: "v-sidebar1-1"
    },
    datas: Array,
    parentWidth: {
      type: Number,
      default: 200
    },
    animate: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      hidden: false,
      activeItem: {} 
    };
  },
  methods: {
    title_click: function(item) {
      this.$emit("activeChange", item);
    },
    menu_click: function() {
      var self = this;
      var t = document.getElementById(self.uid),
        p = t.parentElement;
      if (!self.hidden) {
        self.hidden = !self.hidden;
        this.Velocity(t, { width: "50" }, 500);
        this.Velocity(p, { width: "50" }, 500);
      } else {
        this.Velocity(t, { width: "200" }, 500, function() {
          self.hidden = !self.hidden;
        });
        this.Velocity(p, { width: this.parentWidth }, 500);
      }
    },
    Velocity(el, obj, interval, fn) {
      interval = interval | 500;
      el.ot = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var pre = window.getComputedStyle(el)[key],
            cur = parseFloat(pre.substring(0, pre.length - 2));
          var des = parseFloat(obj[key]),
            time = 20,
            dis = (des - cur) / (interval / time);

          el.ot[key] = setInterval(() => {
            if (dis > 0) {
              if (cur < des) {
                cur += dis;
                el.style[key] = cur + "px";
              } else {
                clearInterval(el.ot[key]);
                el.style[key] = des + "px";
                if (fn) fn();
              }
            } else {
              if (cur > des) {
                cur += dis;
                el.style[key] = cur + "px";
              } else {
                clearInterval(el.ot[key]);
                el.style[key] = des + "px";
                if (fn) fn();
              }
            }
          }, time);
        }
      }
    }
  },
  watch: {
    value(nval, oval) {
       this.activeItem = nval;
    }
  }
};
</script>

   <style lang="">
.v-sidebar1 {
  width: 200px;
  color: white;
  /* cursor: pointer; */
  user-select: none;
  background-color: transparent;
}

.v-sidebar1-title {
  position: relative;
  color: rgb(30, 180, 170);
  text-align: left;
  /* height: 60px; */
  line-height: 50px;
  font-size: 18px;
}

.v-sidebar1-title:hover {
  opacity: 0.7;
  color: white;
  background-color: rgba(30, 180, 170, 0.75);
}

.v-sidebar1-title label {
  margin-left: 50px;
  cursor: pointer;
}

.v-sidebar1-url {
  text-decoration-line: none;
  color: rgb(30, 180, 170);
}

.v-sidebar1-title.active {
  background-color: rgba(30, 180, 170, 0.75);
  color: white;
  border-left: 4px solid white;
}

.v-sidebar1-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  margin: -10px 0 0 0px;
  left: 10px;
}
</style>