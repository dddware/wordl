const WRONG = 0;
const MISPLACED = 1;
const RIGHT = 2;

function getCharacterIndexes(character, string) {
  return string.split("").reduce((indexes, currentCharacter, index) => {
    if (currentCharacter === character) {
      indexes.push(index);
    }

    return indexes;
  }, []);
}

export default function tryWord(proposition, answer) {
  if (proposition.length !== answer.length) {
    throw new Error("Invalid length");
  }

  const usedIndexes = [];

  return proposition.split("").reduce((result, letter, index) => {
    if (letter === answer[index]) {
      result.push(RIGHT);
      usedIndexes.push(index);
    } else {
      // Check if letter is used somewhere else and isn't correctly guessed
      const unusedIndexes = getCharacterIndexes(letter, answer)
        .filter(index => proposition[index] !== answer[index] && !usedIndexes.includes(index));

      if (unusedIndexes.length > 0) {
        result.push(MISPLACED);
        usedIndexes.push(unusedIndexes[0]);
      } else {
        result.push(WRONG);
      }
    }

    return result;
  }, []);
}

export { WRONG, MISPLACED, RIGHT };
