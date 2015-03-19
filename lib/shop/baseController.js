/**
 *description: view-baseAction
 *author:fanwei
 *date:2014/12/30 
 */
module.exports = function(app) {

	//公共数据
	var commonData =  {};

	//视图路由配置
	var viewConfig = require('../../config/shop/view');

	//导航配置
	var siteNav = require('../../config/shop/nav');

	//渠道配置
	var allway = app.get('allway');

	//接口配置
	var inter  = require('../../config/shop/api/index');

	var http = require('http');
	var qs = require('querystring');
	var setCookie = require('../../lib/cookie');

	commonData.views = viewConfig;
	commonData.cssPath = app.get('cssPath');
	commonData.jsPath = app.get('jsPath');
	commonData.imgPath = app.get('imgPath');
	commonData.seaPath = app.get('seaPath');

	var baseView = app.get('Class').create({

		initialize: function() {

		},
		viewConfig: viewConfig,
		inter: inter,
		loadModel: function(app, route) {

			var modelDir = app.get('modelDir');
			var moduleLoc = '../' + modelDir + route;
			return require(moduleLoc)(app);

		},
		loadView: function(opts) {
			
			/**
			 * allway: 客户端类型
			 * 001: 消费者
			 * 002: 美发师
			 * 003: 平台
			 */

			opts = opts || {};
			var app = opts.app || '';
			var route = opts.route || '';
			var beforeRender = opts.beforeRender || null;
			var nowWayInfo = allway['003'];
			var nowWayName = nowWayInfo.name;
			var nowPageName = route.substring( route.indexOf(nowWayName) + nowWayName.length + 1 );
			
			commonData.pageLevel = viewConfig [ nowPageName ].pageLevel;
			commonData.nowWayName = nowWayName;
			commonData.nowWayId = nowWayInfo.id;
			commonData.title = viewConfig [ nowPageName ].title;
			commonData.belongIndex = viewConfig [ nowPageName ].belongIndex;
			commonData.siteNav = siteNav;
			commonData.routeAll = JSON.stringify(commonData.views);
			// 渲染页面 -> view 与 controllers的view 对应
			// 一个视图控制器对应 view视图			
			var _this = this;

			app.get(route, function(req, res){

				//_this.singleLogin(req, res);
				var result = _this.checkIsLogin(req, res);
				
				if(result) {
					
					commonData.shopname = result.shopname;
					commonData.pkShop = result.pkShop;
                    commonData.username = result.username;
					var page = _this.fixPage(route);
					
    				res.setHeader("Cache-Control","no-store");
    				res.setHeader("Expires", "-1");
    				 
					beforeRender && beforeRender.call(_this, req, res, page, commonData);
				}

			});

			app.get('/', function(req, res){

				res.redirect(viewConfig['user/index'].url);

			});

		},
		fixPage: function(route) {

			var viewsDir = app.get('viewControllerName');
			var re = new RegExp('\/' + viewsDir + '\/');
			var page = route.replace(re, '');
			
			return page;

		},
		renderPage: function(req, res, page, result) {

			res.render(page, result);

		},
		concatData: function(data) {

			data = data || {};

			//合并单个数据与公共数据
			for (var attr in commonData) {

				data[attr] = commonData[attr];

			}

			return data;
		},
		outJson: function(opts) {

			/*
			 * {code:"001", data:"", msg: ""}	
			 * 用于ajax输出
			*/
			opts.res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
			opts = opts || {};

			var result = {
				code: opts.code,
				data: opts.data,
				msg: opts.msg
			};

			var sResult = JSON.stringify(result);
			opts.res.end(sResult);

		},
		getParam: function(req) {

			//获取参数
			if(req.method == 'POST') {

				return req.body;

			} else if(req.method == 'GET') {

				return req.query;
				
			}

		},
		checkIsLogin: function(req, res) {
			
			var _this = this;
			
			if(req.cookies.pkUser && !req.session.info) {

				//检测是否记住了登录
				this.request(req, res, inter.user.getInfo, {pkUser: req.cookies.pkUser}, function(data){

						var info = JSON.parse(data.data);

						_this.saveUserSession(req, info);

						res.redirect(viewConfig['user/index'].url);

				}, function(){
					
					setCookie(res, 'pkUser', 'xxx', '-30day');
					req.session.info = '';
					res.redirect(viewConfig['user/login'].url);

				});

			} else {

				var sessionInfo = this.readSession(req);
				var reqUrl = req.url;
				var uid = sessionInfo.pkUser;
				var loginUrl = viewConfig['user/login'].url;
				var registUrl = viewConfig['user/regist'].url;
				var indexUrl = viewConfig['user/index'].url;

				var isNoLoginOrRegistUrl = ( reqUrl != loginUrl && reqUrl != registUrl );

				var isLoginUrl = ( reqUrl == loginUrl );

				//检测是否登录
				if(!uid && isNoLoginOrRegistUrl) {

					res.redirect(loginUrl);
					return false;

				} else if(uid && isLoginUrl ) {

					res.redirect(indexUrl);
					return false;

				}

				return sessionInfo;

			}

		},
		sendReq: function(opts) {

			//发送http请求
			opts = opts || {};
			var host = opts.host || app.get('javaDomain');
			var param = opts.param || '';
			var type = opts.type || 'POST';
			var port = opts.port || app.get('javaPort');
			var path = opts.path || '';
			var cb = opts.cb || null;
			var content = qs.stringify(param);
			type = type.toUpperCase();

			var options = {  
			    hostname: host, 
			    port: port,  
			    path: path,  
			    method: type,
			    headers: {  
			        "Content-Type": 'application/x-www-form-urlencoded',  
			        "Content-Length": content.length  
			    }  
			};

			if(type == 'GET') {

				if(content) {
					options.path = options.path + '?' + content; 
				}

				delete options.headers;
			}

			var req = http.request(options, function (res) {  

			    res.setEncoding('utf8'); 

			    var data = "";  
			    res.on('data', function (chunk) { 
			    	
			    	data += chunk; 

			    }).on('end', function(){

			    	cb && cb(null, data);

			    });  

			});  
	  
			req.on('error', function (e) { 

				cb && cb(e.message);
			});
	
			if(type == 'POST') {
				req.write(content + '\n');
			}
			
			req.end();
		},
		save: function(req, res, url, param, suc, fail) {
			
			var _this = this;

			this.sendReq({
				path: url,
				param: param,
				cb: function(err, data){
					
					if(!err) {
						
						try {
							
							data = JSON.parse( data );
							
							if(data.issuccess) {

								suc && suc(data);

							} else {

								if(fail) {

									fail(data);

								} else {

									_this.outJson({
										code: '002',
										msg: data.msg,
										data: '',
										res: res
									});
								}
							}

						}catch(e) {
							
							_this.outJson({
								code: '002',
								msg: '数据异常',
								data: e,
								res: res
							});

						}
			
					} else {

						_this.outJson({
							code: '002',
							msg: '服务端连接失败',
							data: '',
							res: res
						});
					}
			
				}
			});
				
		},
		request: function(req, res, url, param, suc, fail) {

			var _this = this;

            var sessionInfo = this.readSession(req);
            var pkShop = sessionInfo.pkShop;
            var pkUser = sessionInfo.pkUser;

            param.pkShop = pkShop;
            param.pkUser = pkUser;

			this.save(req, res, url, {
				data: this.strJson(param)
			}, function(data){

				suc && suc(data);

			}, fail);

		},
		saveUserSession: function(req, info) {

			req.session.info = JSON.stringify(info);

		},
		readSession: function(req) {

			if(req.session.info) {
				
				var info = req.session.info;
				return JSON.parse(info);

			} else {

				return {};

			}

		},
		strJson: function(data) {

			return JSON.stringify(data);

		}


	});

	return baseView;

};	