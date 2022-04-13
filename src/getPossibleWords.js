import mapPossibleLetters from "./mapPossibleLetters";

/**
 * @param {(String|null)[]} knownLetters     Known letters at given positions
 * @param {String[]}        availableLetters Letters that can appear
 * @param {String[]}        mandatoryLetters Letters that must appear at least once
 * @param {String[][]}      constraints      Letters that cannot appear at given positions
 *
 * @return {String[]}
 */
export default function getPossibleWords(knownLetters, availableLetters, mandatoryLetters, constraints) {
  const possibleLetters = knownLetters.map((knownLetter, index) => {
    if (knownLetter) {
      return [knownLetter];
    }

    return availableLetters.filter(letter => !(constraints[index] || []).includes(letter));
  });

  return mapPossibleLetters(possibleLetters).filter(word => mandatoryLetters.every(letter => word.includes(letter)));
}
