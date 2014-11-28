var util = require('util');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var escapeShell = require('escapeshellarg');

var handlers = [
    {
        regex: /(https?:\/\/)?(i\.)?imgur\.com\/[a-zA-Z0-9]*\..*/i,
        executionFormat: "wget -P {destinationFolder} {link}"
    },
    {
        regex: /(https?:\/\/)?imgur\.com\/gallery\/.*/i,
        executionFormat: "./scripts/imgur/imgur.py {link} {destinationFolder}"
    }
];

exports.saveLink = function(link, targetDirectory) {
    var handled = false;
    for (var i in handlers) {
        var handler = handlers[i];
        if (handler.regex.test(link)) {
            handled = true;
            mkdirp(targetDirectory, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    var escapedTargetDirectory = escapeShell(targetDirectory);
                    var escapedLink = escapeShell([link]);
                    var command = handler.executionFormat.replace("{destinationFolder}", escapedTargetDirectory).replace("{link}", escapedLink);
                    exec(command, function (error, stdout, stderr) {
                        if (error !== null) {
                          console.log(handler.executionFormat + ' exec error: ' + error);
                        }
                    });
                }
            });
            break;
        }
    }
    if (!handled) {
        console.log("Unknown link: ", link);
    }
};