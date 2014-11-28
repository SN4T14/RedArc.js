'use strict'; // Be strict like my math teacher

var redditStream = require('reddit-stream');
var linkHandler = require('./linkHandler.js'); // Outsource all the boring downloading stuff to another file to keep this one nicer
var fs = require('fs');
var util = require('util');

var post_stream = new redditStream('posts', 'all', 'gonewilder.js/0.1 by /u/SN4T14'); // Monitor posts on /r/all because keeping up with it is possible, and lets you check all users every 2 seconds instead of having to spend 2*numUsers seconds manually looping through all users.

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
 
        if (subredditsToArchive.indexOf(post.subreddit) !== -1) {
            addUser(post.author);
            save = true;
        }
 
        if (usersToArchive.indexOf(post.author) !== -1) {
            save = true;
        }
 
        // why do it like this? because when you add more clauses later on, it's still just as easy to read and maintain.
        if (save) {
            console.log("Found post!");
            console.log(post.url);
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

post_stream.on('error', function(message, response, error) {
    console.log(message);
    console.log(response);
    console.log(error);
    console.log("If the problem persists, please copy the above output and paste it in an issue on GitHub");
});

post_stream.start();
console.log("gonewilder.js started!");