((global, lib) => {
    'use strict';

    function _sayHello(name) {
        alert(`hello , i am ${name}`);
    }

    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }

    //数据校验
    //参数data的属性:type(类型)/value(数值)/require(是否必须)/info(字段说明)
    //流程:首先判断是否为空:
    //1 如果是空的,必须就返回'不许为空',非必须pass不做操作;
    //2 如果非空的话,校验数据类型是否正确(不正确返回'数据类型错误');
    //返回值 0:报错 1:OK
    function _validCheck(datas) {
        let msg = '',
            code = 0;
        //获取数据类型
        let getType = Object.prototype.toString,
            nullType = getType.call(null),
            unType = getType.call(undefined);

        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            //数据类型
            let dataType = getType.call(data.value);
            if (dataType == nullType || dataType == unType || data.value.length == 0) {
                if (data.require) {
                    code = 0;
                    msg = data.info + '不许为空!';
                    break;
                }
            } else {
                //期待的数据类型
                let expType = (data.type.prototype || data.type.prototype == false) ? getType.call(data.type.prototype) : getType.call(data.type);
                if (dataType != expType) {
                    code = 0;
                    msg = data.info + `类型错误:希望是${expType},实际是${dataType}!`;
                    break;
                }
                else {
                    code = 1;
                    msg = 'ok';
                }
            };
        }
        return { code: code, msg: msg, data: data }
    }

    //枚举
    function _enumTypes() {
        return {
            /// <summary>
            /// 系统用户状态枚举，用于SysUser表
            /// </summary>
            StatusType: 0,
            /// <summary>
            /// 系统用户权限枚举，用于系统用户表、系统权限表
            /// </summary>
            PermissionType: 1,
            /// <summary>
            /// 用户性别枚举，用于职工/会员表
            /// </summary>
            SexType: 2,
            /// <summary>
            /// 员工状态枚举，用于Employee表
            /// </summary>
            EmployeeStatusType: 3,
            /// <summary>
            /// 会员卡积分变动类型，用于ClientCard_IntegralRecord表
            /// </summary>
            OrderChangeType: 4,
            /// <summary>
            /// 角色类型枚举（0会员（不考虑机构类型），即会员等级，1院长、2医疗总监、3市场总监、4财务总监、5仓储总监、6护理长、7医生类、8护理类、9前台类、10仓库类、11财务类、12销售类）
            /// </summary>
            RoleType: 5,
            /// <summary>
            /// 机构类型枚举，用于org/role表
            /// </summary>
            OrgType: 6,
            /// <summary>
            /// 申请类型，用于商品处理申请表
            /// </summary>
            ApplyType: 7,
            /// <summary>
            /// 申请状态类型，用于商品处理申请表
            /// </summary>
            ApplyStatusType: 8,
            /// <summary>
            /// 消息类型，用于商品提醒信息
            /// </summary>
            MsgType: 9,
            /// <summary>
            /// 消息状态类型，用于商品提醒信息
            /// </summary>
            MsgStatusType: 10,
            /// <summary>
            /// 付款方式枚举，用于订单-付款信息表
            /// </summary>
            PayType: 11,
            /// <summary>
            /// 订单类型，用于商品-订单表
            /// </summary>
            OrderType: 12,
            /// <summary>
            /// 订单状态（0未支付，1已支付，2已申请退款，3已退款，4已关闭），用于商品-订单表
            /// </summary>
            OrderStatusType: 13,
            /// <summary>
            /// 出库类型枚举，用于商品出库记录
            /// </summary>
            OutRecordType: 14,
            /// <summary>
            /// 当前批次状态枚举，用于商品入库明细
            /// </summary>
            CurrentBatchStatusType: 15,
            /// <summary>
            /// 商品类别，用于商品表
            /// </summary>
            GoodType: 16,
            /// <summary>
            /// 商品的名称等级
            /// </summary>
            GradeType: 17
        }
    }

    //遍历树 并添加属性字段
    function _addPropsToTree(...args) {
        if (args.length == 2) {
            let treenode = args[0], params = args[1], fn = args[1];
            if (args[1] instanceof Function) {
                //多个根节点
                if (treenode instanceof Array)
                    treenode.forEach(function (node) {
                        fn(node);
                        if (node.items) {
                            _addPropsToTree(node.items, fn);
                        }
                    }, this);
                //只有一个根节点
                else {
                    fn(treenode);
                    if (treenode.items) {
                        _addPropsToTree(treenode.items, fn);
                    }
                }
            }
            else if (args[1] instanceof Array) {
                //多个根节点
                if (treenode instanceof Array)
                    treenode.forEach(function (node) {
                        addProps(node, params);
                    });
                //只有一个根节点
                else {
                    if (treenode)
                        addProps(treenode, params);
                }
            }
            return treenode;
        }

        function addProps(treenode, params) {
            params.forEach(function (param) {
                if (param.rules) {
                    Object.keys(param.rules).forEach(ruleKey => {
                        switch (ruleKey) {
                            case 'id':
                            case 'typeNum':
                            case 'levelNum':
                                addProp(treenode, ruleKey, param.rules[ruleKey], param.props);
                                break;
                            case 'ids':
                            case 'types':
                            case 'levels':
                                break;
                            case 'minlevel':
                                break;
                            case 'maxlevel':
                                break;
                        }
                    });
                }
                else {
                    param.props.forEach(p => {
                        treenode[p.name] = p.value;
                    })
                    _addPropsToTree(treenode.items, params)
                }
            })
        }

        function addProp(treenode, key, val, props) {
            if (treenode[key] == val) {
                props.forEach(p => {
                    treenode[p.name] = p.value;
                })
            } else if (treenode.items) {
                treenode.items.forEach(node => {
                    addProp(node, key, val, props);
                })
            }
        }
    }

    function _setNodes(vue, parentNode, exceptNode, name, val) {
        if (parentNode instanceof Array) {
            parentNode.forEach(function (childNode) {
                if (
                    exceptNode.id != childNode.id ||
                    exceptNode.name != childNode.name
                ) {
                    vue.$set(childNode, name, val);
                }
                if (childNode.items) {
                    _setNodes(vue, childNode.items, exceptNode, name, val);
                }
            });
        } else {
            if (
                exceptNode.id != parentNode.id ||
                exceptNode.name != parentNode.name
            ) {
                vue.$set(parentNode, name, val);
            }
            if (parentNode.items) {
                _setNodes(vue, parentNode.items, exceptNode, name, val);
            }
        }
    }

    function _getNodes(resultAry, nodes, name, val = true) {
        if(!nodes) return;
        if (nodes instanceof Array) {
            nodes.forEach(childNode => {
                if (childNode[name] == val) {
                    resultAry.push(childNode);
                }
                _getNodes(resultAry, childNode.items, name, val);
            });
        } else {
            if (nodes[name] == val) {
                resultAry.push(nodes);
            }
            _getNodes(resultAry, nodes.items, name, val);
        }
    }

    function getTreeNode(treenode, id, name) {
        if (treenode.id == id && treenode.name == name) {
            return treenode;
        } else {
            if(!treenode.items) return null;
            for (var i = 0; i < treenode.items.length; i++) {
                var node = getTreeNode(treenode.items[i], id,name);
                if (node)
                    return node;
            }
        }
        return null;
    }

    function _deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    lib.SayHello = _sayHello;
    //数据校验
    lib.Validator = _validCheck;
    //枚举
    lib.EnumTypes = new _enumTypes();
    //遍历树 并添加属性字段
    lib.AddPropsToTree = _addPropsToTree;

    lib.SetNodes = _setNodes;
    lib.GetNodes = _getNodes;
    lib.GetNode = getTreeNode;
    //JS对象深度拷贝
    lib.DeepCopy = _deepCopy;
})(this, this.unity = {});
