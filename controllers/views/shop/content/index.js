/**
 *description:view-control-内容管理
 *author:fanwei
 *date:2015/1/31
 */
module.exports = function(app, route, preRoute) {

	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var ContentList = Class.create(baseController, {
		
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

	var oContentList = new ContentList();
	
};