//请求对象  钩子函数
export function myhttp(obj, hooks) {
    //1 请求/提交服务前执行
    if (hooks.beforeRequest)
        hooks.beforeRequest();
    this.$http({
        method: obj.method,
        url: obj.url,
        data: obj.data,
        config: obj.config
    }).then(res => {
        //2 请求成功后执行
        if (hooks.successed) {
            if (res.data.state == 10000)
                hooks.successed(res.data);
            else {
                //4 请求失败时执行
                if (hooks.failed) {
                    hooks.failed(res.data);
                }
            }
        }
        //3 请求数据处理完后执行
        if (hooks.afterSuccessed)
            hooks.afterSuccessed();
    }).catch(err => {
        //4 请求失败时执行
        if (hooks.failed) {
            hooks.failed(err);
        } else {
            console.log(err);
        }
    })
    //5 请求/提交服务后执行
    if (hooks.afterRequest)
        hooks.afterRequest();
}

//obj包括hooks
export function myhttp1(obj) {
    //1 请求/提交服务前执行
    if (obj.beforeRequest)
        obj.beforeRequest();
    this.$http({
        method: obj.method,
        url: obj.url,
        data: obj.data,
        config: obj.config
    }).then(res => {
        //2 请求成功后执行
        if (obj.successed) {
            if (res.data.state == 10000)
                obj.successed(res.data);
            else
                //4 请求失败时执行
                if (obj.failed) {
                    obj.failed(res.data);
                }
        }
        // //3 请求数据处理完后执行
        // if (obj.afterSuccessed)
        //     obj.afterSuccessed();
            
        //5 请求/提交服务后执行
        if (obj.afterRequest)
        obj.afterRequest();
    }).catch(err => {
        //4 请求失败时执行
        if (obj.failed) {
            obj.failed(err);
        }
        //5 请求/提交服务后执行
        if (obj.afterRequest)
            obj.afterRequest();
    })
}

//请求参数
export function fetch(params) {
    var init = {
        method: params.method || 'get',
        url: params.url,
        config: "Content-Type:'application/json'"
    }
    if (params.data)
        init.data = params.data;
    //请求字符串拼接
    if (params.query) {
        var strQuery = '';
        for (var key in params.query) {
            if (params.query.hasOwnProperty(key)) {
                var element = params.query[key];
                strQuery += `${key}=${element}&`
            }
        }
        strQuery = strQuery.substr(0, strQuery.length - 1);
        init.url += `?${strQuery}`;
    }
    return init;
}
