import createError from 'http-errors';
import express from 'express';
import db from './mongodb/db.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import config from 'config-lite'; //import编译时候执行 是引用类似于符号链接  代码的静态定义，代码解析阶段就会生成
import chalk from 'chalk';
import router from './routes/index.js';
import connectMongo from 'connect-mongo';


var app = express();


app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin || 'https://cangdu.org');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.sendStatus(200);
	} else {
	    next();
	}
});


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


router(app);

app.use(cookieParser());
app.use(express.static('./public'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
//   next(createError(404));
	console.log('404 =>baidu');
	res.redirect('http://www.baidu.com');
	next();
});

app.listen(config.port, () => {
	console.log(chalk.green(`成功监听端口：${config.port}`))
	console.log(chalk.green(`数据库链接:${config.url}`))
});
