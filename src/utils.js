module.exports.error = function (msg) {
  console.error('Error: ' + msg);
};

module.exports.moduleInitContent = function(type, name) {
	return 'var ' + type + ' = angular.module("' + name + '.' + type + '", []);\n';
};
