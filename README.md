RedArc.js
=============

Subreddit archiving tool written in Node.js

Installing
==========

Requires:
* Node.js

Optional:
* Toilet paper for the cleanup

Install dependencies
====================

1. Install Python (`sudo apt-get install python` on Debian-based OSes, Google it for others)
2. Install Node by following [this guide,](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager) and clone the git repo, or download [the ZIP file](https://github.com/SN4T14/RedArc.js/archive/master.zip) and extract it, then run these two commands:

```
cd RedArc.js/
npm install
```

Configuring
===========

Add users that you want to archive to `users.txt`, **DON'T** start them with `/u/`!  
Add subreddits that you want to archive to `subreddits.txt`, **DON'T** start them with `/r/`!  
If you want to archive all subreddits, add "all" to `subreddits.txt`.

Executing
=========

Run `node redArc.js` in the `RedArc.js/` folder.
