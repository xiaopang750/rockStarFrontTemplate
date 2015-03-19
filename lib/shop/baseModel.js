/**
 *description: model-base
 *author:fanwei
 *date:2015/1/6 
 */
module.exports = function(app) {

	var baseModel = app.get('Class').create({

		initialize: function() {

		},
		changeStr: function(str) {

			return '\'' + str + '\'';

		}
	});

	return baseModel;

}; 