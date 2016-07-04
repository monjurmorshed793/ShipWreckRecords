module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8081,
                    base: './'
                }
            }
        },
        tsd:{
          refresh:{
              options:{
                  command:'reinstall',
                  latest:true,
                  config:'tsd.json'
              }
          }
        },
        typescript: {
            base: {
                src: ['ts/**/*.ts'],
                dest: 'js/JavaScriptFiles.js',
                options: {
                    module: 'amd',
                    target: 'es5'
                }
            }
        },
        watch: {
            files: 'ts/**/*.ts',
            tasks: ['typescript']
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        }
    });

    grunt.registerTask('default', ['connect', 'open', 'watch']);
}
