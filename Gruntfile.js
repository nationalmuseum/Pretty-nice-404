/**
 * Grunt setup
 */
module.exports = function(grunt) {
	grunt.initConfig({
		// Prepare banner.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> ' + '<%= grunt.template.today("yyyy-mm-dd h:MM:ss") %>' + '*/' + "\n",
		
		// Sass
		sass: {
	    	default: {                            
				files: {                         
					'maintenance/css/main.css': 'src/scss/main.scss'      
			    }
	    	},
	    	dist: {
	    		options: {
	    			style: 'compressed'
	    		},                          
				files: {                         
					'maintenance/css/main.min.css': 'src/scss/main.scss'      
			    }
	    	}
		},
		
		// Postcss
		postcss : {
			default: {
				options : {
					processors: [ 
						require('pixrem')(), // add fallbacks for rem units
						require('autoprefixer')( { browsers: 'last 2 versions' } ), // add vendor prefixes
	                ]
				},
				src : 'maintenance/css/*.css'				
			}

		},
		
		// Concat
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>',
		    },
		    dist: {
				src: ['src/js/*'],
				dest: 'maintenance/js/main.js',
		    },
		},
	
		// Uglify
		uglify: {
			my_target: {
				files: {
		        	'maintenance/js/main.min.js': ['maintenance/js/main.js']
		      	}
	    	}
	  	},
		
		// Copy
		copy: {
		  main: {
		    files: [
		      // jQuery
		      {expand: true, cwd: 'bower_components/jquery/dist', src: ['*.js'], dest: 'maintenance/js/vendor/', filter: 'isFile'},
		      
		      // interactive bg
		      {expand: true, cwd: 'bower_components/interactive_bg', src: ['*.js'], dest: 'maintenance/js/vendor/', filter: 'isFile'},
				
		      // logo
		      {expand: true, cwd: 'src/img', src: ['logo.svg'], dest: 'maintenance/img/', filter: 'isFile'},
				],
		  },
		},
		
		// Responsive images
		responsive_images: {
			other: {
				options: {
					quality: 50,
					sizes: [
						{
							name: 'xs',
							width: 568,
						},{
							name: 'sm',
							width: 768,
						},{
							name: 'md',
							width: 1024,
						},{
							name: 'lg',
							width: 1280,
						},{
							name: 'xl',
							width: 1920,
						},{
							name: 'full',
							width: 2560,
						}
					]
		      },
		      files: [{
		        expand: true,
		        src: ['src/img/*.{jpg,gif,png}'],
		        // cwd: 'img/bg/',
		        custom_dest: 'maintenance/img/{%= name %}/'
		      }]
		    }
		  },

		// Minify html
		minifyHtml: { 
			options: {
				cdata: true
			},
			dist: {
				files: {
					'maintenance/index.html': 'src/index.html'
				}
			}
		}				 
	});
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-minify-html');
	
	grunt.registerTask('default', ['sass', 'postcss', 'copy', 'concat', 'uglify', 'responsive_images', 'minifyHtml']);
}; 