"use strict";

const mysql = require("mysql");

let connection = mysql.createConnection({
  host     : 'db55.netzone.ch',
  user     : 'rogerguenthar5',
  password : 'kinney94',
  database : 'rogerguenthar5'
});


function select(query, done) {
    connection.query(query, function(err, rows, fields) {
	if(err) {
	    done({
		error: err
	    });
	}
	else {
	    done(rows);
	}
    });
}

function run(query, argsarray, done) {
    connection.query(query, argsarray, function(err,res) {
	if (done !== undefined) {
	    if(!err) {
		done(res.insertId);
	    }
	    else {
		done(err);
	    }
	}
    });
}


module.exports = {
    select : select,
    run : run
}
