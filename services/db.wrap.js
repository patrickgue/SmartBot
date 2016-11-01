"use strict";

const db = require("./dbservice.mysql.js");




function dbWrap(table) {

    let sqlString = "";

    function doneRun(fun) {
	db.run(sqlString,[],fun);
    }
    
    return {
	"insert" : function(fields) {
	    sqlString += "INSERT INTO " + table + " ("+fields.join(",")+") ";

	    
	    return {
		"values" : function(values) {
		    sqlString += " VALUES(\""+values.join("\",\"")+"\")"
		    return {
			"done" : doneRun
		    };
		}
	    }
	},
	"update" : function(valuesObj) {
	    sqlString += "UPDATE " + table + " ";
	    return {
		"where" : function() {

		},
		"done" : doneRun
	    }
	} 

    };
    
}


module.exports = dbWrap;
