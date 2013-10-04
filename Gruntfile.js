var path = require('path');
var basePath = path.resolve('.');

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: ['sinon*', 'build/'],

    shell: {
      gitclone: {
        command: 'git clone git@github.com:cjohansen/Sinon.JS.git build/Sinon.JS',
        options: {
          failOnError: true
        }
      },
      gitcheckout: {
        command: 'cd build/Sinon.JS/ && git checkout <%= grunt.option("version") %>',
        options: {
          failOnError: true
        }
      },
      installdeps: {
        command: 'cd build/Sinon.JS/ && npm install',
        options: {
          failOnError: true
        }
      },
      buildsinon: {
        command: 'cd build/Sinon.JS/ && ./build',
        options: {
          failOnError: true
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, src: ['build/Sinon.JS/pkg/sinon.js'], dest: '.', flatten: true, filter: 'isFile'}
        ]
      }
    }

  });

  grunt.registerTask('build', 'Builds a release of Sinon.js', function(version) {
    version = version || "master";
    if(version && version !== 'master' && version.indexOf('v') !== 0) {
      version = 'v' + version;
    }
    grunt.option('version', version);
    grunt.task.run([
      'clean',
      'shell:gitclone',
      'shell:gitcheckout',
      'shell:installdeps',
      'shell:buildsinon',
      'copy'
    ]);
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  // default task
  grunt.registerTask('default', ['build']);
};
