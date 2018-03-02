
   <template>
    <div class="v-sidebar" v-bind:id="uid">
        <div v-if="animate" class="v-sidebar-title" v-on:click="menu_click()">
            <label>
                <img class="v-sidebar-icon" src="url_img+img/menu.png" />
            </label>
        </div>
    
        <div v-for="(ul,key) in datas" v-bind:key="key">
            <!--<input class ="v-sidebar-title" type="button" v-bind:value="ul.name" />-->
            <div class="v-sidebar-title" v-on:click="title_click(ul.name)" v-bind:title="ul.name" v-bind:class="{active:activeItem.title==ul.name}">
                <label>
                    <img class="v-sidebar-icon" v-bind:src="ul.url_icon" />
                    <span v-if="!hidden">
                        {{ul.name}}
                        <span v-show="ul.items.length>0" class="v-sidebar-arrow" v-bind:class="[expanded[ul.name]?'down':'right']"></span>
                    </span>
                </label>
            </div>
            <transition-group name="fade" v-if="ul.items.length>0">
                <!--<span v-bind:key="'tip-arrow'+ul.name" class ="tip-arrow" v-show="hidden&&expanded[ul.name]"></span>-->
                <ul v-bind:key="'v-sidebar-items'+ul.name" class="v-sidebar-items" v-show="expanded[ul.name]" v-bind:class="{hidden:hidden}">
                    <a class="v-sidebar-url" v-for="(val,key) in ul.items" v-bind:key="key" v-bind:href="val.url">
                        <li class="v-sidebar-item" v-on:click="item_click(ul,val)" v-bind:class="{active:(activeItem.title==ul.name&&activeItem.item==val)}">{{val.name}}</li>
                    </a>
                </ul>
            </transition-group>
        </div>
        <div v-if="animate" class="v-sidebar-title" v-on:click="menu_click()">
            <label>
                <img class="v-sidebar-icon" v-bind:src="hidden?'url_img+img/exit-right.png':'url_img+img/exit-left.png'" />
            </label>
        </div>
    </div>
</template>

   <script>
// import Velocity from 'velocity'
export default {
    props: {
        uid: {
            type: String,
            default: 'v-sidebar-1'
        },
        url_img:{
            type:String,
            default:'http://imgs.weijipet.com/'
        },
        datas: Array,
        parentWidth: {
            type: Number,
            default: 167
        },
        animate: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        var dic = {};
        this.datas.forEach(function (ul) {
            dic[ul.name] = false;
        })
        return {
            expanded: dic,
            hidden: false,
            activeItem: { title: '', item: '' }
        }
    },
    methods: {
        title_click: function (name) {
            this.expanded[name] = !this.expanded[name];
            if (this.hidden) {
                for (var ul_name in this.expanded) {
                    if (ul_name != name) {
                        this.expanded[ul_name] = false;
                    }
                }
            }
        },
        menu_click: function () {
            var self = this;
            var t = document.getElementById(self.uid),
                p = t.parentElement;;
            if (!self.hidden) {
                self.hidden = !self.hidden;
                this.Velocity(t, { width: '40' }, 500);
                for (var ul_name in this.expanded) {
                    this.expanded[ul_name] = false;
                }
                this.Velocity(p, { width: '40' }, 500);
            }
            else {
                this.Velocity(t, { width: '150' }, 500, function () {
                    self.hidden = !self.hidden;
                    if (self.activeItem.title.length > 0) {
                        var name = self.activeItem.title;
                        self.expanded[name] = true;
                    }
                });
                this.Velocity(p, { width: this.parentWidth }, 500);
            }
        },
        item_click: function (ul, li) {
            if (this.hidden)
                this.expanded[ul.name] = !this.expanded[ul.name];

            this.activeItem = { title: ul.name, item: li };
        },
        Velocity(el, obj, interval,fn) {
            interval = interval | 500;
            el.ot={};
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
                                el.style[key] = cur + 'px';
                            }
                            else {
                                clearInterval(el.ot[key]);
                                el.style[key] = des + 'px';
                                if(fn) fn();
                            }
                        }
                        else {
                            if (cur > des) {
                                cur += dis;
                                el.style[key] = cur + 'px';
                            }
                            else {
                                clearInterval(el.ot[key]);
                                el.style[key] = des + 'px';
                                if(fn) fn();
                            }
                        }
                    }, time)
                }
            }
        }
    }
}
</script>

   <style lang="">
.v-sidebar {
    /*margin: 5px;*/
    /*position:absolute;*/
    width: 150px;
    color: white;
    cursor: pointer;
    user-select: none;
    /*height: 100%;*/
    /*overflow: hidden;*/
    /*background-color: rgba(50,50,50,0.7);*/
    background-color: transparent;
}

.v-sidebar-title {
    position: relative;
    color: rgb(30, 180, 170);
    text-align: left;
    /*width: 130px;*/
    height: 40px;
    line-height: 40px;
    /*border-bottom: 1px solid white;*/
    opacity: 0.7;
}

.v-sidebar-title:hover {
    opacity: 1;
}

.v-sidebar-title label {
    margin-left: 40px;
    cursor: pointer;
}

.v-sidebar-url {
    text-decoration-line: none;
    color: rgb(30, 180, 170);
}

.v-sidebar-title.active {
    background-color: rgba(30, 180, 170, 0.75);
    color: white;
}

.v-sidebar-items {
    list-style: none;
    background-color: rgba(250, 250, 250, 0.1);
    z-index: 10;
}

.v-sidebar-items.hidden {
    position: absolute;
    margin-top: -41px;
    padding: 5px;
    left: 55px;
    border-radius: 5px;
    background-color: rgba(10, 10, 10, 1);
}

.v-sidebar-item {
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dashed lightgray;
    padding: 5px;
    color: rgb(30, 180, 170);
}

.v-sidebar-item:hover {
    background-color: rgba(155, 13, 221, 0.5);
    color: white;
}

.v-sidebar-item.active {
    background-color: rgba(5, 136, 247, 0.8);
    color: white;
}


.v-sidebar-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    margin: -10px 0 0 0px;
    left: 10px;
}

.v-sidebar-arrow {
    position: absolute;
    right: 10px;
    display: inline-block;
    top: 50%;
    width: 0;
    height: 0;
}

.tip-arrow {
    position: absolute;
    left: 39px;
    display: inline-block;
    width: 0;
    height: 0;
    margin-top: -25px;
    border-top: 8px solid transparent;
    border-right: 8px solid rgba(10, 10, 10, 0.5);
    border-bottom: 8px solid transparent;
    border-left: 8px solid transparent;
    z-index: 10;
}

.v-sidebar-arrow.down {
    margin: 0px -3px 0 0;
    border-top: 6px solid white;
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid transparent;
}

.v-sidebar-arrow.right {
    margin: -6px 0 0 0;
    border-top: 6px solid transparent;
    border-left: 6px solid white;
    border-bottom: 6px solid transparent;
    border-right: 6px solid transparent;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease;
}
</style>