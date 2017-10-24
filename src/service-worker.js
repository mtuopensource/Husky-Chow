/**
 * Check out https://googlechrome.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */

'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// Pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// Dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

/**
 * For any other requests to the network, cache, and then only
 * use that cached resource if the user goes offline.
 */
self.toolbox.router.default = self.toolbox.networkFirst;
