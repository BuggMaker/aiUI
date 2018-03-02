import {
    fetch
} from './myhttp.js'
export default {
    //Basics
    //通过enum类型获取枚举
    getEnumsByType: (_enumType) => {
        return fetch({
            url: `/api/Basics/GetEnumsByType`,
            query: {
                enumType: _enumType
            }
        })
    },


    /************ Goods ************/
    //获取商品分类树结构
    getAllGoodsClass: () => {
        return fetch({

            url: '/api/Goods/GetAllGoodsClass'
        })
    },
    //根据商品分类和关键词查询商品列表
    getGoodsList: (params) => {
        return fetch({
            method: 'post',
            url: '/api/Goods/GetGoodsList',
            data: params
        })
    },
    //保存商品分类 
    saveGoodsClass: (params) => {
        return fetch({
            method: 'post',
            url: '/api/Goods/SaveGoodsClass',
            data: params
        })
    },
    //删除商品分类
    deletaGoodsClassById: (_goodsClassId) => {
        return fetch({
            url: '/api/Goods/DeleteGoodsClassById',
            query: {
                goodsClassId: _goodsClassId
            }
        })
    },
    //获取商品详情
    getGoodDetail: _goodId => {
        return fetch({
            url: '/api/Goods/GetGoodsDetailById',
            query: {
                goodsId: _goodId
            }
        })
    },
    //保存商品详情
    saveGood: params => {
        return fetch({
            method: 'post',
            url: '/api/Goods/SaveGoods',
            data: params
        })
    },
    //删除商品
    deleteGood: _goodId => {
        return fetch({
            url: '/api/Goods/DeleteGoodsById',
            query: {
                goodsId: _goodId
            }
        })
    },
    //获取商品提醒设置
    getGoodsRemindConfigList: params => {
        return fetch({
            method: 'post',
            url: '/api/Goods/GetGoodsRemindConfigList',
            data: params
        })
    },
    //保存商品提醒设置
    saveGoodsRemindConfig: params => {
        return fetch({
            method: 'post',
            url: '/api/Goods/SaveGoodsRemindConfig',
            data: params
        })
    },
    //保存 商品申请
    saveGoodsApply: params => {
        return fetch({
            method: 'post',
            url: '/api/Goods/SaveGoodsApply',
            data: params
        })
    },
    //获取商品申请列表
    getGoodsApplyList: params => {
        return fetch({
            method: 'post',
            url: '/api/Goods/GetGoodsApplyList',
            data: params
        })
    },
    //获取商品申请详情
    getGoodsApplyDetail: _goodsApplyId => {
        return fetch({
            url: '/api/Goods/GetGoodsApplyDetail',
            query: {
                goodsApplyId: _goodsApplyId
            }
        })
    },
    //获取商品提醒（数量、日期）列表
    getGoodsRemindList: params => {
        return fetch({
            method: 'post',
            url: '/api/Goods/GetGoodsRemindList',
            data: params
        })
    },
    //获取其他未申请商品列表
    getGoodsNotInRemindList: params => {
        return fetch({
            method: 'post',
            url: '/api/Goods/GetGoodsNotInRemindList',
            data: params
        })
    },
    //处理申请
    handleGoodsApply: params => {
        return fetch({
            method: 'post',
            url: '/api/Goods/HandleGoodsApply',
            data: params
        })
    },
    deleteGoodsApply: applyId => {
        return fetch({
            url: '/api/Goods/DeleteGoodsApplyById',
            query: {
                goodsApplyId: applyId
            }
        })
    },

    /************ Member ************/
    //登录
    login: params => {
        return fetch({
            method: 'post',
            url: '/api/Member/Login',
            data: params
        })
    },
    //登出
    exit: () => {},
    //获取系统用户
    getSysUser: () => {
        return fetch({

            url: '/api/Member/GetSysUser'
        })
    },
    //改变机构
    changeOrgById: _orgId => {
        return fetch({
            url: '/api/Member/ChangeOrgById',
            query: {
                orgId: _orgId
            }
        })
    },
    //获取系统角色(不包含VIP)
    getSysRolesNotContainVip: () => {
        return fetch({

            url: '/api/Member/GetSysRolesNotContainVip'
        })
    },
    //获取机构角色列表
    getOrgRolesNotContainVip: () => {
        return fetch({
            url: '/api/Member/GetOrgRolesNotContainVip'
        })
    },
    //通过角色id获取权限列表
    getPermissionsByRoleId: _roleId => {
        return fetch({
            url: '/api/Member/GetPermissionsByRoleId',
            query: {
                roleId: _roleId
            }
        })
    },
    //保存角色 (_id, _roleName, _orgType, _roleType, _grade)
    saveRole: params => {
        return fetch({
            method: 'post',
            url: '/api/Member/SaveRole',
            data: params
        })
    },
    //删除角色
    deleteRoleById: _roleId => {
        return fetch({
            url: '/api/Member/DeleteRoleById',
            query: {
                roleId: _roleId
            }
        })
    },
    //保存角色权限
    saveRolePermission: params => {
        return fetch({
            method: 'post',
            url: '/api/Member/SaveRolePermission',
            data: params
        })
    },
    //获取系统用户所在机构的所有员工列表
    getAllEmployees: () => {
        return fetch({
            url: '/api/Member/GetAllEmployees'
        })
    },
    getEmployeeList: params => {
        return fetch({
            method: 'post',
            url: '/api/Member/GetEmployeeList',
            data: params
        })
    },
    //获取员工信息
    getEmployeeInfo: _employId => {
        return fetch({
            url: '/api/Member/GetEmployeeDetailById',
            query: {
                employeeId: _employId
            }
        })
    },
    //保存员工信息
    saveEmployee: params => {
        return fetch({
            method: 'post',
            url: '/api/Member/SaveEmployee',
            data: params
        })
    },
    //删除员工
    deleteEmployee: _employId => {
        return fetch({
            url: '/api/Member/DeleteEmployeeById',
            query: {
                employeeId: _employId
            }
        })
    },
    //获取角色可售商品信息
    getRoleGoodsInfo: (_roleId, _goodsClassId) => {
        return fetch({
            url: '/api/Member/GetRoleGoodsInfo',
            query: {
                roleId: _roleId,
                goodsClassId: _goodsClassId
            }
        })
    },
    //保存角色可售商品信息
    saveRoleGoodsInfo: params => {
        return fetch({
            method: 'post',
            url: "/api/Member/SaveRoleGoodsInfo",
            data: params
        })
    },

    /************ Org ************/
    // 获取机构数
    getAllOrg: () => {
        return fetch({

            url: '/api/Org/GetAllOrg'
        })
    },
    // 获取机构数
    getSysUserOrg: () => {
        return fetch({

            url: '/api/Org/GetSysUserOrg'
        })
    },
    //获取登录用户的机构列表
    getMyOrgs: () => {
        return fetch({

            url: '/api/Org/GetMyOrgs'
        })
    },
    //获取机构详情
    getOrgDetailById: _orgId => {
        return fetch({
            url: '/api/Org/GetOrgDetailById',
            query: {
                orgId: _orgId
            }
        })
    },
    //保存机构信息
    saveOrg: params => {
        return fetch({
            method: 'post',
            url: '/api/Org/SaveOrg',
            data: params
        })
    },
    //删除机构
    deleteOrgById: _orgId => {
        return fetch({
            url: '/api/Org/DeleteOrgById',
            query: {
                orgId: _orgId
            }
        })
    },
    //获取机构详情
    getDepartDetailById: _departId => {
        return fetch({
            url: '/api/Org/GetDepartDetailById',
            query: {
                departId: _departId
            }
        })
    },
    //保存机构
    saveDepart: params => {
        return fetch({
            method: 'post',
            url: '/api/Org/SaveDepartment',
            data: params
        })
    },
    //删除机构
    deleteDepartById: _departId => {
        return fetch({
            url: '/api/Org/DeleteDepartmentById',
            query: {
                departId: _departId
            }
        })
    }
}