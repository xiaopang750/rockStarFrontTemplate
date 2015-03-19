/**
 *description: 内容
 *author:fanwei
 *date:2015/1/31
 */
module.exports = function(app, route, preRoute) {
	
	var Class = app.get('Class');
	var baseController = require('../../../../lib/shop/baseController')(app);
	var template = require('art-template');
	var FdfsClient = require('fdfs-client');
	var fastDfsDomin = app.get('fastDfsDomin');
	var fastDfsPort = app.get('fastDfsPort');
	var fastDfsOverTime = app.get('fastDfsOverTime');
	var picDomain = app.get('picDomain');
	var fs = require('fs');

	//fastDFS-client
	var fdfs = new FdfsClient({
	    trackers: [
	        {
	            host: fastDfsDomin,
	            port: fastDfsPort
	        }
	    ],
	    timeout: fastDfsOverTime,
	    charset: 'utf8'
	});

	var Content = Class.create(baseController, {

		initialize: function() {

			this.events();
			this.contentModel = 'webRoot/views/shop/model/model1';

		},
		events: function() {

			var _this = this;

			//列表
			app.all(preRoute + 'list', function(req, res){

				var param = _this.getParam(req);
				var sessionInfo = _this.readSession(req);
				param.pkShop = sessionInfo.pkShop;

				_this.request(req, res, _this.inter.content.list, param, function(data){

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

			})

			//添加
			app.all(preRoute + 'add', function(req, res){
				
				var param = _this.getParam(req);
				
				_this.saveContent(req, res, _this.inter.content.add, param, 'add');

			});

			//编辑
			app.all(preRoute + 'edit', function(req, res){
				
				var param = _this.getParam(req);

				_this.saveContent(req, res, _this.inter.content.edit, param);

			});

			//删除
			app.all(preRoute + 'cancel', function(req, res){
				
				var param = _this.getParam(req);

				_this.request(req, res, _this.inter.content.cancel, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: '',
						res: res
					});
					
				});	

			});

		},
		saveContent: function(req, res, url, param, way) {

			var _this = this;

			this.buildContentModel(this.contentModel, param, function(file, param){

				param.contenturl = file;
				
				_this.request(req, res, url, param, function(data){

					_this.outJson({
						code: '001',
						msg: data.msg,
						data: _this.viewConfig['content/index'].url,
						res: res
					});

				});

			}, function(err){

				_this.outJson({
					code: '002',
					msg: '上传至fastDfs错误',
					data: '',
					res: res
				});

			});

		},
		buildContentModel: function(tpl, data, suc, fail) {

			data.modelPicList = JSON.parse(data.modelPicList);
			data.taglist = JSON.parse(data.taglist);

			var html = template(tpl, data);
			var bitmap = new Buffer(html);

			fdfs.upload(bitmap, {ext: 'html'}, function(err, fileId) {

				var fileUrl = picDomain + fileId;
				
    			suc && suc(fileUrl, data);

			}, function(err, fileId){

				fail && fail(err);

			});
		}	

	});

	var oContent = new Content();

};





