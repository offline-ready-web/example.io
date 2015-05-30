
// File /srv/server.js
var http = require("http");

var static = require("node-static");
var express = require("express");

// Take the static directory value from config
var DEV_STATIC_DIR = "dist";

var port = process.env.PORT || 9000;

var app = express();

app.use(express.static(DEV_STATIC_DIR));

app.get("*", function (req, res) {

    res.status(200).json({ all: "good " + Date.now() });
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server running at http://%s:%s", host, port);
});
