/**
 *description: 获取列表
 *author:fanwei
 *date:2015/2/8
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

			//消息人
			app.all(preRoute + 'msgAll', function(req, res){

				var param = {};
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.customService.fairer, param, function(data){

					var fairer = data.data ? JSON.parse(data.data) : '';

					_this.request(req, res, _this.inter.customService.customer, param, function(data){

						var customer = data.data ? JSON.parse(data.data) : '';
						var newFairer = _this.filter(fairer);
						var newCuctomer = _this.filter(customer);

						_this.outJson({
							code: '001',
							msg: data.msg,
							data: {
								fairer: newFairer,
								customer: newCuctomer
							},
							res: res
						});

					});

				});

			});

			//发送消息
			app.all(preRoute + 'sendMsg', function(req, res){

				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.customService.sendMsg, param,function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});

				});

			});	

			//查询历史消息
			app.all(preRoute + 'historyMsg', function(req, res){

				var param = {};
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.customService.historyMsg, param,function(data){

					var info = data.data ? JSON.parse(data.data) : data.data;

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: info,
						res: res
					});

				});

			});	

		},
		filter:function(arr) {

			var newArr = [];
			var i,
				num;

			num = arr.length;
			for (i=0; i<num; i++) {

				if(arr[i].pkUser != 0) {
					newArr.push(arr[i]);
				}

			}
			return newArr;	

		}	

	});

	var oGoods = new Goods();

};





