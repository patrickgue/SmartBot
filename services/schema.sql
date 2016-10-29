/* MySQL */

CREATE TABLE TSBT_USER (
       userId INTEGER NOT NULL AUTO_INCREMENT,
       userName VARCHAR(64) NOT NULL ,
       userPassword VARCHAR(64) NOT NULL,
       PRIMARY KEY (userId)
);
	
CREATE TABLE TSBT_WORD (
       wordId INTEGER AUTO_INCREMENT,
       wordName VARCHAR(64),
       wordUsage INTEGER DEFAULT 0,

       PRIMARY KEY (wordId)
);

CREATE TABLE TSBT_SENTENCE (
       sentenceId INTEGER  AUTO_INCREMENT,
       sentenceUsage INTEGER DEFAULT 0,

       PRIMARY KEY (sentenceId)
);

CREATE TABLE TSBT_WORD_SENTENCE (
       wordSentenceId INTEGER NOT NULL AUTO_INCREMENT,
       wordSentenceWordId INTEGER  NOT NULL,
       wordSentenceSentenceId INTEGER  NOT NULL,
       wordSentencePosition INTEGER  NOT NULL,

       PRIMARY KEY (wordSentenceId)
)
