"use strict";

const express = require('express');
const wordDef = require('word-definition');
const sqlite3 = require('sqlite3');

let app = express();
