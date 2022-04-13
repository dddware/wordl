/**
 * @param {String[][]} possibleLetters
 *
 * @return {String[]}
 */
export default function mapPossibleLetters(possibleLetters) {
  if (possibleLetters.length > 1) {
    const remainder = possibleLetters.slice(1);

    return possibleLetters[0].reduce(
      (possibleWords, letter) => [...possibleWords, ...mapPossibleLetters(remainder).map(possibleLetter => letter + possibleLetter)],
      []
    );
  }

  return possibleLetters[0];
}
