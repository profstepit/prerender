#!/usr/bin/env node
// Set up .env file into process.env options
require('dotenv').config();

const prerender = require('./lib');

const server = prerender({
  // chromeFlags: [
  //   '--no-sandbox',
  //   '--headless',
  //   '--disable-gpu',
  //   '--remote-debugging-port=9222',
  //   '--hide-scrollbars',
  // ],
  chromeLocation: '/usr/bin/google-chrome',
  logRequests: true,
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
