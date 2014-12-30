/*
 * grunt-project
 * https://github.com/ldong/grunt_init_mygruntplugin
 *
 * Copyright (c) 2014 Lin Dong
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('fnList', 'List the functions of files', function(){
        var re = /function (\w*)? ?(\(.*\))/g;

        this.files[0].src.forEach(function(file){
            var text = grunt.file.read(file);
            var unnamedFns = 0;
            var nameFns = 0;
            var fns = [];
            var result;

            while( (result = re.exec(text)) !== null){
                if(result[1] === undefined){
                    unnamedFns++;
                } else {
                    nameFns++;
                    fns.push(result[1] + result[2]);
                }
            }
            grunt.log.subhead('Functions in '+ file);
            grunt.log.writeln('# '+unnamedFns+ ' Unnamed Functions');
            grunt.log.writeln('# '+nameFns+ ' Named Functions');
            grunt.util.recurse(fns, function(fn){
                grunt.log.ok(fn);
            });
        });
    });
};
