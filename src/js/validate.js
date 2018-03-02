import Vue from 'vue'

let timerid = -1;
//定义指令
var directive = {
    inserted(el, ref, vNode) {

    },
    componentUpdated(el, ref, vNode) {
        //记录错误信息 用于反馈
        let error = '';
        //获取绑定值 包括验证规则和验证数据
        let ref$val = ref.value;
        // 验证规则和验证数据
        let rules = ref$val.rules,
            val = ref$val.value,
            handle = ref$val.handle,
            msg = ref$val.message;
        if (!rules) {
            return;
        }
        //获取数据长度
        let length = 0;
        if (val instanceof Array)
            length = val.length;
        else if (val instanceof Date){
            length = val.getTime();
        }
        else if (val instanceof Object) {
            length = Object.keys(val).length;
        } else
            length = val != null && val != undefined && val.toString() != '' ? val.toString().length : 0;

        let ruleKeys = [],
            newRules = {};
        if (rules instanceof Array) {
            rules.forEach(rule => {
                var ruleKey = Object.keys(rule);
                ruleKey = ruleKey.length > 0 ? ruleKey[0] : '';
                newRules[ruleKey] = rule;
            })
            ruleKeys = Object.keys(newRules);
            rules = newRules;
        } else if (typeof rules === 'object') {
            ruleKeys = Object.keys(rules);
        }


        for (var i = 0; i < ruleKeys.length; i++) {
            if (error)
                break;
            var key = ruleKeys[i],
                ruleVal = rules[key][key] || rules[key],
                ruleMsg = rules[key]['message'];
            switch (ruleKeys[i]) {
                case 'required':
                    // 判空
                    if (ruleVal == true) {
                        //空字符串 报错
                        if (length <= 0) {
                            error = ruleMsg || errMessages[key];
                        }
                    }
                    break;
                case 'length':
                    //长度过长 报错
                    if (length != ruleVal) {
                        error = ruleMsg || errMessages[key](ruleVal);
                    }
                    break;
                case 'minlength':
                    //长度不足 报错
                    if (length < ruleVal) {
                        error = ruleMsg || errMessages[key](ruleVal);
                    }
                    break;
                case 'maxlength':
                    //长度过长 报错
                    if (length > ruleVal) {
                        error = ruleMsg || errMessages[key](ruleVal);
                    }
                    break;
                case 'selected':
                    if (val < 0) {
                        error = ruleMsg || errMessages[key];
                    }
                    break;
            }
        }
        //判断是否需要反馈错误
        let uid = `err-msg-` + ref.expression,
            label = document.getElementById(uid),
            ukey = ref.expression.split('.').pop(); //ref$val.key ? ref$val.key : 

        if (!label) {
            label = document.createElement('div');
            label.id = uid;
            label.classList.add('val-msg');
            el.parentNode.appendChild(label);
        }
        if (error.length > 0) {
            //定位问题 position
            if (el.style.width == '100%') {
                if (!el.parentNode.style.position)
                    el.parentNode.style.position = 'relative';
                label.classList.add('val-msg-abs');
            } else {
                label.classList.remove('val-msg-abs');
            }
            //正误问题
            label.classList.remove('val-msg-success');
            label.classList.add('val-msg-error');
            label.innerText = error;
            el.classList.add('val-error');
            if (handle) {
                handle(ukey, false);
            }
        } else {
            if (el.style.width == '100%') {
                if (!el.parentNode.style.position)
                    el.parentNode.style.position = 'relative';
                label.classList.add('val-msg-abs');
            } else {
                label.classList.remove('val-msg-abs');
            }
            label.classList.remove('val-msg-error');
            // label.classList.add('val-msg-success');
            label.innerText = '';
            el.classList.remove('val-error');
            if (handle) {
                handle(ukey, true);
            }
        }

        // }, 500);
    }
}
var errMessages = {
    required: "必选字段",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    selected: "请选择一个选项",
    length: len => {
        return `请输入一个 长度是 ${len} 的字符串`
    },
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: maxlen => {
        return `请输入一个 长度最多是 ${maxlen} 的字符串`
    },
    minlength: minlen => {
        return `请输入一个 长度最少是 ${minlen} 的字符串`
    },
    rangelength: range => {
        return `请输入 一个长度介于 ${range[0]} 和 ${range[1]} 之间的字符串`
    },
    range: range => {
        return `请输入一个介于 ${range[0]} 和 ${range[1]} 之间的值`
    },
    max: max => {
        return `请输入一个最大为${max} 的值`
    },
    min: min => {
        return `请输入一个最小为${min} 的值`
    }
}
//注册 指令
Vue.directive('validate', directive);





function Validator(config) {

    //数据结构
    //key:可选,当对象名(如orgId)和post字段名(如id)不同时
    //value:必须
    // data:可选,当post(如orgId:10)和get(如{id:10,name:'某某'})字段不同时,这是因为get数据在前端显示需要name,而保存只需要id
    //rules:可选,数据验证规则,如required/maxlength/email/number等,更具需求选择
    //handle(key,val):可选,数据验证状态变更时触发,一般和rules同时出现

    // data struct example
    // let orgId = {
    //     //post Api 字段名;如果和变量名一致可省略,如orgId
    //     key: 'id',
    //     //post Api 字段对应数值
    //     value: -1,
    //     //get Api 
    //     data: {
    //         //字段名
    //         key: 'org',
    //         //数值
    //         value: {
    //             id: -1,
    //             name: ''
    //         }
    //     },
    //     rules: {
    //         required: true,
    //         maxlength: 20
    //     },
    //     handle: () => { }
    // }

    var _valid = config.data || {};
    if (config.handle) {
        Object.keys(_valid).forEach(v => {
            if (_valid[v].rules) {
                _valid[v]["handle"] = config.handle;
            }
        });
    }
    this._validOriginal = deepCopy(_valid);
    this._validResult = undefined;
    //将属性绑定在this对象身上 
    //数据变更监测待完善?
    bindWatcher(this, _valid);

}

Validator.prototype = {
    //根据 get data 初始化valid
    set(data) {
        Object.keys(this._validOriginal).forEach(key => {
            if (this[key].data) {
                this[key].data.value = data[this[key].data.key];
                if (this[key].data.value instanceof Array) {
                    var ary = [];
                    this[key].data.value.forEach(item => {
                        var obj = {};
                        if (this[key].data.fields instanceof Array) {
                            this[key].data.fields.forEach(field => {
                                obj[field] = item[field];
                            }, this)
                        } else {
                            Object.keys(this[key].data.fields).forEach(index => {
                                obj[this[key].data.fields[index]] = item[this[key].data.fields[index]];
                            }, this)
                        }
                        ary.push(obj);
                    }, this)
                    this[key].value = ary.slice();
                } else {
                    this[key].value = this[key].data.value.id;
                }
            } else if (this[key].key) {
                this[key].value = data[this[key].key];
            } else {
                this[key].value = data[key];
            }
        });
        return this;
        //bindWatcher(this, data);
    },
    //提取post data
    get() {
        var data = {};
        Object.keys(this._validOriginal).forEach(key => {
            if (this[key].key)
                data[this[key].key] = this[key].value;
            else data[key] = this[key].value;
        });
        return data;
    },
    //监视变量更改
    change(key, val) {
        if (!this._validResult) {
            this._validResult = new Map();
            Object.keys(this._validOriginal).forEach(key => {
                if (this[key].rules) this._validResult.set(key, false);
            });
        }
        this._validResult.set(key, val);
    },
    //判断是否符合规则
    check() {
        for (var val of this._validResult.values()) {
            if (!val) {
                return false;
            }
        }
        return true;
    },
    //初始化
    restore() {
        bindWatcher(this, deepCopy(this._validOriginal));
        this._validResult = undefined;
    }
}


function bindWatcher(obj, data) {
    Object.keys(data).forEach(function (key) {
        if (obj[key]) {
            obj[key] = data[key];
        } else {
            if (typeof data[key] == "object") {
                bindWatcher(data[key], deepCopy(data[key]));
            }
            Object.defineProperty(obj, key, {
                get: function () {
                    return data[key];
                },
                set: function (val) {
                    if (data[key] != val) {
                        data[key] = val;
                        //if (watch && watch[key]) watch[key](val);
                        // console.log(key, val);
                    }
                },
                enumerable: true,
                configurable: true
            });
        }
    });
}


function deepCopy(source) {
    var targe;
    if (source instanceof Array) {
        targe = new Array();
    } else {
        targe = new Object();
    }
    Object.keys(source).forEach(function (key) {
        if (typeof source[key] == 'function') {
            targe[key] = source[key];
        } else if (typeof source[key] == 'object') {
            targe[key] = deepCopy(source[key]);
            // targe[key] = JSON.parse(JSON.stringify(source[key]));
        } else {
            targe[key] = source[key];
        }
    });
    return targe;
}


export default Validator;