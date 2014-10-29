#!/usr/bin/env node

var fs = require('fs');

// make sure current working directory is used
var cwd = process.cwd();

// use rest of arguments provided as input
var args = process.argv.slice(2);

function error(msg) {
  console.error('Error: ' + msg);
}

// validate # args
if (args.length < 3) {
  error('wrong number of arguments!');
  return -1;
}

// define working product for scaffolding
var product = args[0];

if (product !== 'angular') {
  error('only "angular" is currently supported!');
  return;
}

// create src files in folder with provided content
function handleSrc(folder, file, content) {
	// always use relative paths
	var innerPath = cwd + '/src/' + folder;

	// makesure configuration file exists
  fs.readFile(cwd + '/project.conf', function(err) {
		if (err) {
      error(err);
      console.log('Suggestion: Please run this inside a project folder!');
      return;
    }

		// check if folder exists first
		if (!fs.existsSync(innerPath)) {
			fs.makedirSync(innerPath);
		}

		// create file with provided content
		fs.writeFile(innerPath + '/' + file, content, function (err) {
			if (err) {
				error(err);
				return;
			}
		});

	});
}

var action = args[1];

switch(action) {
  case 'init':
		// create top folder
    fs.mkdir(args[2], function (err) {
      if (err) {
        error(err);
        return;
      }

			// create configuration file
      fs.writeFileSync(args[2] + '/project.conf', 'project.name =' + args[2]);

			// create srcfolders
			var srcFolder = args[2] + '/src/';
      fs.mkdirSync(srcFolder);
      fs.mkdirSync(srcFolder + 'services');
			fs.writeFileSync(srcFolder + 'services/' + args[2] + 'Services.js',
											 'var services = angular.module("' + args[2] + '.services", []);\n');
      fs.mkdirSync(srcFolder + 'controllers');
			fs.writeFileSync(srcFolder + 'controllers/' + args[2] + 'Controllers.js',
											 'var controllers = angular.module("' + args[2] + '.controllers", []);\n');
      fs.mkdirSync(srcFolder + 'directives');
			fs.writeFileSync(srcFolder + 'directives/' + args[2] + 'Directives.js',
											 'var directives = angular.module("' + args[2] + '.directives", []);\n');
      fs.mkdirSync(srcFolder + 'filters');
			fs.writeFileSync(srcFolder + 'filters/' + args[2] + 'Filters.js',
											 'var filters= angular.module("' + args[2] + '.filters", []);\n');
      fs.mkdirSync(srcFolder + 'common');

			// create other folders
      fs.mkdirSync(args[2] + '/views');
      fs.mkdirSync(args[2] + '/lib');
    });
    break;
  case 'create-service':
    handleSrc('services', args[2], '//angular service');
    break;
  case 'create-controller':
		handleSrc('controllers', args[2], '//angular controller');
    break;
  case 'create-view':
		// TBD
    break;
  case 'create-common':
		handleSrc('common', args[2], '//common object');
    break;
  case 'create-directive':
		handleSrc('directives', args[2], '//angular directive');
    break;
  case 'create-filter':
		handleSrc('filters', args[2], '//angular filter');
    break;
	default:
    error('uknown action');
    return;
}
