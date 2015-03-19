/**
 *description:view-control-商品套餐修改详情
 *author:fanwei
 *date:2015/1/25
 */
module.exports = function(app, route, preRoute) {

	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var GoodsAddEdit = Class.create(baseController, {
		
		initialize: function() {
			
			var _this = this;

			this.loadView({
				app: app,
				route: route,
				beforeRender: function(req, res, page, commonData) {
					
					_this.reqData(req, res, function(data){

						commonData.pageInfo = {};
						commonData.pageInfo.detailList = data;
						_this.renderPage(req, res, page, commonData);

					}, function(){

						commonData.pageInfo = {};
						commonData.pageInfo.detailList = [];
						_this.renderPage(req, res, page, commonData);

					});
	
				}
			});
			
		},
		reqData: function(req, res, cb, fail) {

			//获取修改详情数据
			var param = {};
			var reqParam = this.getParam(req);
			param.pkShopCombo = reqParam.gid;

			this.request(req, res, this.inter.goods.modifyDetail, param, function(data){

				var info = data.data ? JSON.parse(data.data) : data.data;
				cb && cb(info);

			}, fail);

		}

	});

	var oGoodsAddEdit = new GoodsAddEdit();
	
};