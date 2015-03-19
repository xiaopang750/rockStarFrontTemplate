/**
 *description: 商品
 *author:fanwei
 *date:2015/1/26
 */
module.exports = function(app, route, preRoute) {
	
	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var Goods = Class.create(baseController, {

		initialize: function() {
			
			this.events();

		},
		events: function() {

			var _this = this;

			//1.编辑商品
			app.all(preRoute + 'goodsEdit', function(req, res){

				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;
				param.pkUser = sessionInfo.pkUser;

				_this.request(req, res, _this.inter.goods.goodsEdit, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});

			//2.库存列表
			app.all(preRoute + 'stockList', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.stockList, param, function(data){

					var info = data.data ? JSON.parse(data.data) : "";

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: {
							list: info,
							total: data.totalcount
						},
						res: res
					});

				});

			});

			//3.库存价格修改
			app.all(preRoute + 'stockPriceEdit', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.stockPriceEdit, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});

			//4.订单列表
			app.all(preRoute + 'bookList', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.bookList, param, function(data){

					var info = data.data ? JSON.parse(data.data) : "";

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: {
							list: info,
							total: data.totalcount
						},
						res: res
					});

				});

			});


			//5.订单添加
			app.all(preRoute + 'bookAdd', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.bookAdd, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: _this.viewConfig['goods/bookList'].url,
						res: res
					});

				});

			});

			//6.订单编辑
			app.all(preRoute + 'bookEdit', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.bookEdit, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: _this.viewConfig['goods/bookList'].url,
						res: res
					});

				});

			});

			//7.查询订单下的商品
			app.all(preRoute + 'bookData', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.bookData, param, function(data){

					var info = data.data ? JSON.parse(data.data) : "";

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: {
							list: info,
							total: data.totalcount,
							note: data.note
						},
						res: res
					});

				});

			});

			//8.确认收货
			app.all(preRoute + 'bookConfirm', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.bookConfirm, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});


			//9.提交订单
			app.all(preRoute + 'bookSubmit', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.bookSubmit, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});


			//10.修改实收
			app.all(preRoute + 'bookRealModify', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.bookRealModify, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});

			//11.平台修改实收
			app.all(preRoute + 'bookPlatRealModify', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.bookPlatRealModify, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});


			//12.出库列表
			app.all(preRoute + 'deliveryList', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.deliveryList, param, function(data){

					var info = data.data ? JSON.parse(data.data) : "";

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: {
							list: info,
							total: data.totalcount
						},
						res: res
					});

				});

			});


			//13.确认出库
			app.all(preRoute + 'deliveryConfirm', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.deliveryConfirm, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});

			//14.出库添加
			app.all(preRoute + 'deliveryAdd', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.deliveryAdd, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: _this.viewConfig['goods/deliveryList'].url,
						res: res
					});

				});

			});

			//15.出库编辑
			app.all(preRoute + 'deliveryEdit', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.deliveryEdit, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: _this.viewConfig['goods/deliveryList'].url,
						res: res
					});

				});

			});

			//16.获取出库数据
			app.all(preRoute + 'deliveryData', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.deliveryData, param, function(data){

					var info = data.data ? JSON.parse(data.data) : "";

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: {
							list: info,
							total: data.totalcount,
							note: data.note
						},
						res: res
					});

				});

			});

			//17.平台订货单列表
			app.all(preRoute + 'platBookList', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.platBookList, param, function(data){

					var info = data.data ? JSON.parse(data.data) : "";

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: {
							list: info,
							total: data.totalcount
						},
						res: res
					});

				});

			});

			//18.通过驳回
			app.all(preRoute + 'bookApprove', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.goods.bookApprove, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});

		}	

	});

	var oGoods = new Goods();

};





