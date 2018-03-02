<<template>
  <div class="user-icon" v-on:click="click">
      <div class="full" style="background-color:rgba(20, 20, 20, 0.6);">
           <input class="user-icon-img" type="image" v-bind:src="info.userHeadImg"/>
           <div class="user-icon-name" v-bind:title="info.loginName">{{info.loginName}}</div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        info: {
            type: Object,
            default: () => {
                return {
                    loginName: 'UserName',
                    userHeadImg: 'http://imgs.weijipet.com/img/usericon.jpg'
                }
            }
        },
        css: String
    },
    methods: {
        click(e) {
            this.$emit('click', e);
        }
    }
}
</script>

<style>
.user-icon {
    cursor: pointer;
    position: relative;
    width: 200px;
    height: 100px;
    /* border-bottom: 2px solid white; */
    background-image: url(http://imgs.weijipet.com/img/usericon.jpg);
    background-size: cover;
}

.user-icon-name {
    position: absolute;
    top: 0;
    right: 0;
    width: 130px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
    color: white;
    overflow: hidden;
    padding: 0 10px;
}

.user-icon-img {
    position: absolute;
    top: 50%;
    left: 25%;
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
    border-radius: 50%;
    cursor: pointer;
}

.user-icon-img:hover {
    box-shadow: 1px 1px 5px white;
}
</style>
