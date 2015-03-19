/**
 *description: route
 *author:fanwei
 *date:2014/12/29
 *	
 * 访问方式:
 *	
 * + controllers
 *		+ views
 *			-user.js
 *	-> domain + port / views/ user
 *  -> localhost:8080/views/user
 *  -> controllers 下目录名 + 文件名 - .js
 *
 *  views 	放页面显示的控制器
 *	get 	放数据获取的控制器 例如接收前台提交的表单
 * 	send 	放数据显示的控制器 例如返回给前台一个列表数据
 * 	upload  放上传相关的控制器
 */
var fs = require('fs');
var path = require('path');
var arr = [];

module.exports = function(app, dirname) {

	var controllerName = app.get('controlName');

	walk(app, dirname, controllerName);

	app.set('viewList', arr);

};

function walk(app, dirname, controllerName) {

	fs.readdirSync(dirname).forEach(function(name){

		var filePath = dirname + '/' + name;

		var stat = fs.lstatSync(filePath).isDirectory();

		if(stat) {

			walk(app, filePath, controllerName);

		} else {

			var routFile = path.relative('../xxx/xxx', filePath).replace(/\\/gi, '\/');

			var loc = routFile.indexOf(controllerName) + controllerName.length;

			var routePath = routFile.substring(loc).replace('.js', '');

			var preRoute = routePath.substring( 0, routePath.lastIndexOf('/')+1 );

			arr.push(routePath);
			
			require(routFile)(app, routePath, preRoute);			
		}

	});

}