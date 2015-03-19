/**
 *description:node-cookie
 *author:fanwei
 *date:2015/1/25
 */

module.exports = function(res, name, value, time) {

	//time格式: 1sec 2min 3hour 4day 6year
	var num,
		dec,
		change,
		oDate,
		cookieStr,
		cookieArr;

	num = time.match( /\d+/ )[0];
	dec = time.substring( num.length );

	change = {

		sec: num,

		min: num * 60,

		hour: num * 60 * 60,

		day: num * 60 * 60 * 24,

		year: num * 60 * 60 * 24 * 365
	};

	if( !change[dec] && time.indexOf('-') == '-1' ) {
		
		return;
	}

	oDate = new Date();

	//如果传入的时间前面带-号则删除cookie;
	oDate.setSeconds( oDate.getSeconds() + (change[dec] || -1));

	cookieStr = name + '=' + value + ';expires=' + oDate.toGMTString() + ';path=/';

	cookieArr = [];
	cookieArr.push(cookieStr);

	res.setHeader("Set-Cookie", cookieArr);
};