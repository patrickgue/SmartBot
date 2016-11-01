"use strict";

const db = require("./db.wrap.js");


db("TSBT_WORD").insert(["wordName"]).values(["désoleé"]).done();
