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

let dinge = [];

let zitate = [
    "Die Waffe der Kritik kann allerdings die Kritik der Waffen nicht ersetzen, die materielle Gewalt muß gestürzt werden durch materielle Gewalt, allein auch die Theorie wird zur materiellen Gewalt, sobald sie die Massen ergreift.",
    "Die Klasse, welche die herrschende materielle Macht der Gesellschaft ist, ist zugleich ihre herrschende geistige Macht.",
    "Jeder nach seinen Fähigkeiten, jedem nach seinen Bedürfnissen.",
    "Die Kritik hat die imaginären Blumen an der Kette zerpflückt, nicht damit der Mensch die phantasielose, trostlose Kette trage, sondern damit er die Kette abwerfe und die lebendige Blume breche.",
    "Der Tod ist kein Unglück für den, der stirbt, sondern für den, der überlebt.",
    "Religion ist Opium des Volkes.",
    "Jede Befreiungsbewegung verändert ihren Charakter, wenn sie von der Utopie zur Realität übergeht."
];

let triggerwords = [
    "hitler",
    "hass",
    "love",
    "pussy",
    "jarvis",
    "alfred",
    "dick",
    "gay",
    "yoe",
    "jude",
    "hey",
    "nei",
    "smartbot",
    "suprem",
    "güni",
    "günni",
    "günard",
    "günnard",
    "kill"
];

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


app.post("/message/", function(req, res) {
    let message = req.body.message.toLowerCase();
    console.log(message);

    /* Hilfe */
    if(message.indexOf("smartbot, hilfe") > -1) {
	res.end("smartbot, [...] (1) was ist ... (2) kunst (3) ding ... (4) alle dinge (5) marx");
    }
    
    /* Wikibot */
    if(message.indexOf("smartbot, was ist") > -1) {
	let baseSearchUrl = "https://de.wikipedia.org/w/index.php?search=";
	let searchString = encodeURI(message.substr(18));
	res.end("Hier, lies selbst: " + "\"" + baseSearchUrl  + searchString + "\"");
    }

    /* Beauty */
    if(message.indexOf("smartbot, :(") > -1) {
	res.end("You are beautiful!!! <3");
    }

    
    /* Dinge hinzufuegen */
    if(message.indexOf("smartbot, ding") > -1) {
	dinge.push(message.substr(15));
	
	res.end("Ding \"" + message.substr(15)+ "\" hinzugefuegt!");
    }

    /* Alle Dinge */
    if(message.indexOf("smartbot, alle dinge") > -1) {
	dinge
	
	res.end("Dinge: " + dinge.join(", "));
    }

    /* Marx */
    if(message.indexOf("smartbot, marx") > -1) {
	let zitatNr = Math.floor(Math.random() * zitate.length);
	res.end("\""+zitate[zitatNr] + "\" - Karl Marx");
    }

    /* Kunst */
    if(message.indexOf("smartbot, kunst") > -1) {
	let baseMessage = "Enjoy! https://www.moma.org/collection/works/";
	let randNumber = 78772 + Math.floor(Math.random() * 13);
	res.end(baseMessage + randNumber);
	//78772
    }

    /* Prank */
    if (message.indexOf("$") == 0) {
	if (message.indexOf("ls") == 2) {
	    res.end(". .. bin boot dev etc home initrd.img lib lib64 lost+found media mnt opt proc root run sbin srv sys tmp usr var vmlinuz");
	}
	else if(message.indexOf("rm") == 2) {
	    res.end("> Fuck You!");
	}
	else {
	    res.end("> bash: command not found");
	}
    }
    
    /* Trigger filter 
     *  send many love if someone tries to be offensive
     */
    for(let tr of triggerwords) {
	if(message.indexOd(tr) > -1) {
	    res.end("Many Love!!!");
	}
    }



    /* default answer if non of the functionalities above are used */
    try {
	res.status(500);
	res.end();
    } catch(e) {
	console.log("already ended http connection");
    }

});

var server = app.listen(4084, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host, port);
});




