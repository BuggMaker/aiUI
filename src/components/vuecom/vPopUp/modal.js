import Modal from './vModal.vue'
import Vue from 'vue'

let id = 0,
    modalInstanceAry = new Array();

function getModalInstance() {
    let _modalInstance,
        _component,
        _modal;

    _modalInstance = new Vue({
        render: ce => {
            return ce(Modal);
        }
    });
    _component = _modalInstance.$mount();
    _modal = _modalInstance.$children[0];

    return {
        instance: _modalInstance,
        component: _component,
        modal: _modal
    }
}

function notice(icon, config) {
    let instance = getModalInstance();
    // modalInstanceAry.push(instance);
    if (icon)
        config.icon = icon;
    // config.visableMask = true;

    instance.modal.show(config);

    return instance.modal;
}

export default {
    show(config) {
        return notice('', config);
    },
    info(config) {
        return notice('info default', config);
    },
    success(config) {
        return notice('complete success', config);
    },
    warn(config) {
        return notice('warn warn', config);
    },
    error(config) {
        return notice('warn error', config);
    },
    loading(config) {
        config.loading = true;
        return notice('', config);
    },
    add(item) {
        modalInstanceAry.push(item);
    },
    destory(item) {
        // 动画完成后移除节点        
        setTimeout(() => {
            let index = -1;
            if (modalInstanceAry.length == 1)
                index = 0;
            else
                for (var i = 0; i < modalInstanceAry.length; i++) {
                    if (modalInstanceAry[i]._uid == item._uid) {
                        index = i;
                        break;
                    }
                }
            if (index >= 0)
                modalInstanceAry.splice(index, 1);

            if (item.$el.parentElement)
                item.$el.parentElement.removeChild(item.$el);
        }, 1000);
    },
    hasMask(loading) {
        if (loading) {
            for (var i = 0; i < modalInstanceAry.length; i++) {
                if (modalInstanceAry[i].visableMask
                    && modalInstanceAry[i].$el.parentElement
                    && modalInstanceAry[i].$el.parentElement.nodeName == 'BODY'
                ) {
                    modalInstanceAry[i].visableMask = false;
                }
            }
        }
        else {
            var index = -1;
            for (var i = 0; i < modalInstanceAry.length; i++) {
                if (index < 0 && modalInstanceAry[i].visable) {
                    index = i;
                }
                modalInstanceAry[i].visableMask = false;
            }
            if (index > 0) {
                modalInstanceAry[index].visableMask = true;
                return true;
            }
        }
        return false;
    }
}

