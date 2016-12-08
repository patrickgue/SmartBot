"use strict";

const db = require("./dbservice.js");


function aQ(str) { // Add Quotes
    return "\"" + str + "\"";
}


function dbWrap(table) {

    let sqlString = "";

    function doneRun(fun) {
	console.log(sqlString);
	db.run(sqlString,[],fun);
    }

    function doneSel(fun) {
	console.log(sqlString);
    }
    
    return {
	"insert" : function(fields) {
	    sqlString += "INSERT INTO " + table + " ("+fields.join(",")+") ";

	    
	    return {
		"values" : function(values) {
		    sqlString += " VALUES(\""+values.join(aQ(","))+"\")";
		    return {
			"done" : doneRun
		    };
		}
	    }
	},
	"update" : function(valuesObj) {
	    sqlString += "UPDATE " + table + " SET ";

	    let setComma = false;
	    for(let index in valuesObj) {
		if (setComma) {
		    sqlString += ", ";
		}
		else {
		    setComma = true;
		}

		let valueTerm = valuesObj[index];
		
		if (typeof valuesObj[index] === "string") {
		    valueTerm = aQ(valuesObj[index]);
		}
		
		sqlString += index + " = " + valueTerm;
	    }
	    
	    return {
		"where" : function(sqlStr) {
		    sqlString += " WHERE " + sqlStr;
		    return {
			done : doneRun
		    }
		},
		"done" : doneRun
	    }
	},
	"select" : function(fields) {
	    sqlString = "SELECT ";
	    sqlString += fields.join(", ") + " FROM " + table + " ";
	    return {
		where : function(whereStr) {
		    sqlString += "WHERE " + whereStr + " ";
		    return {
			done : doneSel,
			group : function(groupStr) {
			    sqlString += "GROUP BY " + groupStr + " ";
			    return {
				done : doneSel,
				order : function(orderStr) {
				    sqlString += "ORDER BY " + orderStr + " ";
				    return {
					done : doneSel
				    }
				}
			    }
			}
		    }
		},
		done : doneSel
	    };
	}

    };
    
}


module.exports = dbWrap;
