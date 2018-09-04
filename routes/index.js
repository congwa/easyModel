'use strict';

import shopping from './shopping'


export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/shopping', shopping);

}