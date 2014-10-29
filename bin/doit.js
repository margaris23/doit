#!/usr/bin/env node

var fs = require('fs');

var cwd = process.cwd();
var args = process.argv.slice(2);

function error(msg) {
  console.error('Error: ' + msg);
}

if (args.length < 3) {
  error('wrong number of arguments!');
  return -1;
}

var product = args[0];

if (product !== 'angular') {
  error('only "angular" is currently supported!');
  return;
}

function handleSrc(folder, content) {
	// always use relative paths
	var innerPath = cwd + '/src/' + folder;
  fs.readFile(cwd + '/project.conf', function(err) {
		if (err) {
      error(err);
      console.log('Suggestion: Please run this inside a project folder!');
      return;
    }

		if (!fs.existsSync(innerPath)) {
			fs.makedirSync(innerPath);
		}

		fs.writeFile(innerPath+ '/' + args[2], content, function (err) {
			if (err) {
				error(err);
				return;
			}
		});

	});
}

var mode = args[1];

switch(mode) {
  case 'init':
    fs.mkdir(args[2], function (err) {
      if (err) {
        error(err);
        return;
      }
      fs.writeFileSync(args[2] + '/project.conf', 'project.name =' + args[2]);
      fs.mkdirSync(args[2] + '/src');
    });
    break;
  case 'create-service':
    handleSrc('services', '//angular service');
    break;
  case 'create-controller':
		handleSrc('controllers', '//angular controller');
    break;
  case 'create-view':
		// TBD
    break;
  case 'create-common':
		handleSrc('common', '//common object');
    break;
  case 'create-directive':
		handleSrc('directives', '//angular directive');
    break;
  default:
    error('uknown action');
    return;
}
