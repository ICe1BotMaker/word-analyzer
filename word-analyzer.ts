'use strict';

// insertWord option interface
interface Ioption {
    // return type
    type: string;

    // use grammer
    grammer: string;
}

// word analyzer interface
interface IWordAnalyzer {
    // inserted word
    words: { word: string; option: Ioption }[];

    // end of sentence text
    endText: string;

    // annotation
    commentText: string;

    // variables
    variables: { key: string; value: (string | undefined) }[];

    // functions
    insertWord: Function;
    setClosingText: Function;
    defineCommentText: Function;
    analyzeGrammar: Function;
}

/**
 * ### Word Analyzer 0.0.1 (test)
 * 
 * It's just a library that makes simple language.
 * 
 * - official document: https://github.com/ICe1BotMaker/word-analyzer
 */

const wordAnalyzer: IWordAnalyzer = {
    words: [],
    endText: ``,
    commentText: ``,

    variables: [],

    // insert word
    insertWord: (word: string, option: Ioption) => wordAnalyzer.words = [...wordAnalyzer.words, { word: word, option: option }],

    // set end of sentence text
    setClosingText: (text: string) => wordAnalyzer.endText = text,

    // set annotation text
    defineCommentText: (text: string) => wordAnalyzer.commentText = text,

    // grammar checker
    analyzeGrammar: (text: string) => {
        // separate full text into lines
        text.split(`\n`)
        .forEach((line: string, idx: number) => {
            // pass annotation
            if (line.startsWith(wordAnalyzer.commentText) || line.trim() === ``) return;

            // end of sentence text error
            if (wordAnalyzer.endText !== undefined && !line.endsWith(wordAnalyzer.endText))
                throw new SyntaxError(`line: ${idx}\nYou must add '${wordAnalyzer.endText}' at the end of a sentence.`);
            
            wordAnalyzer.words.forEach((wordObj: any) => {
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
                            let result: string = ``;

                            wordAnalyzer.variables.forEach((e: any) => {
                                if (e.key === match) {
                                    result = e.value;
                                } else {
                                    result = match;
                                }
                            });

                            console.log(result);
                        }

                        if (wordObj.option.type === `variable`) {
                            if (line.match(grammarReg)?.[matchIdx + 1] === undefined) return;

                            wordAnalyzer.variables = [...wordAnalyzer.variables, { key: match, value: line.match(grammarReg)?.[matchIdx + 1] }];
                        }
                    });
                }
            });
        });
    }
}


wordAnalyzer.setClosingText(`;`);
wordAnalyzer.defineCommentText(`//`);

wordAnalyzer.insertWord(`@print`, {
    type: `print`,
    grammer: `@print (|<String>|);`,
});

wordAnalyzer.insertWord(`@var`, {
    type: `variable`,
    grammer: `@var (|<String>|): (|<Number>|);`,
});

wordAnalyzer.analyzeGrammar(
    `
    @var asdf: 1;
    @print asdf;
    `
);