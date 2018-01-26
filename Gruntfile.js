module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'), 
		concat : {
			dist: {
				src: [
				'js/modules/*.js',
				'js/main.js'
				],
				dest: 'prod/production.js'
			}
		},

		uglify : {
			build: {
				src: 'prod/production.js',
				dest: 'prod/production.min.js'
			}
		},

		sass : {
			build: {
				loadPath: '.',
				src: ['sass/modules/*.scss',
					'sass/main.scss'],
				dest: 'prod/production.css'
			}
		},

		watch : {
			scripts: {
				files: ['js/main.js', 'js/modules/*.js', 'sass/modules/*.scss', 'sass/main.scss'],
				tasks: ['concat', 'uglify', 'sass'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('watchFiles', ['watch']);
};