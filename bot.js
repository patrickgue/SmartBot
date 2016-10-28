"use strict";

const express = require('express');
const sqlite3 = require('sqlite3');
const https = require("https");
const http = require("http");
const db = require('./services/dbservice.js');
const bodyParser = require('body-parser');


let app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

/*
for(let word of words) {
    db.run("INSERT INTO TSBT_WORD (wordName) VALUES(\"" + word + "\") ");
}*/

app.post("/message/", function(req, res) {
    let message = req.body.message.replace(/[,-]./g,"");
    let sentenceArray = message.split(/[.?!:;]./g);
    let sentences = [];

    for(let j = 0; j < sentenceArray.length; j++) {
	let sentence = sentenceArray[j];
	let wordArray = sentence.split(" ");
	let words = [];

	for(let i = 0; i < wordArray.length; i++) {
	    let word = wordArray[i]
	    db.select("SELECT * FROM TSBT_WORD WHERE wordName = \""+word.toLowerCase()+"\"", function(data) {
		console.log(data);
		if(data.length > 0) {
		    db.run("UPDATE TSBT_WORD SET wordUsage = ? WHERE wordId = ?", [(data[0].wordUsage + 1), data[0].wordId]);
		    words.push(data);
		}
		else {
		    db.run("INSERT INTO TSBT_WORD (wordName) VALUES (?)",[word.toLowerCase()], function(data) {
			words.push({
			    wordId : data,
			    wordName : word,
			    wordUsage : 0
			});
		    });
		}
	    });

	    if(i+1 === wordArray.length) {
		sentenceDone(words);
	    }
	}
	console.log(j);
	if(j+1 === sentenceArray.length) {
	    messageDone();
	}
    }

    function messageDone() {
	res.end(JSON.stringify(sentences));
    }

    function sentenceDone(words) {
	sentences.push(words);
    }
    
    
});



var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host, port);
});





