/**
 *description:view-control-服务单下单
 *author:fanwei
 *date:2015/1/7
 */
module.exports = function(app, route, preRoute) {

	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var Order = Class.create(baseController, {
		
		initialize: function() {
			
			var _this = this;

			this.loadView({
				app: app,
				route: route,
				beforeRender: function(req, res, page, commonData) {
					
					var param = _this.getParam(req);
					commonData.pageInfo = {};
					commonData.pageInfo.userName = decodeURIComponent(param.name);
					commonData.pageInfo.pkName = decodeURIComponent(param.pkName);

					_this.reqPrice(req, res, function(dataPrice){
						
						_this.reqOther(req, res, param.spid, function(dataOther){

							commonData.pageInfo.price = dataPrice;
							commonData.pageInfo.other = dataOther;

							_this.renderPage(req, res, page, commonData);

						});

					});

					
				}
			});
			
		},
		reqPrice: function(req, res, cb) {

			//获取价格
			var param = {};

			param.pkShop = this.readSession(req).pkShop;
			param.pkShopCombo = this.getParam(req).spid;

			this.request(req, res, this.inter.member.getPrice, param, function(data){

				var info = data.data ? JSON.parse(data.data) : '';
				var arr = [];
				info.forEach(function(data){
					var param = {};
					param.price = data.price;
                    param.fairPrice = data.fairprice;
					param.rank = data.servicerank;
					param.id = data.pkPrice;
					param.pkPrice = data.pkPrice;
					arr.push(param);
				});

				cb && cb(arr);

			});

		},
		reqOther: function(req, res, pid, cb) {

			var param = {};
			param.pkShopCombo = pid;

			this.request(req, res, this.inter.member.getOtherPay, param, function(data){
				
				var info = data.data ?  JSON.parse(data.data) : [];
				var arr = [];
				
				info.forEach(function(data){
					var param = {};
					param.name = data.additionname;
					param.id = data.pkAddition;
					arr.push(param);
				});

				cb && cb(arr);

			});
		}


	});

	var oOrder = new Order();
	
};