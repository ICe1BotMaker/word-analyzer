// options interface
interface Ioption {
    // function type
    type: string;

    // grammer
    grammer: string;
}

// words
let words: any[] = [];

// closing text
let endText: string;

// comment text
let commentText: string;

/**
 * Word Analyzer 0.0.1 (test)
 * 
 * It's just a library that makes simple language.
 */
const wordAnalyzer = {
    // insert word
    insertWord: (word: string, option: Ioption) => words = [...words, {word: word, option: option}],

    // set closing text
    setClosingText: (text: string) => endText = text,

    // set comment text
    defineCommentText: (text: string) => endText = text,

    // analyze grammar
    analyzeGrammar: (text: string) => {
        text.split(`\n`)
        .forEach((line: string, idx: number) => {
            if (line.startsWith(commentText)) return;

            // closing text error
            if (endText !== undefined && !line.endsWith(endText))
                throw new SyntaxError(`line: ${idx}\nYou must add '${endText}' at the end of a sentence.`);

            line.split(` `)
            .forEach((word: string) => {
                
            });
        });
    }
}

// test
wordAnalyzer.setClosingText(`;`);

wordAnalyzer.insertWord(`@print`, {
    type: `log`,
    grammer: `@print (|<String>|)`,
});

wordAnalyzer.analyzeGrammar(
    `@print 'hello, world!';`
);