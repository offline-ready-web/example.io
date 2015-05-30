
var VERSION = "a2";

var CACHES = {
    common: "common-cache" + VERSION
};

// an array of file locations we want to cache
var filesToCache = [
    "font-cache.html",
    "script.js",
];

var neededFiles = [
    "index.html"
];

var errorResponse = function() {

    return new Response([
            "<h2>Failed to get file</h2>",
            "<p>Could not retrive response from cache</p>"
        ].join("\n"),
        500
    );
};

var networkFetch = function(request) {

    return fetch(request).then(function(response) {

        caches.open(CACHES["common"]).then(function(cache) {

            return cache.put(request, response);
        });

    }).catch(function() {
        console.error("Network fetch failed");
        return errorResponse();
    });
};

this.addEventListener("activate", function(event) {

    var expectedCacheNames = Object.keys(CACHES).map(function(key) {
        return CACHES[key];
    });

    console.log("Activate the worker");

    // Active worker won"t be treated as activated until promise resolves successfully.
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(cacheName) {
                    if (expectedCacheNames.indexOf() === -1) {
                        console.log("Deleting out of date cache:", cacheName);

                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

this.addEventListener("fetch", function (event) {

    var cacheName = CACHES["common"];

    console.log("Handling fetch event for", event.request.url);

    event.respondWith(

        fetch(event.request).then(function (response) {

            console.log("Request success");
            // Additonal check if the response succeeded

            return caches.open(cacheName).then(function (cache) {
                return cache.put(event.request, response.clone())
                .then(function () {
                    return response;
                });
            });
        })
        .catch(function (err) {

            console.log("Failed to fetch resource", err);

            return caches.match(event.request);
        })
    );
});
