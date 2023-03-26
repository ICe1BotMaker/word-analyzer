# word-analyzer

`Word-analyzer` is a library that allows you to create simple languages in `javascript` or `typescript`.

This library was created with the will to "create my own programming language."


## Install

```
$ npm install word-analyzer
```


## How to make this?

I made it using only `typescript`.

The reason why I used `typescript` is to review it.

- First of all, we created a function called `insertWord` that allows you to insert tags easily because you have to use tags.

- For those of you who want to put a semiclon at the end like `c language`, we created a function called `setClosingText`.

- And because annotations play a big role in programming languages, they create a function called `defineCommentText`.

- Finally, we created a function called `analyzeGrammar` to test whether the text you entered is grammatical.


## Usage

`Start`

```
$ npx ts-node word-analyzer.ts
```


`insertWord`

```js
wordAnalyzer.insertWord(`@print`, {
    type: `print`,
    grammer: `@print '(|<String>|)';`,
});
```


`setClosingText`

```js
wordAnalyzer.setClosingText(`;`);
```


`defineCommentText`

```js
wordAnalyzer.defineCommentText(`//`);
```


`analyzeGrammar`

```js
wordAnalyzer.analyzeGrammar(`@print 'test';`);
```