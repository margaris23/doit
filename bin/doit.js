#!/usr/bin/env node

var fs = require('fs');
var Utils = require('../src/utils.js');

// make sure current working directory is used
var cwd = process.cwd();

// use rest of arguments provided as input
var args = process.argv.slice(2);

// validate # args
if (args.length < 3) {
  Utils.error('wrong number of arguments!');
  return -1;
}

// define working product for scaffolding
var product = args[0];

if (product !== 'angular') {
  Utils.error('only "angular" is currently supported!');
  return;
}

// create src files in folder with provided content
function addSrc(folder, file, content, cb) {
	// always use relative paths
	var innerPath = cwd + '/src/' + folder;

	// makesure configuration file exists
  fs.readFile(cwd + '/project.conf', function(err) {
		if (err) {
      Utils.error(err);
      console.log('Suggestion: Please run this inside a project folder!');
      cb && cb(err);;
    }

		// check if folder exists first
		if (!fs.existsSync(innerPath)) {
			fs.makedirSync(innerPath);
		}

		// create file with provided content
		fs.writeFile(innerPath + '/' + file, content, function (err) {
			if (err) {
				Utils.error(err);
			}
			cb && cb(err);
		});

	});
}

var action = args[1];

switch(action) {
  case 'init':
		// create top folder
    fs.mkdir(args[2], function (err) {
      if (err) {
        Utils.error(err);
        return;
      }

			// create configuration file
      fs.writeFileSync(args[2] + '/project.conf', 'project.name =' + args[2]);

			// create srcfolders
			var srcFolder = args[2] + '/src/';
      fs.mkdirSync(srcFolder);
      fs.mkdirSync(srcFolder + 'services');
			fs.writeFileSync(srcFolder + 'services/' + args[2] + 'Services.js', Utils.moduleInitContent('services', args[2]));
      fs.mkdirSync(srcFolder + 'controllers');
			fs.writeFileSync(srcFolder + 'controllers/' + args[2] + 'Controllers.js', Utils.moduleInitContent('controllers', args[2]));
      fs.mkdirSync(srcFolder + 'directives');
			fs.writeFileSync(srcFolder + 'directives/' + args[2] + 'Directives.js', Utils.moduleInitContent('directives', args[2]));
      fs.mkdirSync(srcFolder + 'filters');
			fs.writeFileSync(srcFolder + 'filters/' + args[2] + 'Filters.js', Utils.moduleInitContent('filters', args[2]));
      fs.mkdirSync(srcFolder + 'common');

			// create other folders
      fs.mkdirSync(args[2] + '/views');
      fs.mkdirSync(args[2] + '/lib');
    });
    break;
  case 'create-service':
    addSrc('services', args[2], '//angular service', function (error) {
			// TODO
		});
    break;
  case 'create-controller':
		addSrc('controllers', args[2], '//angular controller');
    break;
  case 'create-view':
		// TODO
    break;
  case 'create-common':
		addSrc('common', args[2], '//common object');
    break;
  case 'create-directive':
		addSrc('directives', args[2], '//angular directive');
    break;
  case 'create-filter':
		addSrc('filters', args[2], '//angular filter');
    break;
	default:
    Utils.error('uknown action');
    return;
}
