/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {
                separator: ';\n'
            },
            basic_and_extras: {
                files: {
                    'js/lib.js': [
                        "node_modules/jquery/dist/jquery.min.js",
                        "node_modules/bootstrap/dist/js/bootstrap.min.js",
                        "node_modules/bootstrap-material-design/dist/js/material.min.js",
                        "node_modules/bootstrap-material-design/dist/js/ripples.min.js",
                        "node_modules/core-js/client/shim.min.js",
                        "node_modules/zone.js/dist/zone.js",
                        "node_modules/reflect-metadata/Reflect.js",
                        "node_modules/rxjs/bundles/Rx.umd.js",
                        "node_modules/@angular/core/bundles/core.umd.js",
                        "node_modules/@angular/common/bundles/common.umd.js",
                        "node_modules/@angular/compiler/bundles/compiler.umd.js",
                        "node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
                        "node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
                        "node_modules/systemjs/dist/system.js",
                        "js/pixi.min.js",
                        "js/ace-builds/src-min-noconflict"
                        // "js/pixi.dom.js"
                    ],
                    'js/app.js': ['app/**/*.js'],
                }
            }
        },
        concat_css: {
            options: {
            },
            all: {
                src: ["node_modules/bootstrap/dist/css/bootstrap.min.css",
                    "node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
                    "node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css",
                    "node_modules/bootstrap-material-design/dist/css/ripples.min.css"],
                dest: "lib.css"
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'concat_css']);
};
