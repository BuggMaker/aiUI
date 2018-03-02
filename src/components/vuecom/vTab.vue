    <template>
    <div class="vtab-t box1">
        <div class="box-vertical full">
            <div class="vtab-t-titles">
                <!-- <ul> -->
                <span class="vtab-t-title" v-for="(title,index) in titles" v-bind:key="index" v-bind:class="{active:index==page}" v-on:click="tabClick(index)">{{title}}</span>
                <!-- </ul> -->
            </div>
            <div class="vtab-t-pages hidden box1">
                <label style="opacity:0">{{d}}</label>
                <transition v-for="(title,index) in titles" v-bind:key="index" v-bind:name="fadeDirections[index] ? 'fade-rl' : 'fade-lr'">
                    <div class="vtab-t-page box-vertical full" v-show="index==page" v-bind:class="{active:index==page}">
                        <slot v-bind:name="title"></slot>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
    
    <script>
export default {
    props: {
        titles: {
            type: Array,
            default: function() { return ['Tab1', 'Tab2']; }
        },
        position: {
            type: String,
            default: 'top'
        }
    },
    data: function() {
        var direcs = [];
        for (var i = 0; i < this.titles.length; i++) {
            direcs.push(false);
        }
        direcs[0] = true;
        return {
            page: 0,
            fadeDirections: direcs,
            d: true
        }
    },
    computed: {
        fadeName: function() {
            return this.fadeDirections[this.page] ? 'fade-rl' : 'fade-lr';
        }
    },
    methods: {
        tabClick: function(index) {
            if (this.page == index)
                return;
            this.page = index;
            this.fadeDirections[index] = !this.fadeDirections[index];
            this.d = this.fadeDirections[index];
            //如果点完是true 则其前面的都为true
            if (this.fadeDirections[index]) {
                for (var i = 0; i < index; i++) {
                    this.fadeDirections[i] = this.fadeDirections[index];
                }
            }
            else//如果点完是false 则其后面的都为false
            {
                for (var i = this.titles.length - 1; i > index; i--) {
                    this.fadeDirections[i] = this.fadeDirections[index];
                }

            }

            var self = this;
            setTimeout(function() {
                if (index == self.titles.length - 1 || index == 0) {
                    self.fadeDirections[index] = !self.fadeDirections[index];
                    self.d = self.fadeDirections[index];
                }
            }, 700);
        }
    }
}
</script>
    <style>
.vtab-t {
    margin: 10px 5px 5px 5px;
    min-height: 100px;
    /* border: 1px solid lightgray; */
}

.vtab-t-titles {
    background-color: white;
    border-bottom: 1px solid lightgray;
}

.vtab-t-title {
    display: inline-block;
    padding: 15px;
    /*width: 80px;*/
    line-height: 20px;
    list-style: none;
    text-align: center;
    color: gray;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    /* float: left; */
}

.vtab-t-title:hover {
    border-bottom: 1px solid rgba(30, 180, 170, 1);
}

.vtab-t-title.active {
    color: rgba(30, 180, 170, 1);
    border-bottom: 3px solid rgba(30, 180, 170, 1);
}

.vtab-t-pages {
    min-height: 100px;
    margin: 10px 0px 0px 0px;
}

.vtab-t-page {
    /* display: none; */
}

.vtab-t-page.active {
    display: block;
}
</style>
    