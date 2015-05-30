
# Example.io

Example application to test different use cases of ServiceWorker API. Currently the best solution is based on the module [sw-precache](https://github.com/GoogleChrome/sw-precache) which generates separete service worker file. 

## Setup

Make sure you have Node.js and NPM installed before.

> `npm install`

Generate cache resource, server from `dist` directory.

> `gulp`

Run server:

> `node server.js`
