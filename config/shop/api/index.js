/**
 *description: 调用java接口地址
 *author:fanwei
 *date:2015/1/25
 */

var user = require('./user');
var member = require('./member');
var service = require('./service');
var performance = require('./performance');
var goods = require('./goods');
var content = require('./content');
var global = require('./global');
var customService = require('./customService');

module.exports = {
	user: user,
	member: member,
	service: service,
	performance: performance,
	goods: goods,
	content: content,
	global: global,
	customService: customService
};