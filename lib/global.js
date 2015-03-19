/**
 *description:把一些全局公用的方法存放到app上
 *author:fanwei
 *date:2014/12/31
 */
module.exports = function(app) {

	var Class = require('./class');
	app.set('Class', Class);


};
