/**
 *description:网站导航配置
 *author:fanwei
 *date:2015/1/25
 */

var view = require('./view');

module.exports = [
	{
		name: "前台",
		icon: "fa-home",
		url: view['user/index'].url,
		belongIndex: "1"
	},
	{
		name: "业绩",
		icon: "fa-bar-chart",
		url: view['performance/index'].url,
		belongIndex: "2"
	},
	{
		name: "伙计",
		icon: "fa-user",
		url: view['service/list'].url,
		belongIndex: "3"
	},
	{
		name: "商品",
		icon: "fa-cube",
		url: view['goods/list'].url,
		belongIndex: "4",
		children:[
			{
				name: "套餐",
				icon: "fa-cube",
				url: view['goods/list'].url,
				belongIndex: "4-1"
			},
			{
				name: "库存",
				icon: "fa-cube",
				url: view['goods/stockList'].url,
				belongIndex: "4-2"
			},
			{
				name: "订货",
				icon: "fa-cube",
				url: view['goods/bookList'].url,
				belongIndex: "4-3"
			},
			{
				name: "出库",
				icon: "fa-cube",
				url: view['goods/deliveryList'].url,
				belongIndex: "4-4"
			}
		]
	},
	{
		name: "沟通",
		icon: "fa-bell",
		url: view['customService/index'].url,
		belongIndex: "5"
	},
	{
		name: "内容",
		icon: "fa-star-o",
		url: view['content/index'].url,
		belongIndex: "6"
	}
];