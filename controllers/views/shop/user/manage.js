/**
 *description:view-control-用户管理
 *author:fanwei
 *date:2015/1/7
 */
module.exports = function(app, route, preRoute) {

	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var Manage = Class.create(baseController, {
		
		initialize: function() {
			
			var _this = this;

			this.loadView({
				app: app,
				route: route,
				beforeRender: function(req, res, page, commonData) {
				
					_this.renderPage(req, res, page, commonData);
					
				}
			});
			
		}

	});

	var oManage = new Manage();
	
};