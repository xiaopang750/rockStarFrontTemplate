/**
 *description:view-control-平台订货单列表
 *author:fanwei
 *date:2015/3/11
 */
module.exports = function(app, route, preRoute) {

	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var GoodsList = Class.create(baseController, {
		
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

	var oGoodsList = new GoodsList();
	
};