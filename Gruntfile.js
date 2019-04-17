module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		exec: {
			ts: ((process.platform === 'win32') ? 'node_modules\\.bin\\tsc.cmd' : './node_modules/.bin/tsc') + ' --project tsconfig.json',
			'yarn-install': 'yarn install'
		},
	});

	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask('default', ['exec:ts']);

};
