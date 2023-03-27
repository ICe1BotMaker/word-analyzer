'use strict';

// insertWord option interface
interface Ioption {
    // return type
    type: string;

    // use grammer
    grammer: string;
}

// inserted word
let words: object[] = [];

// end of sentence text
let endText: string;

// annotation
let commentText: string;

/**
 * ### Word Analyzer 0.0.1 (test)
 * 
 * It's just a library that makes simple language.
 * 
 * - official document: https://github.com/ICe1BotMaker/word-analyzer
 */
const wordAnalyzer = {
    // insert word
    insertWord: (word: string, option: Ioption) => words = [...words, {word: word, option: option}],

    // set end of sentence text
    setClosingText: (text: string) => endText = text,

    // set annotation text
    defineCommentText: (text: string) => commentText = text,

    // grammar checker
    analyzeGrammar: (text: string) => {
        // separate full text into lines
        text.split(`\n`)
        .forEach((line: string, idx: number) => {
            // pass annotation
            if (line.startsWith(commentText) || line.trim() === ``) return;

            // end of sentence text error
            if (endText !== undefined && !line.endsWith(endText))
                throw new SyntaxError(`line: ${idx}\nYou must add '${endText}' at the end of a sentence.`);
            
            words.forEach((wordObj: any) => {
                // grammer to regexp
                const grammarReg = new RegExp(wordObj.option.grammer.replace(/\(\|\<[a-zA-Z]+\>\|\)/g, `([^\\s]*[\\s\\w]+[^\\s]*)`));
                
                if (grammarReg.test(line)) {
                    line.match(grammarReg)?.forEach((match: string, matchIdx: number) => {
                        // get including special characters type in regexp
                        const typeMatch = wordObj.option.grammer.match(/\(\|\<[a-zA-Z]+\>\|\)/g);

                        // get real type in typeMatch
                        let types: string[] = [];
                        typeMatch.forEach((e: any) => types = [...types, typeof eval(String(e.match(/(\w+)/)?.[0]))()]);

                        if (matchIdx === 0) return;

                        // capitalize the first letter
                        let type = types[matchIdx - 1].replace(/^[a-z]/, char => char.toUpperCase());

                        // check for correct type
                        if (types[matchIdx - 1] !== typeof eval(type)() || types[matchIdx - 1] === 'number' && isNaN(Number(match)))
                            throw new TypeError(`line: ${idx}\n${match} is not in type '${types[matchIdx - 1]}'`);
                
                        
                        // set type result
                        if (wordObj.option.type === `print`) {
                            console.log(match);
                        }

                        if (wordObj.option.type === `variable`) {
                            console.log(`type: ${type}, value: ${match}`);
                        }
                    });
                }
            });
        });
    }
}


wordAnalyzer.setClosingText(`;`);
wordAnalyzer.defineCommentText(`//`);

// wordAnalyzer.insertWord(`@print`, {
//     type: `print`,
//     grammer: `@print '(|<String>|)';`,
// });

// wordAnalyzer.insertWord(`@var`, {
//     type: `variable`,
//     grammer: `@var (|<String>|): (|<Number>|);`,
// });

// wordAnalyzer.analyzeGrammar(
//     `
//     @var asdf: 1;
//     @print 'test';
//     `
// );

wordAnalyzer.insertWord(`printf`, {
    type: `print`,
    grammer: `printf('(|<String>|)');`,
});

wordAnalyzer.insertWord(`@var`, {
    type: `variable`,
    grammer: `@var (|<String>|): (|<Number>|);`,
});

wordAnalyzer.analyzeGrammar(
    `
    @var asdf: 1;
    @print 'test';
    `
);