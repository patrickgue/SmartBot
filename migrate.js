"use strict";
//migrate from sqlite to mysql


const sqlite = require("./services/dbservice.js");
const mysql = require("./services/dbservice.mysql.js");


mysql.run("DELETE FROM TSBT_USER" , [], function() {});

sqlite.select("SELECT * FROM TSBT_USER", function(rows) {
    for(let row of rows) {
	mysql.run("INSERT INTO TSBT_USER (userName, userPassword) VALUES(?,?)", [row.userName, row.userPassword], function() {});
    }
});


mysql.run("DELETE FROM TSBT_WORD" , [], function() {});

sqlite.select("SELECT * FROM TSBT_WORD", function(rows) {
    for(let row of rows) {
	//console.log(row);
	console.log("INSERT INTO TSBT_WORD (wordId, wordName, wordUsage) VALUES("+row.wordId+", \""+row.wordName + "\"," + row.wordUsage + ");");
    }
});
