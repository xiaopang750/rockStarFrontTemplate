## rockstar nodejs(中间层)-front-template

### controllers 
	
```
所有的控制器文件都继承自baseController控制器。

baseController用于处理网站的一些公共逻辑。

1. main目录一般放一些用于ajax请求的接口

+ controllers
	+ user
		main.js

接口: /user/main/方法名

app.all(preRout + '方法名', function(req, res){
	
	var param = this.getParam(req);
	获取前台的参数send给 server端

});	

2. upload用于处理网站上传逻辑

3. views用于存放渲染页面的控制器

页面访问的路由也是跟 controllers的规律一样

+ views
	+ user
		index.js

页面访问的路由 -> /views/user/index

var Index = Class.create(baseController, {
		
	initialize: function() {
		
		var _this = this;

		this.loadView({
			app: app,
			route: route,
			beforeRender: function(req, res, page, commonData) {
				
				//commonData 是一些网站公共的数据
				
				//此处可以发送http请求到server端去拿数据
				commonData.someData = serverBackData;

				_this.renderPage(req, res, page, commonData);

			}
		});
		
	}

});
			
```

### models只用于处理缓存逻辑，不做数据库的操作


### 文件对应关系

```

一个视图控制器 views/user/index.js

对应一个 用于处理ajax请求的控制器 main/user/index.js

对应一个 webRoot/statics/src/less/user/index.less

对应一个 前台js 入口文件 webRoot/statics/src/js/main/user/index.js
```
