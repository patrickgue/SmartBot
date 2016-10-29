var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var file = "./data/database.db";
var exists = fs.existsSync(file);
var db = new sqlite3.Database(file);

db.serialize(function(){
    if(!exists) {

	/* tables */
	db.run("CREATE TABLE TSBT_USER ("
               + "userId INTEGER PRIMARY KEY AUTOINCREMENT, "
               + "userName STRING, "
               + "userPassword STRING"
               + ")");
	
	db.run("CREATE TABLE TSBT_WORD ("
	       + "wordId INTEGER PRIMARY KEY AUTOINCREMENT, "
	       + "wordName STRING, "
	       + "wordUsage INTEGER DEFAULT 0"
	       + ")");
	db.run("CREATE TABLE TSBT_SENTENCE ("
	       + "sentenceId INTEGER PRIMARY KEY AUTOINCREMENT, "
	       + "sentenceUsage INTEGER DEFAULT 0,"
	       + "sentenceHash STRING"
	       + ")");

	db.run("CREATE TABLE TSBT_WORD_SENTENCE ("
	       + "wordSentenceId INTEGER PRIMARY KEY AUTOINCREMENT, "
	       + "wordSentenceWordId INTEGER, "
	       + "wordSentenceSentenceId INTEGER, "
	       + "wordSentencePosition INTEGER"
	       + ")")

	
	
    }
});


function select(query, done) {
    var rows = [];
    db.each(query, function(err,row) {
	rows.push(row);
    }, function() {
	if(done !== undefined) {
	    done(rows);
	}
    });
}

function run(query, argsarray, done) {
    var stmt = db.prepare(query);
    stmt.run(argsarray);
    stmt.finalize();
    select("SELECT last_insert_rowid();", function(d) {
	if(done !== undefined){
	    done(d[0]["last_insert_rowid()"]);
	}
    });

}

module.exports = {
    select : select,
    run : run
}
