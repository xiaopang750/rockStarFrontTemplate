/**
 *description:view-control-操作台
 *author:fanwei
 *date:2015/1/7
 */
module.exports = function(app, route, preRoute) {

	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var Index = Class.create(baseController, {
		
		initialize: function() {
			
			var _this = this;

			this.loadView({
				app: app,
				route: route,
				beforeRender: function(req, res, page, commonData) {
					
					_this.reqAll(req, res, function(count){
						
						commonData.pageInfo = {};
						commonData.pageInfo.orderNum = count;
						_this.renderPage(req, res, page, commonData);

					});
					
				}
			});
			
		},
		reqAll: function(req, res, cb, fail) {

			var param = {};
			var sessionInfo = this.readSession(req);
			param.pkShop = sessionInfo.pkShop;

			//获取所有订单
			this.request(req, res, this.inter.member.getOrderNum, param, function(data){
				
				cb && cb(JSON.parse(data.data).count);

			}, fail);

		}

	});

	var oIndex = new Index();
	
};