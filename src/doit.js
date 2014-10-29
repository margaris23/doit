var fs = require('fs');

var args = process.argv.slice(2);

function error(msg) {
	console.log('Error: ' + msg);
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
		fs.readFile('project.conf', function(err) {
			if (err) {
				error(err);
				console.log('Suggestion: Please run this inside a project folder!');
				return;
			}
			fs.writeFile('src/services/' + args[2], '//angular service', function (err) {
				if (err) {
					error(err);
					return;
				}
			});
		});
		break;
	case 'create-controller':
		break;
	case 'create-view':
		break;
	case 'create-common':
		break;
	case 'create-directive':
		break;
	default:
		error('uknown action');
		return;
}
