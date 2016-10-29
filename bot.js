"use strict";

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


const express = require('express');
const https = require("https");
const http = require("http");
const db = require('./services/dbservice.mysql.js');
const bodyParser = require('body-parser');
const sha1 = require('sha1');

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
    let message = req.body.message;
    message = message.replaceAll(",","").replaceAll("-","").replaceAll("\n","");
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
		    words[i] = data;
		}
		else {

		    db.run("INSERT INTO TSBT_WORD (wordName) VALUES (?)",[word.toLowerCase()], function(data) {
			words[i] = {
			    wordId : data,
			    wordName : word,
			    wordUsage : 0
			};
		    });
		}

		if(i+1 === wordArray.length) {
		    sentenceDone(words);
		    if(j+1 === sentenceArray.length) {
			messageDone();
		    }
		}
	    });

	    
	}
	console.log(j);
	
    }

    function messageDone() {
	res.end(JSON.stringify(sentences));
    }

    function sentenceDone(words) {
	sentences.push(words);

	let hash = sha1(words.join(""));
	
	db.select("SELECT * FROM TSBT_SENTENCE WHERE sentenceHash = \""+hash+"\"", function(data) {
	    if(data.length == 0) {
		db.run("INSERT INTO TSBT_SENTENCE (sentenceHash) VALUES(?)",[sha1(words.join())], function(key) {
		    /*let orderedWords = words.sort(function(v1, v2) {
		      v1.wordName < v2.wordName
		      });*/
		    
		    for(let i = 0; i < words.length; i++) {
			try{
			    db.run("INSERT INTO TSBT_WORD_SENTENCE (wordSentenceWordId, wordSentenceSentenceId, wordSentencePosition) VALUES(?,?,?)", [words[i][0].wordId, key, i]);
			} catch(e) {
			    console.log(e);
			}
			console.log("Word In Sentence:",words[i][0], key, i);
		    }
		});
		
	    }
	    /*else {
		db
	    }*/
	});
	

	
    }
    
    
});



var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host, port);
});





