# WORDL

## Setup

Install dependencies:

```sh
$ npm install
```

Retrieve dictionary:

```sh
$ curl https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt --output public/dictionary.txt
```

Any text file with one word on each line will do, as long all all words are the same length.

## Usage

```sh
$ npm start     # Run on localhost:3000
$ npm test      # Run unit tests
$ npm run build # Build for production
```

### Bonus: cheating device

Use the `getPossibleWords` function to see possibilities for a given situation:

```js
import getPossibleWords from "./getPossibleWords";

console.log(getPossibleWords(
  ["s", "a", "l", null, null], // known letters
  ["e", "t", "u"],             // available letters
  ["e"],                       // word contains at least one "e"
  [
    [],
    [],
    [],
    ["t"],                     // fourth letter cannot be "t"
    ["e", "u"]                 // fifth letter cannot be "e" or "u"
  ]
).join("\n"));

// Results:
// salet
```
