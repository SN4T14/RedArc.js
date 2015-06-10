'use strict'; // Be strict like my math teacher

var redditStream = require('reddit-stream');
var linkHandler = require('./lib/linkHandler.js'); // Outsource all the boring downloading stuff to another file to keep this one nicer
var fs = require('fs');
var util = require('util');
var moment = require('moment');

var post_stream = new redditStream('posts', 'all', 'RedArc.js/0.3.0 by /u/SN4T14'); // Monitor posts on /r/all because keeping up with it is possible, and lets you check all users every 2 seconds instead of having to spend 2*numUsers seconds manually looping through all users.

var usersToArchive = []; // Don't manually add users to this, add them to users.txt!
var subredditsToArchive = []; // Don't manually add subreddits to this, add them to subreddits.txt!

fs.readFile('users.txt', function(err, data) {
	if (err) {
		if (err.code === "ENOENT") {
			fs.appendFile('users.txt', "");
		} else {
			throw err;
		}
	} else {
		usersToArchive = data.toString().split("\n");
	}
});

fs.readFile('subreddits.txt', function(err, data) {
	if (err) {
		if (err.code === "ENOENT") {
			fs.appendFile('subreddits.txt', "");
		} else {
			throw err;
		}
	} else {
		subredditsToArchive = data.toString().split("\n");
	}
});

post_stream.on('new', function(posts) {
	for (var i in posts) {
		var post = posts[i].data; // Damn it, JS, implement proper foreach!
		var save = false;


		if (usersToArchive.indexOf(post.author) !== -1) {
			save = true;
		} else if (subredditsToArchive.indexOf(post.subreddit) !== -1) { // else if to avoid adding users that already exist in usersToArchive
			addUser(post.author);
			save = true;
		}

		// why do it like this? because when you add more clauses later on, it's still just as easy to read and maintain.
		if (save) {
			console.log("[" + moment().format() + "]", "Found post!", post.url, post.author);
			savePost(post);
		}
	}
});

function savePost(postData) {
	var folderName = postData.over_18 ? "NSFW" : "SFW"; // Save to "./username/NSFW/" or "./username/SFW/" to separate NSFW from SFW pictures (e.g. pics of their puppy)
	linkHandler.saveLink(postData.url, "./posts/" + postData.author + "/" + folderName + "/");
}

function addUser(user) {
	fs.appendFile('users.txt', user, function (err) {
		if (err) {
			throw err;
		}
	});
	usersToArchive.push(user);
}

post_stream.on('error', function(err) {
	if (err.error !== 504) {
		console.error(err.message);
		console.error(err.response);
		console.error(err.error);
		console.error("If the problem persists, please copy the above output and paste it in an issue on GitHub");
	}
});

post_stream.start();
console.log("RedArc.js started!");
