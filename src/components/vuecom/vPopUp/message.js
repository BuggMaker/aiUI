import Notification from './vNotification.vue'
import Vue from 'vue'
let id = 0,
    notices = new Array();
let mesInstance = new Vue({    
    render: ce => {
        return ce(Notification);
    }
});

let component = mesInstance.$mount();
document.body.appendChild(component.$el);
let notification = mesInstance.$children[0];

function notice(type, msg, interval) {
    let props = {};
    if (type)
        props.type = type;
    if (msg)
        props.msg = msg;
    if (interval)
        props.interval = interval;
    props.name = 'msg' + id++;

    console.log('_nName: ' + props.name);

    notification.add(props);
}

export default {
    info(msg, interval) {
        notice('info default', msg, interval);
    },
    success(msg, interval) {
        notice('complete success', msg, interval);
    },
    warn(msg, interval) {
        notice('warn warn', msg, interval);
    },
    error(msg, interval) {
        notice('warn error', msg, interval);
    }
}
