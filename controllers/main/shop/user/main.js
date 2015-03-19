/**
 *description: 平台用户
 *author:fanwei
 *date:2015/1/26
 */
module.exports = function(app, route, preRoute) {
	
	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);
	var setCookie = require('../../../../lib/cookie');

	var User = Class.create(baseController, {

		initialize: function() {
			
			this.events();

		},
		events: function() {

			var _this = this;

			//登陆
			app.all(preRoute + 'login', function(req, res){

				var param = _this.getParam(req);
				var name = param.usercode;
				var pass = param.loginpassword;
				var result = _this.judge(name, pass, res);
				
				if(result) {

					_this.request(req, res, _this.inter.user.login, param, function(data){
						
						var info = data.data ? JSON.parse(data.data) : data.data;

						_this.saveUserSession(req, info);

						//记住密码
						if(param.isRemember == 1) {
							setCookie(res, 'pkUser', info.pkUser, '30day');
						}

						_this.outJson({
							code: '001',
							msg: data.msg,
							data: _this.viewConfig['user/index'],
							res: res
						});

					});
				}

			});

			//注册
			app.all(preRoute + 'regist', function(req, res){

				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.user.regist, param, function(data){

						_this.outJson({
							code: '001',
							msg: data.msg,
							data: '',
							res: res
						});

				});

			});

			//退出
			app.all(preRoute + 'loginOut', function(req, res){

				req.session.info = '';
				setCookie(res, 'pkUser', 'xxx', '-30day');

				_this.outJson({
					code: '001',
					msg: '退出成功',
					data: _this.viewConfig['user/login'],
					res: res
				});

			});

		},
		judge: function(name, pass, res) {

			if(name && pass) {

				return true;

			} else {

				this.outJson({
					code: '002',
					msg: '用户名或密码不能为空',
					data: '',
					res: res
				});

				return;

			}
		}	

	});

	var oUser = new User();

};





