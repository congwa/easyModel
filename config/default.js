
'use strict';
// module.exports = {
// 	port: 8011,
// 	url: 'mongodb://139.199.103.116:27017/test',
// 	session: {
// 		name: 'SID',
// 		secret: 'SID',
// 		cookie: {
// 			httpOnly: true,
// 		    secure:   false,
// 		    maxAge:   365 * 24 * 60 * 60 * 1000,
// 		}
// 	}
// }


module.exports = {
	port: 8001,
	url: 'mongodb://localhost:27017/local',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
}