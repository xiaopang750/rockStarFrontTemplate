/**
 *description: 会员
 *author:fanwei
 *date:2015/1/14
 */
module.exports = {

	add: '/customer/register.php',  //店铺会员添加
	edit: '/customer/edit.php',  //店铺编辑
	packageInfo: '/shopcombo/findbyshop.php',  //店铺套餐信息
	hasedPackage: '/customercombo/findbycustomer.php',  //获取已有的套餐
	savePackage: '/customercombo/select.php',  //店铺会员套餐保存
	editPackage: '/customercombo/edit.php',  //店铺会员套餐编辑
	getIndexInfo: '/order/queryunorder.php', //店铺操作台获取结算单信息
	getMemberInfo: '/customer/query.php', //店铺获取会员信息
	getSinMemberInfo: '/customer/querybyid.php', //获取单个会员信息
	order: '/order/save.php', //下单
	sum: '/order/settle.php',  //店铺操作台结算
	getHairer: '/fairer/findlist.php',  //获取店铺所有的理发师
	getPrice: '/shopprice/querybyshop.php',  //获取店铺理发师价格
	getOtherPay: '/addition/querybycombo.php', //获取附加项
	getOrderNum: '/order/querydayorder.php', //获取订单数
	registApp: '/customer/registerapp.php', //给用户发送app密码
	fastOrder: '/order/fastorder.php' //快速下单
};