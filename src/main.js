//第三方 支持库
import Vue from 'vue'
import axios from 'axios'

//第三方 组件
//iView 组件
import iview from 'iview'
//iview 样式
// import 'iview/dist/styles/iview.css'
//自定义主题
import './style/index.less'
Vue.use(iview);


//自定义样式
import './style/main.css'

//自定义 vue component
import VAddress from './components/vuecom/vAddress.vue'
import VCombox from './components/vuecom/vCombox.vue'
import VDetail from './components/vuecom/vDetail.vue'
import VIcon from './components/vuecom/vIcon.vue'
import VLoading from './components/vuecom/vLoading.vue'
import VPage from './components/vuecom/vPage.vue'
import vForm from './components/vuecom/vForm.vue'
import VPanel from './components/vuecom/vPanel.vue'
import VProgress from './components/vuecom/vProgress.vue'
import VSearch from './components/vuecom/vSearch.vue'
import VSidebar from './components/vuecom/vSidebar1.vue'
import VTab from './components/vuecom/vTab.vue'
import VDataTable from './components/vuecom/vTable.vue'
import VToolbar from './components/vuecom/vToolbar.vue'
//vDropDown
import VDropDown from './components/vuecom/vDropDown/vDropDown.vue'
import VGroupDropDown from './components/vuecom/vDropDown/vGroupDropDown.vue'
import VTreeDropDown from './components/vuecom/vDropDown/vTreeDropDown.vue'
import VDropDownTree from './components/vuecom/vDropDown/vDropDownTree.vue'
//vPopup
import VModal from './components/vuecom/vPopUp/vModal.vue'
//vTree
import VTreeList from './components/vuecom/vTree/vTreeList.vue'
import VTree from './components/vuecom/vTree/vTree.vue'
//vInput
import VButton from './components/vuecom/vInput/vButton.vue'
import VText from './components/vuecom/vInput/vText.vue'
import VTextarea from './components/vuecom/vInput/vTextarea.vue'
import VNumber from './components/vuecom/vInput/vNumber.vue'
import VDate from './components/vuecom/vInput/vDate.vue'
//vGrid
import VRow from './components/vuecom/vGrid/vRow.vue'
import VCol from './components/vuecom/vGrid/vCol.vue'

//自定义App component
//common
//appTree
import AppGoodsClass from './components/appcom/common/appTree/appGoodsClass.vue'
import AppSysUserOrg from './components/appcom/common/appTree/appSysUserOrg.vue'
import AppSidebar from './components/appcom/common/appSidebar.vue'
import AppLogin from './components/appcom/common/appLogin.vue'
import AppStorage from './components/appcom/storage/appStorage.vue'
import AppFoundation from './components/appcom/foundation/appFoundation.vue'
import AppStaff from './components/appcom/staff/appStaff.vue'
import AppBranch from './components/appcom/management/appBranch.vue'
import AppUserInfo from './components/appcom/sysUser/appUserInfo.vue'
import AppRegister from './components/appcom/register/AppRegister.vue'
//测试
import AppTest from './components/appcom/appTest.vue'

//自定义工具模块
import myrequest from './js/myrequest.js'
import {
    myhttp,
    myhttp1
} from './js/myhttp.js'
import utils from './js/utils.js'
import domPortal from './js/dom-portal.js'
import Validator from './js/validate.js'
import extention from './js/entention.js'
import dateOption from './js/dateOption.js'

//全局提示和弹窗
import Message from './components/vuecom/vPopUp/message'
import Modal from './components/vuecom/vPopUp/modal'

Vue.prototype.$http = axios;
//自定义模块
Vue.prototype.myunity = utils.unity;
Vue.prototype.myUtils = utils.unity;
Vue.prototype.myRequest = myrequest;
Vue.prototype.myhttp = myhttp1;
Vue.prototype.myHttp = myhttp;
Vue.prototype.validator = Validator;
Vue.prototype.dateOption = dateOption;
//注册 自定义指令v-directive
Vue.use(domPortal);
// Vue.use(Validator.plugin);
//全局提示和弹窗
Vue.prototype.message = Message;
Vue.prototype.modal = Modal;


const bView = {
    VAddress,
    VCombox,
    VDetail,
    VDropDown,
    VGroupDropDown,
    VDropDownTree,
    VIcon,
    VLoading,
    VModal,
    VPage,
    vForm,
    VPanel,
    VProgress,
    VSearch,
    VSidebar,
    VTab,
    VDataTable,
    VToolbar,
    VTreeDropDown,
    VTreeList,
    VTree,
    VButton,
    VText,
    VTextarea,
    VNumber,
    VDate,
    VRow,
    VCol
}
Object.keys(bView).forEach(key => {
    Vue.component(key, bView[key]);
})
const appView = {
    AppBranch,
    AppFoundation,
    AppGoodsClass,
    AppLogin,
    AppSidebar,
    AppStaff,
    AppStorage,
    AppSysUserOrg,
    AppUserInfo,
    AppRegister,
    AppTest
}
Object.keys(appView).forEach(key => {
    Vue.component(key, appView[key]);
})

window.onload = function () {
    new Vue({
        el: '#app',
        data() {
            return {
                // progress: {visable:'false',val:NaN},
                sysUser: {},
                showNotify: true,
                msg: 'Hello World!'
            }
        },
        mounted: function () {
            var self = this;
            self.$http.get('/api/Member/GetSysUser')
                .then((response) => {
                    self.sysUser = response.data.data;
                    var location = window.location.pathname.split('/')
                    if (!self.sysUser.isSignIn && location[1] != 'Login' && location[1] != '') {
                        window.location = '../Login/Index'
                    }
                })
                .catch(error => {

                })
        }
    });
}