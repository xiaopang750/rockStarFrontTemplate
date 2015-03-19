/**
 *description:网站访问路由
 *author:fanwei
 *date:2015/1/25
 */
var prefix = '/views/shop/';

module.exports = {	
	'user/login': {
		url : prefix + 'user/login',
		title : '登录',
		belongIndex: '0'
	},
	'user/regist': {
		url : prefix + 'user/regist',
		title : '注册',
		belongIndex: '0'
	},
	'user/add': {
		url : prefix + 'user/add',
		title : '新增用户',
		belongIndex: '1'
	},
	'user/manage': {
		url : prefix + 'user/manage',
		title : '用户管理',
		belongIndex: '1'
	},
	'user/order': {
		url : prefix + 'user/order',
		title : '下单',
		belongIndex: '1'
	},
	'user/index': {
		url : prefix + 'user/index',
		title : '操作平台',
		belongIndex: '1'
	},
	'performance/index': {
		url : prefix + 'performance/index',
		title : '店面业绩',
		belongIndex: '2'
	},
	'performance/hairer': {
		url : prefix + 'performance/hairer',
		title : '发型师业绩',
		belongIndex: '2'
	},
    'performance/history': {
        url : prefix + 'performance/history',
        title : '历史订单',
        belongIndex: '2'
    },
	'service/list': {
		url : prefix + 'service/list',
		title : '服务管理',
		belongIndex: '3'
	},
	'service/addEdit': {
		url : prefix + 'service/addEdit',
		title : '服务编辑',
		belongIndex: '3'
	},
	'goods/list': {
		url : prefix + 'goods/list',
		title : '商品管理',
		belongIndex: '4-1'
	},
	'goods/detail': {
		url : prefix + 'goods/detail',
		title : '修改详情',
		belongIndex: '4-1'
	},
	'goods/stockList': {
		url : prefix + 'goods/stockList',
		title : '库存管理',
		belongIndex: '4-2'
	},
	'goods/bookList': {
		url : prefix + 'goods/bookList',
		title : '历史订货单',
		belongIndex: '4-3'
	},
	'goods/bookAddEdit': {
		url : prefix + 'goods/bookAddEdit',
		title : '订货管理',
		belongIndex: '4-3'
	},
	'goods/deliveryList': {
		url : prefix + 'goods/deliveryList',
		title : '历史出库单',
		belongIndex: '4-4'
	},
	'goods/deliveryAddEdit': {
		url : prefix + 'goods/deliveryAddEdit',
		title : '出库管理',
		belongIndex: '4-4'
	},
	'goods/platBookList': {
		url : prefix + 'goods/platBookList',
		title : '历史订货单',
		belongIndex: '4-3'
	},
	'goods/platBookAddEdit': {
		url : prefix + 'goods/platBookAddEdit',
		title : '订货管理',
		belongIndex: '4-3'
	},
	'customService/index': {
		url : prefix + 'customService/index',
		title : '客服管理',
		belongIndex: '5'
	},
	'content/index': {
		url : prefix + 'content/index',
		title : '内容管理',
		belongIndex: '6'
	},
	'content/addEdit': {
		url : prefix + 'content/addEdit',
		title : '内容管理',
		belongIndex: '6'
	},
    'test/index': {
        url : prefix + 'content/addEdit',
        title : '测试',
        belongIndex: ''
    }

};