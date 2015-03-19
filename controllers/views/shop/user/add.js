/**
 *description:view-control-店铺用户添加编辑
 *author:fanwei
 *date:2015/1/7
 */
module.exports = function(app, route, preRoute) {

	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var Add = Class.create(baseController, {
		
		initialize: function() {
			
			var _this = this;

			this.loadView({
				app: app,
				route: route,
				beforeRender: function(req, res, page, commonData) {
					
					var param = _this.getParam(req);
					var uid = param.uid;

					if(uid) {

						var param = {};
						var sessionInfo = this.readSession(req);
						param.pkShop = sessionInfo.pkShop;
						param.pkUser = sessionInfo.pkUser;
						param.pkCustomer = uid;

						//用户信息
						_this.reqData(req, res, param, function(data){

							commonData.pageInfo = data;
							commonData.title = "编辑用户";
							commonData.pageInfo.nowWay = 'edit';
							_this.renderPage(req, res, page, commonData);

						});

					} else {

						commonData.title = "新增用户";
						commonData.pageInfo = {};
						commonData.pageInfo.nowWay = 'add';
						_this.renderPage(req, res, page, commonData);

					}
					
				}
			});
			
		},
		reqData: function(req, res, param, cb) {

			this.request(req, res, this.inter.member.getSinMemberInfo, param, function(data){

				var info = data.data ? JSON.parse(data.data) : data.data;

				cb && cb(info);

			});

		}

	});

	var oAdd = new Add();
	
};