// Given a string `str` and a dictionary `dict` containing a list of non-empty words,
// add spaces in `str` to construct a “sentence” where each word is a valid word in `dict`.
//
// Return all possible sentences.
//
// There are no words in str which are not in the dict
// (You are allowed to reuse the words in dict.)

/*
str = "penpineapplepenapple"
dict = ["apple", "pen", "applepen", "pine", "pineapple"]

makeSentence(str, dict)

Output: [
  "pen pine apple pen apple",
  "pen pineapple pen apple",
  "pen pine applepen apple"
]
 */

function makeSentence(str, dict) {
  // Input validation omitted for brevity. I included only the code bneeded to pass the requirements.

  const sentences = [];

  function buildSentences(prefix, strRemaining) {
    // Check if any word ...
    dict.forEach((word) => {
      // ... matches the next chunk of string
      const stringChunk = strRemaining.substring(0, word.length);
      if (stringChunk !== word) {
        return;
      }

      // WE GOT A MATCH

      const nextStrRemaining = strRemaining.substring(word.length);
      const currentPartialSentence = !!prefix ? `${prefix} ${word}` : `${word}`;

      // If we are at the end of the input string, add the found sentences to the output ...
      if (!nextStrRemaining) {
        sentences.push(currentPartialSentence);
        return;
      }

      // ... if we are not at the end of the input, continue constructing the sentence.
      // WARNING: with enough data this will generate a stack overflow.
      // If there is a lot of data, we should implement tail call recursion to leverage tail call optimization.
      buildSentences(currentPartialSentence, nextStrRemaining);
    })
  }

  buildSentences('', str)

  return sentences.sort(); // This will generate predictable sorted output
}

const { assert } = require('chai');

describe('Task 1', () => {

  it('handles simple input', () => {
    const result = makeSentence('a', ['a']);

    assert.deepEqual(result, ['a']);
  });

  it('handles simple input 2', () => {
    const result = makeSentence('aa', ['a']);

    assert.deepEqual(result, ['a a']);
  });

  it('handles multiple words', () => {
    const result = makeSentence('ab', ['a', 'b']);

    assert.deepEqual(result, ['a b']);
  });

  it('handles inverted order words', () => {
    const result = makeSentence('ba', ['a', 'b']);

    assert.deepEqual(result, ['b a']);
  });

  it('handles multiple length matches', () => {
    const result = makeSentence('ab', ['a', 'b', 'ab']);

    assert.deepEqual(result, ['a b', 'ab']);
  });

  it('handles provided example', () => {
    const result = makeSentence('penpineapplepenapple', ['apple', 'pen', 'applepen', 'pine', 'pineapple']);

    assert.deepEqual(result, [
      'pen pine apple pen apple', // Provided in example 1
      'pen pine applepen apple', // Provided in example 3
      'pen pineapple pen apple', // Provided in example 2
    ]);
  });
});
