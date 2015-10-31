// SN4T14 2014-11-28
// License: WTFPL
// jshint node: true
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var escapeShell = require('escapeshellarg');
var yaml = require('js-yaml');
var fs = require('fs');

var handlers = yaml.safeLoad(fs.readFileSync('handlers.yml', 'utf8'));

handlers.forEach(function (handler) {
	handler.regex = new RegExp(handler, "i");
});

module.exports.saveLink = function(link, targetDirectory) {
	var handled = false;
	handlers.forEach(function (handler) {
		if (handler.regex.test(link) && !handled) {
			handled = true;

			if(handler.regex === /.*/i) {
				console.error("Unknown link: ", link);
			}

			mkdirp(targetDirectory, function(err) {
				if (err) {
					console.log(err);
				} else {
					var escapedTargetDirectory = escapeShell(targetDirectory);
					var escapedLink = escapeShell([link]);
					var command = handler.executionFormat.replace("{destinationFolder}", escapedTargetDirectory).replace("{link}", escapedLink);
					exec(command, function(error, stdout, stderr) {
						if (error !== null) {
							console.log(command + ' exec error: ' + error);
						}
					});
				}
			});
		}
	});

	if (!handled) {
		console.error("Unknown link: ", link);
	}
};
