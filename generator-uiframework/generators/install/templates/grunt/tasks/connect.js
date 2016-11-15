///---------------------------------------------------------------------------
/// Start the site
///---------------------------------------------------------------------------

module.exports = function connect(grunt) {
	var serveStatic = require('serve-static');
	var connect = {
		server: {
			options: {
				livereload: grunt.const.server.livereload,
				port: grunt.const.server.port,
				// base: './',
				hostname: 'localhost',
				// keepalive: true,
				open: 'true', // target url to open
				// base: ['app'],
				middleware: function (connect, options, middlewares) {
					var fs = require('fs');
					var path = require('path');
					var support = ['POST', 'PUT'];
					middlewares.unshift(function (req, res, next) {
						// grunt.log.writeln('-----IN MIDDLEWARE----');
						if ((support.indexOf(req.method.toUpperCase()) != -1) && (req.url.indexOf('.json') != -1)) {
							// grunt.log.writeln('-----IN MIDDLEWARE CONDITON----');
							var filepath = path.join(options.base[0], req.url).split('?')[0];
							grunt.log.writeln('-----IN MIDDLEWARE CONDITION FILE PATH: ----' + filepath);
							if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
								return res.end(fs.readFileSync(filepath));
							}
						}
						return next();
					});
					middlewares.push(function (req, res, next) {
						serveStatic('.tmp'),
						serveStatic('test'),
						connect().use(
							'/bower_components',
							serveStatic('./bower_components')
						),
						serveStatic('dev');
						return next();
					});
					return middlewares;
				}
			}
		}
	};
	grunt.config.set('connect', connect);
};
