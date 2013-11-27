Nodejs.Authentication.UI
======================



## Prerequisites ##
[Node.js](http://nodejs.org/) must be installed in order to build this site.

To run this site, the [Nodejs.Authentication.App](https://github.com/mtimmermann/Nodejs.Authentication.App) must first be setup and running ([see the README for that project](https://github.com/mtimmermann/Nodejs.Authentication.App)). I am also using NGINX to serve up the static content of this site, and handle proxy passes to the [Nodejs.Authentication.App](https://github.com/mtimmermann/Nodejs.Authentication.App) NodeJS app, the configuration can be found there.


## Updating dependencies ##
Using node package manager:

**npm install**


## Build ##
**grunt**

optionally run "**grunt watch**" if you want rebuilds when files are modified, deleted, added.
