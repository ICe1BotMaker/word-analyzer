// options interface
interface Ioption {
    // function type
    type: string;

    // grammer
    grammer: string;

    // delimiter
    delimiter: any;
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
    defineCommentText: (text: string) => commentText = text,

    // analyze grammar
    analyzeGrammar: (text: string) => {
        // split line
        text.split(`\n`)
        .forEach((line: string, idx: number) => {
            // skip comment
            if (line.startsWith(commentText) || line.trim() === ``) return;

            // closing text error
            if (endText !== undefined && !line.endsWith(endText))
                throw new SyntaxError(`line: ${idx}\nYou must add '${endText}' at the end of a sentence.`);
                
            words.forEach((wordObj: any, wordIdx: number) => {
                const grammarReg = new RegExp(wordObj.option.grammer.replace(/\(\|\<[a-zA-Z]+\>\|\)/g, `(\\w+)`));

                const typeMatch = wordObj.option.grammer.match(/\(\|\<[a-zA-Z]+\>\|\)/g);
                let types: string[] = [];
                typeMatch.forEach((e: any) => types = [...types, typeof eval(String(e.match(/(\w+)/)?.[0]))()]);
                
                if (grammarReg.test(line)) {
                    // console.log(types);
                    console.log(line.match(grammarReg)?.[2]);
                
                    // // result
                    // if (wordObj.option.type === `print`) {
                    //     console.log(type2);
                    // }
    
                    // if (wordObj.option.type === `variable`) {
                    //     console.log(type1, type2);
                    // }
                }

                // if (!grammarReg.test(line))
                //     throw new SyntaxError(`line: ${idx}\nThe grammar is incorrect.`);

                // if (typeof type1 !== typeof type2)
                //     throw new TypeError(`line: ${idx}\nInserted value is not in type '${type1}'`);
            });
        });
    }
}

// test
wordAnalyzer.setClosingText(`;`);
wordAnalyzer.defineCommentText(`//`);

wordAnalyzer.insertWord(`@print`, {
    type: `print`,
    grammer: `@print '(|<String>|)';`,
    delimiter: undefined
});

wordAnalyzer.insertWord(`@var`, {
    type: `variable`,
    grammer: `@var (|<String>|): (|<Number>|);`,
    delimiter: `:`
});

wordAnalyzer.analyzeGrammar(
    `
    @print 'asdf';
    @var test: 1;
    `
);