/**
 *description: 商品接口
 *author:fanwei
 *date:2015/1/14
 */
module.exports = {

	getGoodsList: '/shopcombo/findbyshop.php', //获取商品套餐接口
	goodsEdit: '/shopcombo/edit.php', //编辑商品套餐
	modifyDetail: '/editrecord/findbycombo.php', //修改详情

	stockList: '/shopproduct/findbyshop.php', //库存列表
	stockPriceEdit: '/shopproduct/edit.php', //库存价格修改
	bookList: '/book/findbyshop.php', //订单列表
	bookAdd: '/book/save.php', //订单添加
	bookEdit: '/book/edit.php', //订单编辑
	bookData: '/book/querydetail.php', //查询订单下的商品
	bookConfirm: '/book/confirmgood.php', //确认收货
	bookSubmit: '/book/commit.php', //提交订单
	bookRealModify: '/book/shopeditnum.php', //修改实收
	bookPlatRealModify: '/book/plateditnum.php', //平台修改发货数量
	deliveryList: '/delivery/findbyshop.php', //出库列表
	deliveryConfirm: '/delivery/confirmdelivery.php', //确认出库
	deliveryAdd: '/delivery/save.php', //出库添加
	deliveryEdit: '/delivery/edit.php', //出库编辑
	deliveryData: '/delivery/querydetail.php', //获取出库数据
	platBookList: '/book/platquery.php', //平台订货单列表
	bookApprove: '/book/approve.php' //通过驳回
};