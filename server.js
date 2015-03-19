/**
 *description:入口文件
 *author:fanwei
 *date:2014/12/31
 */
var express = require('express');
var app = express();

//config
var serverConfig = require('./config/server')(app, express);

//load-global
var global = require('./lib/global')(app);

//route
var route = require('./lib/route')(app, __dirname + '/' + app.get('controlName'));

//listen-port
app.listen(app.get('port'))

