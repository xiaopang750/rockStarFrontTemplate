/**
 *description: upload
 *author:fanwei
 *date:2015/01/13 
 */

 /*
	fast-dfs-api https://github.com/chenboxiang/fdfs-client
 */
module.exports = function(app, route, preRoute) {

	var FdfsClient = require('fdfs-client');
	var fastDfsDomin = app.get('fastDfsDomin');
	var fastDfsPort = app.get('fastDfsPort');
	var fastDfsOverTime = app.get('fastDfsOverTime');
	var picDomain = app.get('picDomain');
	var formidable = require('formidable');
	var fs = require('fs');
	var gm = require('gm')/*.subClass({ imageMagick : true })*/;
	
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

	var Class = app.get('Class');
	var baseController = require('../../../lib/shop/baseController')(app);

	var Upload = Class.create(baseController, {

		initialize: function() {

			this.maxSize = 1024 * 1024 * 1;
			this.events();

		},
		events: function() {

			var _this = this;
			 
			app.post(route, function(req, res){  
				
				var form = new formidable.IncomingForm();
		    	form.encoding = 'utf-8';       
		    	form.keepExtensions = true; 
			    form.parse(req, function(err, fields, files) { 
			    	
			    	if(err) {
			    		
			    		_this.outJson({
							code: "002",
							msg: '上传失败',
							data: '',
							res: res
						});

			    	} else if(files.file.size > _this.maxSize) {
			    		
			    		_this.outJson({
							code: "002",
							msg: '上传图像大小超过限制',
							data: '',
							res: res
						});

			    	} else {
			    		
			    		var path = files.file.path;
			    		var thumb = fields.thumb;

			    		var ext = path.match(/(jpeg|gif|png|jpg)/)[0];
			    		gm(path).size(function (err, size) {
							
						 	if(!err) {
						 		
						 		_this.uploadToFastDfsImg(path, ext, function(url){
						 			 
					    			_this.uploadToFastDfsStr(thumb, function(thumb){
					    					
					    				_this.outJson({
											code: "001",
											msg: '上传成功',
											data: {url:url, thumb: thumb, orgWidth: size.width, orgHeight: size.height},
											res: res
										});

					    			}, function(){

					    				_this.outJson({
											code: "002",
											msg: '缩略图上传至fastdfs失败',
											data: err,
											res: res
										});

					    			});

					    		}, function(err){

					    			_this.outJson({
										code: "002",
										msg: '上传至fastdfs失败',
										data: err,
										res: res
									});

					    		});

						 	} else {
						 		
						 		_this.outJson({
									code: "002",
									msg: '图像宽高获取失败',
									data: '',
									res: res
								});

						 	}

						});
			    	}

			    });

			});

		},
		uploadToFastDfsImg: function(path, ext, suc, fail) {

			//把img
			var _this = this;
			var buffer = fs.readFileSync(path);
			fdfs.upload(buffer, {ext: ext}, function(err, fileId) {

				var picUrl = picDomain + fileId;

				suc && suc(picUrl);

			}, function(err){

				fail && fail(err);

			});

			fdfs.on('error', function(err) {
			   	_this.outJson({
					code: "002",
					msg: '上传至fastdfs失败',
					data: '',
					res: res
				});
			});

		},
		uploadToFastDfsStr: function(baseStr, suc, fail) {

			//把base64上传到fastDfs
			var _this = this;
			var ext = baseStr.match(/(jpeg|gif|png|jpg)/)[0];
			if (ext == 'jpeg') ext = 'jpg';
			var baseStr = baseStr.replace(/data\:image\/(jpeg|gif|png|jpg)\;base64\,/, "");
			var bitmap = new Buffer(baseStr, "base64");

			fdfs.upload(bitmap, {ext: ext}, function(err, fileId) {
    			
				var picUrl = picDomain + fileId;

    			suc && suc(picUrl);

			}, function(err, fileId){

				fail && fail(err);

			});

			fdfs.on('error', function(err) {
			   	_this.outJson({
					code: "002",
					msg: '上传至fastdfs失败',
					data: '',
					res: res
				});
			});

		}


	});

	var oUpload = new Upload();

}; 