/**
 *description: 平台注册登录
 *author:fanwei
 *date:2015/1/15
 */
module.exports = function(app, route, preRoute) {
	
	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var Member = Class.create(baseController, {

		initialize: function() {
			
			this.events();

		},
		events: function() {

			//暂时未做验证
			var _this = this;

			//用户列表查询
			app.all(preRoute + 'query', function(req, res){

				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
                param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.member.getMemberInfo, param, function(data){

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
			
			//添加新用户
			app.all(preRoute + 'add', function(req, res){

				var sessionInfo = _this.readSession(req);
				var param = _this.getParam(req);
				param.pkShop = sessionInfo.pkShop;
				param.pkUser = sessionInfo.pkUser;
				/*var name = param.usercode;
				var pass = param.loginpassword;
				var result = _this.judge(name, pass, res);*/

				_this.request(req, res, _this.inter.member.add, param, function(data){
					
					_this.outJson({
						code: '001',
						msg: data.msg,
						data: JSON.parse(data.data).pkCustomer,
						res: res
					});

				});

			});

			//会员编辑
			app.all(preRoute + 'edit', function(req, res){

				var sessionInfo = _this.readSession(req);
				var param = _this.getParam(req);
				param.pkShop = sessionInfo.pkShop;
				param.pkUser = sessionInfo.pkUser;

				_this.request(req, res, _this.inter.member.edit, param, function(data){
					
					_this.outJson({
						code: '001',
						msg: data.msg,
						data: param.pkCustomer,
						res: res
					});

				});

			});


			//获取所有套餐
			app.all(preRoute + 'packageInfo', function(req, res){

				var sessionInfo = _this.readSession(req);
				var param = _this.getParam(req);
				param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.member.packageInfo, param, function(data){
					
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

			//获取已有的套餐
			app.all(preRoute + 'hasedPackage', function(req, res){

				var param = _this.getParam(req);
				
				_this.request(req, res, _this.inter.member.hasedPackage, param, function(data){
					
					var info = data.data ? JSON.parse(data.data) : data.data;
					var nowUrl = _this.viewConfig['user/order'].url;
					info.forEach(function(data){

						data.orderUrl = nowUrl + '?pkName=' + encodeURIComponent(data.comboname) + '&pkCustomer=' + param.pkCustomer;

					});

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

			//套餐编辑
			app.all(preRoute + 'editPackage', function(req, res){
				
				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.member.editPackage, param, function(data){
					
					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});


			//套餐保存
			app.all(preRoute + 'savePackage', function(req, res){
				
				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;
				param.pkUser = sessionInfo.pkUser;

				_this.request(req, res, _this.inter.member.savePackage, param, function(data){
					
					var info = data.data ? JSON.parse(data.data) : data.data;
					var nowUrl = _this.viewConfig['user/order'].url;

					info.orderUrl = nowUrl + '?pkName=' + encodeURIComponent(info.comboname) + '&pkCustomer=' + param.pkCustomer;

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: info,
						res: res
					});

				});

			});


			//会员结算
			app.all(preRoute + 'sum', function(req, res){

				/*var sessionInfo = _this.readSession(req);
				var param = {};
				param.pkShop = sessionInfo.pkShop;*/
				var param = _this.getParam(req);
				
				_this.request(req, res, _this.inter.member.sum, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});


			//下单
			app.all(preRoute + 'order', function(req, res){
				
				var sessionInfo = _this.readSession(req);
				var param = _this.getParam(req);
				param.pkShop = sessionInfo.pkShop;
				param.pkUser = sessionInfo.pkUser;

				_this.request(req, res, _this.inter.member.order, param, function(data){
					
					_this.outJson({
						code: '001',
						msg: data.msg,
						data: _this.viewConfig['user/index'].url,
						res: res
					});

				});

			});

			//首页结算单查询
			app.all(preRoute + 'payList', function(req, res){
				
				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.member.getIndexInfo, param, function(data){
				
					var info = data.data ? JSON.parse(data.data) : '';
					
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

			//给用户发送密码
			app.all(preRoute + 'registApp', function(req, res){
				
				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.member.registApp, param, function(data){
					
					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});

			//快速下单
			app.all(preRoute + 'fastOrder', function(req, res){
				
				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
                param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.member.fastOrder, param, function(data){

					var info = data.data ? JSON.parse(data.data) : '';

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: info,
						res: res
					});

				});

			});

		}

	});

	var oMember = new Member();

};





