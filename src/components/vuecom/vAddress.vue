<template>
    <span class="address" v-on:click.stop="click">
        <div class="address-option">
            <label>{{holder}}</label>
            <span class="arrow top"></span>
        </div>
        <div v-show="show" class="address-content" v-on:click.stop="()=>{}" v-on:keydown.enter="ok_click">
            <span class="address-item scroll" title="省" v-if="address.province">
                <div>省</div>
                <ul>
                    <li class="address-province" v-bind:class="{active:address.province.name==p.name}" v-for="(p,k) in places" v-bind:key="k" v-on:click.stop="p_click(p)">{{p.name}}</li>
                </ul>
            </span>
            <span class="address-item scroll" title="市" v-if="address.city">
                <div>市</div>
                <ul>
                    <li class="address-city" v-bind:class="{active:address.city.name==c.name}" v-for="(c,k) in address.province.cities" v-bind:key="k" v-on:click.stop="c_click(c)">{{c.name}}</li>
                </ul>
            </span>
            <span class="address-item scroll" title="县" v-if="address.county">
                <div>县区</div>
                <ul>
                    <li class="address-county" v-bind:class="{active:address.county==t}" v-for="(t,k) in address.city.counties" v-bind:key='k' v-on:click.stop="ct_click(t)">{{t}}</li>
                </ul>
            </span>
            <div class="clear center">
                <input class="address-btn btn submit" type="button" value="确定" v-on:click.stop="ok_click" />
            </div>
        </div>
    </span>
</template>

<script>
export default {
    data: function() {
        var datas = [
            {
                name: '北京市',
                cities: [{
                    name: '北京市',
                    counties: ['东城区', '西城区', '朝阳区', '丰台区']
                }]
            },
            {
                name: '山东省',
                cities: [{
                    name: '济南市',
                    counties: ['历下区', '市中区', '槐荫区', '天桥区']
                }, {
                    name: '青岛市',
                    counties: ['市南区', '市北区', '黄岛区', '崂山区', '李沧区']
                }, {
                    name: '聊城市',
                    counties: ['东昌府区', '冠县', '莘县', '茌平县', '临清市']
                }]
            }];
        return {
            //通过请求获取数据
            places: datas,
            address: { province: datas[0], city: datas[0].cities[0], county: datas[0].cities[0].counties[0] },
            show: false
        }
    },
    computed: {
        holder: function() {
            var result = '请选择一个区域'
            if (this.address.province && this.address.province.name) {
                result = `${this.address.province.name} › ${this.address.city.name} › ${this.address.county}`;
            }
            return result;
        },
    },
    updated() {
        var self = this;
        if (document.onclick)
            document.onclick = null;
        document.onclick = function(e) {
            if (self.show)
                self.show = false;
        }
    },
    methods: {
        click: function() {
            this.show = !this.show;
        },
        //省份点击
        p_click: function(p) {
            this.address = {
                province: p,
                city: p.cities[0],
                county: p.cities[0].counties[0]
            }
        },
        //城市点击
        c_click: function(c) {
            this.address.city = c;
            this.address.county = c.counties[0];
        },
        //县区点击
        ct_click: function(ct) {
            this.address.county = ct;
        },
        //提交
        ok_click: function() {
            this.show = false;
            this.$emit('submit', this.holder);
        }
    }
}
</script>

<style>
.arrow {
    position: absolute;
    width: 0;
    height: 0;
    right: 10px;
    top: 50%;
    margin-top: -3px;
    display: inline-block;
}

.arrow.top {
    border-top: 6px solid gray;
    border-bottom: 6px solid transparent;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
}

.address {
    position: relative;
    display: inline-block;
    color: gray;
    background-color: white;
    border: 1px solid lightgray;
    cursor: pointer;
}

.address-option {
    position: relative;
    height: 30px;
    line-height: 30px;
    padding: 0 30px 0 10px;
}

.address-content {
    position: absolute;
    top: 35px;
    left: 0;
    background-color: white;
    z-index: 100;
    min-width: 400px;
    border: 1px solid lightgray;
}

.address-item {
    display: inline-flex;
    padding: 10px;
    height: 200px;
    border-left: 1px solid lightgray;
}

.address-province,
.address-city,
.address-county {
    padding: 5px 10px;
    margin: 0 5px;
}

.address-province:hover,
.address-city:hover,
.address-county:hover {
    background-color: lightgray;
    cursor: pointer;
}

.address .active {
    color: white;
    background-color: rgb(30, 180, 170);
}
</style>
