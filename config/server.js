/**
 *description:网站基础配置
 *author:fanwei
 *date:2014/12/31
 */
var bodyParser = require('body-parser'); 
var session = require('express-session');
var compression = require('compression');
var log4js = require('log4js');
var templateHelp = require('../lib/template-helper');
var favicon = require('express-favicon');
var RedisStore = require('connect-redis')(session);

/*var dbConfig = require('./db');*/
/*var mysql = require('mysql');*/
var way = require('./way');
var fs = require('fs');
var cookieParser = require('cookie-parser');

module.exports = function(app, express) {

	var env = process.env.CHORHAIR;
	var port;
	var viewCache;

	var cssPath;
	var jsPath;
	var imgPath;
	var seaPath;

	var fastDfsDomin;
	var fastDfsPort;
	var fastDfsOverTime;
	var picDomain;

	var javaDomain;
	var javaPort;

	//session-redis
	var sessionRedis;

	if(env == 'test') {

		//测试环境
		viewCache = false;

		cssPath = "/statics/src/css/";
		jsPath = "/statics/src/js/";
		imgPath = "/statics/assets/";
		seaPath = "/statics/";

		fastDfsDomin = '192.168.10.28';
		fastDfsPort = 22122;
		fastDfsOverTime = 1000000;
		picDomain = 'http://pic.rs07.com/';

		javaDomain = '127.0.0.1';
		javaPort = 50002;

		sessionRedis = '';

	} else if(env == 'build') {

		//生产环境
		var domain = '';

		viewCache = true;

		cssPath = "/statics/src/css/";
		jsPath = "/statics/src/js/";
		imgPath = "/statics/assets/";
		seaPath = "/statics/";

		fastDfsDomin = '10.220.200.13';
		fastDfsPort = 22122;
		fastDfsOverTime = 1000000;
		picDomain = 'http://image.chorhair.com/';

		javaDomain = '127.0.0.1';
		javaPort = 50002;

		//待生产环境redis确定把注释解开
		/*sessionRedis = new RedisStore({
	   		host: '192.168.10.61',
	   		port: '6379'
	    });*/
		
	    sessionRedis = '';

	} else {

		//开发环境
		var domain = '';

		viewCache = false;

		cssPath = "/statics/src/css/";
		jsPath = "/statics/src/js/";
		imgPath = "/statics/assets/";
		seaPath = "/statics/";

		fastDfsDomin = '192.168.10.28';
		fastDfsPort = 22122;
		fastDfsOverTime = 1000000;
		picDomain = 'http://pic.rs07.com/';

		javaDomain = '127.0.0.1';
		//javaDomain = '172.16.12.101';
		javaPort = 80;

		sessionRedis = '';
		
	}

	//compress
	app.use(compression({}));

	//css,js,img baseRoot config
	app.set('cssPath', cssPath);
	app.set('jsPath', jsPath);
	app.set('imgPath', imgPath);
	app.set('seaPath', seaPath);


	//fastDfs
	app.set('fastDfsDomin', fastDfsDomin);
	app.set('fastDfsPort', fastDfsPort);
	app.set('fastDfsOverTime', fastDfsOverTime);
	app.set('picDomain', picDomain);

	//javaApi
	app.set('javaDomain', javaDomain);
	app.set('javaPort', javaPort);

	//port
	app.set('port', 5566);

	//所有渠道
	app.set('allway', way);

	//entryFile
	app.set('entry', 'server.js');

	//use-bodyParse
	app.use(bodyParser.urlencoded({ extended: false, limit:"50mb"}));

	//controllerDirName
	app.set('controlName', 'controllers');
	//view-controller-name
	app.set('viewControllerName', 'views');

	//view-egine
	var template = require('art-template');
	templateHelp(template);
	template.config('extname', '.html');
	template.config('cache', viewCache);
	app.engine('.html', template.__express);
	app.set('view engine', 'html');
	app.set('views', './webRoot/views');

	//static-dir
	app.use(express.static('webRoot'));

	//modelDir
	app.set('modelDir', 'model');

	//cookie support
	app.use(cookieParser());

	// session support
	app.use(session({
	   store: sessionRedis,
	   resave: false, 
	   saveUninitialized: true, 
	   secret: 'some secret here'
	}));

	//fav-icon support
	app.use(favicon('webRoot/statics/assets/lib/ico/favicon.ico'));


	//db
	/*var mysql = require('mysql');
	var db = mysql.createConnection(dbConfig);
	app.set('db', db);*/

	//log
	if(env == 'build') {

		var rootDir = '/application/nodejs_logs';
		var baseDir = 'web';
		var role1 = way['003'].name;
		var role2 = way['004'].name;

		var isHasApplication = fs.existsSync('/application');
	
		if(!isHasApplication) {
			fs.mkdirSync('/application');
		}

		var isHasLogs = fs.existsSync(rootDir);
		
		if(!isHasLogs) {

			fs.mkdirSync(rootDir);
		}

		var isHasWeb = fs.existsSync(rootDir + '/' + baseDir);

		if(!isHasWeb) {
			fs.mkdirSync(rootDir + '/' +  baseDir);
			fs.mkdirSync(rootDir + '/' +  baseDir + '/' + role1);
			fs.mkdirSync(rootDir + '/' + baseDir + '/' + role2);
		}

		log4js.loadAppender('file');

		log4js.configure({
		  appenders: []
		});

		app.use(log4js.connectLogger(log4js.getLogger("app"), { 
			level: 'auto'
		}));

		app.use(function(req, res, next){

			var file;
			var oDate = new Date();
			var year = oDate.getFullYear();
			var mon = oDate.getMonth() + 1;
			var date = oDate.getDate();
			var time = year + '-' + mon + '-' + date;
			var dirName;

			if(req.url.indexOf('/' + role1 + '/')!=-1) {
				
				dirName = role1;

			} else if(req.url.indexOf('/' + role2 + '/')!=-1) {

				dirName = role2;

			} else {

				next();

				return;
			}

			file = rootDir + '/' + baseDir + '/' + dirName +'/'+ time +'.log';
			log4js.addAppender(log4js.appenders.file(file));

			next();

		});

	}

};


