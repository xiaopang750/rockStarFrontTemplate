/**
 *description: 服务
 *author:fanwei
 *date:2015/1/26
 */
module.exports = function(app, route, preRoute) {
	
	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var Service = Class.create(baseController, {

		initialize: function() {
			
			this.events();

		},
		events: function() {

			var _this = this;

			//列表
			app.all(preRoute + 'list', function(req, res){

				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.service.list, param, function(data){

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

			//添加
			app.all(preRoute + 'add', function(req, res){

				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.service.add, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: _this.viewConfig['service/list'].url,
						res: res
					});

				});

			});

			//编辑
			app.all(preRoute + 'edit', function(req, res){

				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.service.edit, param, function(data){

						_this.outJson({
							code: '001',
							msg: data.msg,
							data: _this.viewConfig['service/list'].url,
							res: res
						});

				});

			});

			//删除
			app.all(preRoute + 'remove', function(req, res){
				
				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.service.remove, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});
					
				});	

			});

			//注册app账号
			app.all(preRoute + 'regist', function(req, res){
				
				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.service.regist, param, function(data){

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

	var oService = new Service();

};





