var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var escapeShell = require('escapeshellarg');
var yaml = require('js-yaml');
var fs = require('fs');

var handlers = yaml.safeLoad(fs.readFileSync('handlers.yml', 'utf8'));

for (var i in handlers) {
	handlers[i].regex = new RegExp(handlers[i].regex, "i");
}

module.exports.saveLink = function(link, targetDirectory) {
	var handled = false;
	for (var i in handlers) {
		var handler = handlers[i];
		if (handler.regex.test(link)) {
			if(handler.regex === /.*/i) {
				console.error("Unknown link: ", link);
			}
			handled = true;
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
			break;
		}
	}
	if (!handled) {
		console.error("Unknown link: ", link);
	}
};
