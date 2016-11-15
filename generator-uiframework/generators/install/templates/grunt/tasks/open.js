///---------------------------------------------------------------------------
/// Open the website (more powerfull than connect open property)
///---------------------------------------------------------------------------

module.exports = function open (grunt) {

	var open = {
		dev : {
			path: 'http://localhost:' + grunt.const.server.port + '/dev'
		}
	};
	grunt.config.set('open', open);

};
