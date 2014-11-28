Gonewilder.js
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

Install Node by following [this guide,](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager) and clone the git repo, or download [the ZIP file](https://github.com/SN4T14/gonewilder.js/archive/master.zip) and extract it, then run these two commands:

```
cd gonewilder.js/
npm install
```

Configuring
===========

Add users that you want to archive to `users.txt`, **DON'T** start them with `/u/`!  
Add subreddits that you want to archive to `subreddits.txt`, **DON'T** start them with `/r/`!

Executing
=========

Run `node gonewilder.js` in the `gonewilder.js/` folder.