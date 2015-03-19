/**
 *description:后端模板渲染辅助方法
 *author:fanwei
 *date:2015/01/21
 */
module.exports = function(template) {

	template.helper('cut', function(content, num){

	    var len;

	    if( typeof content !== 'string' ) {
	        return content;
	    } else {
	        
	        len = content.length;

	        if( len <= num ) {

	            return content;

	        } else {

	            return content.substring(0, num) + '...';

	        }

	    }

	});

};