/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {

    var _pages = grunt.file.readJSON('src/pages.json');
    var _template =  grunt.file.read('src/partials/partial.hbs');

    for (var i = 0; i < _pages.length; i++) {

        _pages[i].filename = _pages[i].data.title + '.html';
        _pages[i].content = _template;
    }


    // Project configuration.
    grunt.initConfig({

        config: {
            src: 'src',
            dist: 'dist'
        },

        assemble: {
            pages: {
                options: {
                    flatten: true,
                    assets: '<%= config.dist %>/assets',
                    layout: '<%= config.src %>/layouts/layout.hbs',
                    data: '<%= config.src %>/data/*.{json,yml}',
                    partials: '<%= config.src %>/partials/*.hbs',

                    // add the pages array from above to the pages collection on the assemble options
                    pages: _pages
                },
                files: [
                  // currently we need to trick grunt and assemble into putting the pages file into the correct
                  // place using this pattern
                  { dest: './dist/', src: '!*' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('assemble');
    
    grunt.registerTask('default', [        
      'assemble'
    ]);
};