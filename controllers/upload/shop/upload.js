/**
 *description: upload
 *author:fanwei
 *date:2015/01/13 
 */
module.exports = function(app, route, preRoute) {

	var FdfsClient = require('fdfs-client');
	var fastDfsDomin = app.get('fastDfsDomin');
	var fastDfsPort = app.get('fastDfsPort');
	var fastDfsOverTime = app.get('fastDfsOverTime');
	var picDomain = app.get('picDomain');

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

			this.events();

		},
		events: function() {

			var _this = this;

			app.post(route, function(req, res){

				var param = _this.getParam(req);
				var file = param.file;

				if(!file) {

					_this.outJson({
						code: '002',
						msg: '文件为空',
						data: '',
						res: res
					});

				} else {

					_this.uploadToFastDfs(file, function(fileId){

						_this.outJson({
							code: '001',
							msg: '上传成功',
							data: {
								picUrl: fileId
							},
							res: res
						});

					}, function(err){

						_this.outJson({
							code: '002',
							msg: err,
							data: '',
							res: res
						});

					});

				}

			});

		},
		uploadToFastDfs: function(baseStr, cb) {

			//把base64上传到fastDfs
			var ext = baseStr.match(/(jpeg|gif|png|jpg)/)[0];
			if (ext == 'jpeg') ext = 'jpg';
			var baseStr = baseStr.replace(/data\:image\/(jpeg|gif|png|jpg)\;base64\,/, "");
			var bitmap = new Buffer(baseStr, "base64");

			fdfs.upload(bitmap, {ext: ext}, function(err, fileId) {
    			
				var picUrl = picDomain + fileId;

    			cb && cb(picUrl);

			}, function(err, fileId){

				cb && cb(err);

			});

		}


	});

	var oUpload = new Upload();

}; 