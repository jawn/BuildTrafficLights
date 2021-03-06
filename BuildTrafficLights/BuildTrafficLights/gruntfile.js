﻿/// <binding BeforeBuild='exec:update' AfterBuild='exec:package' ProjectOpened='exec:update' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        settings: grunt.file.readJSON("settings.tfx.json"),
        ts: {
            build: {
                tsconfig: true
            },
            options: {
                fast: 'never'
            }
        },
        exec: {
            package: {
                command: "tfx extension create --manifest-globs <%= settings.package.manifestGlobs %>",
                stdout: true,
                stderr: true
            },
            update: {
                command: "npm up --save-dev",
                stdout: true,
                stderr: true
            },
            tsdinit: {
                command: "typings install knockout requirejs",
                stdout: true,
                stderr: true
            },
            tsdlink: {
                command: "typings init",
                stdout: true,
                stderr: true
            },
            publish: {
                command: "tfx extension publish --manifest-globs <%= settings.package.manifestGlobs %> --share-with <%= settings.publish.shareWith %> --token <%= settings.publish.token %>",
                stdout: true,
                stderr: true
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.registerTask("build", ["ts:build", "exec:package"]);

};