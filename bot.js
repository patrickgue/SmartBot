"use strict";

const express = require('express');
const wd = require('word-definition');
const sqlite3 = require('sqlite3');
const https = require("https");
const http = require("http");

let app = express();


https.get("https://en.wikipedia.org/wiki/", function(data) {
    console.log(data);
});

wd.getDef("keyboard", "en", null, function(definition) {
    console.log(definition);
});
