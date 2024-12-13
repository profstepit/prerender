#!/usr/bin/env node
// Set up .env file into process.env options
require('dotenv').config();

const prerender = require('./lib');

const server = prerender({
  chromeFlags: [
    '--no-sandbox',
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--hide-scrollbars',
  ],
  chromeLocation: '/usr/bin/google-chrome',
  logRequests: true,
});

const pluginsStatus = {
  ENABLE_PRERENDER_HEADER: prerender.sendPrerenderHeader,
  ENABLE_BROWSER_FORCE_RESTART: prerender.browserForceRestart,
  ENABLE_RESOURCE_BLOCKING: prerender.blockResources,
  ENABLE_META_TAGS: prerender.addMetaTags,
  ENABLE_REMOVE_SCRIPT_TAGS: prerender.removeScriptTags,
  ENABLE_HTTP_HEADERS: prerender.httpHeaders,
  ENABLE_BASIC_AUTH: prerender.basicAuth,
  ENABLE_DOMAINS_WHITELIST: prerender.whitelist
}

for (const envConfig in pluginsStatus) {
  if (process.env[envConfig] === '1') {
    server.use(pluginsStatus[envConfig]());
  }
}

server.start();
