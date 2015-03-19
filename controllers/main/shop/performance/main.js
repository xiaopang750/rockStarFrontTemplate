/**
 *description: 业绩管理
 *author:fanwei
 *date:2015/1/26
 */
module.exports = function(app, route, preRoute) {
	
	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var Performance = Class.create(baseController, {

		initialize: function() {
			
			this.events();

		},
		events: function() {

			var _this = this;

			//业绩管理主列表
			app.all(preRoute + 'getAllList', function(req, res){

				var param = _this.getParam(req);
				var sessinInfo = _this.readSession(req);
				param.pkShop = sessinInfo.pkShop;
				
				_this.request(req, res, _this.inter.performance.getAllList, param, function(data){

					var info = data.data ? JSON.parse(data.data) : data.data;

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

			//获取理发师业绩
			app.all(preRoute + 'getHairList', function(req, res){

				var param = _this.getParam(req);
				var sessinInfo = _this.readSession(req);
				param.pkShop = sessinInfo.pkShop;

				_this.request(req, res, _this.inter.performance.getHairList, param, function(data){

						var info = data.data ? JSON.parse(data.data) : data.data;

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

			//获取历史订单
			app.all(preRoute + 'getHistoryList', function(req, res){

				var param = _this.getParam(req);
				var sessinInfo = _this.readSession(req);
				param.pkShop = sessinInfo.pkShop;

				_this.request(req, res, _this.inter.performance.getHistoryList, param, function(data){

						var info = data.data ? JSON.parse(data.data) : data.data;

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

		}	

	});

	var oPerformance = new Performance();

};





