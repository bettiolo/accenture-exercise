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

  if (typeof str !== 'string') {
    return null;
  }
  if (!Array.isArray(dict)) {
    return null;
  }

  const sentences = [];

  // At each letter of the input string ...
  for (let stringPos = 0; stringPos < str.length; stringPos++) {

    // ... check if any word...
    dict.forEach((word) => {

      // ... matches the next chunk of string
      const stringChunk = str.substring(stringPos, stringPos + word.length);
      if (stringChunk !== word) {
        return;
      }

      // Add the current match avoiding duplicates
      if (!sentences.includes(word)) {
        sentences.push(word);
      }

      // Check if other words match the rest of the string ...
      const strRemaining = str.substring(stringPos + word.length);
      const remainingSentences = makeSentence(strRemaining, dict);

      // ... append them to the current match
      remainingSentences.forEach((remainingSentence) => {
        sentences.push(`${word} ${remainingSentence}`);
      })

    })
  }

  return sentences.sort(); // This will generate predictable sorted output
}

const { assert } = require('chai');

describe('Task 1', () => {

  it('handles bad string input', () => {
    const result = makeSentence(123, null);

    assert.deepEqual(result, null);
  });

  it('handles bad dict input', () => {
    const result = makeSentence('', null);

    assert.deepEqual(result, null);
  });

  it('handles empty input', () => {
    const result = makeSentence('', ['']);

    assert.deepEqual(result, []);
  });

  it('handles simple input', () => {
    const result = makeSentence('a', ['a']);

    assert.deepEqual(result, ['a']);
  });

  it('handles simple input 2', () => {
    const result = makeSentence('aa', ['a']);

    assert.deepEqual(result, ['a', 'a a']);
  });

  it('handles multiple words', () => {
    const result = makeSentence('ab', ['a', 'b']);

    assert.deepEqual(result, ['a', 'a b', 'b']);
  });

  it('handles inverted order words', () => {
    const result = makeSentence('ba', ['a', 'b']);

    assert.deepEqual(result, ['a', 'b', 'b a']);
  });

  it('handles multiple matches', () => {
    const result = makeSentence('abc', ['a', 'b', 'c']);

    assert.deepEqual(result, ['a', 'a b', 'a b c', 'a c', 'b', 'b c', 'c']);
  });

  it('handles multiple length matches', () => {
    const result = makeSentence('ab', ['a', 'b', 'ab']);

    assert.deepEqual(result, ['a', 'a b', 'ab', 'b']);
  });

  it('handles provided example', () => {
    const result = makeSentence('penpineapplepenapple', ['apple', 'pen', 'applepen', 'pine', 'pineapple']);

    assert.deepEqual(result, [
      'apple',
      'apple apple',
      'apple pen',
      'apple pen apple',
      'applepen',
      'applepen apple',
      'pen',
      'pen apple',
      'pen apple',
      'pen apple apple',
      'pen apple pen',
      'pen apple pen apple',
      'pen applepen',
      'pen applepen apple',
      'pen pen',
      'pen pen apple',
      'pen pine',
      'pen pine apple',
      'pen pine apple apple',
      'pen pine apple pen',
      'pen pine apple pen apple', // Provided example 1
      'pen pine applepen',
      'pen pine applepen apple', // Provided example 3
      'pen pine pen',
      'pen pine pen apple',
      'pen pineapple',
      'pen pineapple apple',
      'pen pineapple pen',
      'pen pineapple pen apple', // Provided example 2
      'pine',
      'pine apple',
      'pine apple apple',
      'pine apple pen',
      'pine apple pen apple',
      'pine applepen',
      'pine applepen apple',
      'pine pen',
      'pine pen apple',
      'pineapple',
      'pineapple apple',
      'pineapple pen',
      'pineapple pen apple',
    ]);
  });
});
