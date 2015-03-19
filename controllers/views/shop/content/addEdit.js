/**
 *description:view-control-内容管理添加编辑
 *author:fanwei
 *date:2015/1/7
 */
module.exports = function(app, route, preRoute) {

	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);

	var AddEdit = Class.create(baseController, {
		
		initialize: function() {
			
			var _this = this;

			this.loadView({
				app: app,
				route: route,
				beforeRender: function(req, res, page, commonData) {
					
					var param = _this.getParam(req);

					if(param.cid) {
						
						//编辑
						_this.reqData(req, res, param.cid, function(data){

							commonData.title = '内容编辑';
							commonData.nowAction = 'edit';
							commonData.pageInfo = data;
							_this.renderPage(req, res, page, commonData);
							
						});

					} else if(param.lid) {

						//详情
						_this.reqData(req, res, param.lid, function(data){

							commonData.title = '内容详情';
							commonData.nowAction = 'detail';
							commonData.pageInfo = data;
							_this.renderPage(req, res, page, commonData);
							
						});

					} else if(param.contenttype) {

						//内容维护
						var param = _this.getParam(req);

						_this.request(req, res, _this.inter.content.maintain, param, function(data){

							if(data.data) {
								
								//编辑
								commonData.title = '内容编辑';
								commonData.nowAction = 'edit';
								commonData.pageInfo = data.data ? JSON.parse(data.data) : '';
								_this.renderPage(req, res, page, commonData);

							} else {

								//添加
								commonData.title = '内容添加';
								commonData.nowAction = 'add';
								commonData.pageInfo = {
									taglist: [],
									photolist: []
								};
								_this.renderPage(req, res, page, commonData);

							}
						});

					} else {

						//添加
						commonData.title = '内容添加';
						commonData.nowAction = 'add';
						commonData.pageInfo = {
							taglist: [],
							photolist: []
						};
						_this.renderPage(req, res, page, commonData);
					}
					
					
				}
			});
			
		},
		reqData: function(req, res, cid, cb) {

			//获取编辑数据
			var param = {pkContent: cid};

			this.request(req, res, this.inter.content.getData, param, function(data){
				
				var info = data.data ? JSON.parse(data.data) : data.data;

				cb && cb(info);

			});

		},

	});

	var oAddEdit = new AddEdit();
	
};