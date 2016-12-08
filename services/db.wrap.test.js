"use strict";

const db = require("./db.wrap.js");


//db("TSBT_WORD").insert(["wordName"]).values(["hello"]).done();

db("TSBT_WORD").update({wordUsage : 1}).where("wordName = \"hello\"").done();
