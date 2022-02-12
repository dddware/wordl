import { useState, useMemo, useEffect } from "react";
import classNames from "classnames";
import tryWord, { WRONG, MISPLACED, RIGHT } from "./tryWord";

const ONGOING = 0;
const LOST = 1;
const WON = 2;
const UNKNOWN = "unknown";

export default function Wordl({ dictionary, answer, maxAttempts }) {
  const [word, setWord] = useState("");
  const [propositions, setPropositions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [gameState, setGameState] = useState(ONGOING);

  const [letterStates, setLetterStates] = useState(
    "qwertyuiopasdfghjklzxcvbnm".split("").reduce((acc, cur) => ({ ...acc, [cur]: UNKNOWN }), {})
  );

  // Memoize proposition validity
  const propositionStates = useMemo(() => {
    return propositions.map(proposition => {
      const propositionState = tryWord(proposition, answer);
      const letterStatesCopy = { ...letterStates };

      // Hijack this to keep track of overall letter state
      propositionState.forEach((letterState, index) => {
        if (letterState === RIGHT
          || (letterState === MISPLACED && letterStates[proposition[index]] !== RIGHT)
          || (letterState === WRONG && letterStates[proposition[index]] === UNKNOWN)
        ) {
          letterStatesCopy[proposition[index]] = letterState;
        }
      });

      setLetterStates(letterStatesCopy);

      return propositionState;
    });
  }, [propositions]);

  // Handle victory and defeat
  useEffect(() => {
    if (propositionStates.length > 0 && propositionStates[propositionStates.length - 1].every(letterState => letterState === RIGHT)) {
      setGameState(WON);
    } else if (propositions.length === maxAttempts) {
      setGameState(LOST);
    }
  }, [propositions]);

  function submitWord() {
    setErrorMessage("");

    if (propositions.includes(word)) {
      setErrorMessage("Word already submitted");
    } else if (!dictionary.includes(word)) {
      setErrorMessage("Word not included in dictionary");
    } else {
      setPropositions(propositions => [...propositions, word]);
    }

    setWord("");
  }

  function getClassName(letterState) {
    switch (letterState) {
      case WRONG:
        return "letter-wrong";
      case MISPLACED:
        return "letter-misplaced";
      case RIGHT:
        return "letter-right";
      default:
        return "";
    }
  }

  return (
    <div className="Wordl">
      <h1>WORDL</h1>
      {errorMessage && (
        <div className="error">{errorMessage}</div>
      )}
      <table className="propositions">
        <tbody>
          {propositions.map((proposition, propositionIndex) => (
            <tr key={propositionIndex}>
              {proposition.split("").map((letter, letterIndex) => (
                <td
                  key={letterIndex}
                  className={classNames(
                    "letter",
                    getClassName(propositionStates[propositionIndex][letterIndex])
                  )}
                >{letter.toUpperCase()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {gameState === WON && (<div>BRAVO TU A GAGNER</div>)}
      {gameState === LOST && (<div>C PERDU (CT <b>{answer.toUpperCase()}</b>)</div>)}
      {gameState === ONGOING && (
        <>
          <form onSubmit={event => {
            event.preventDefault();
            submitWord();
          }}>
            <input
              type="text"
              maxLength={answer.length}
              pattern={`[A-Z]{${answer.length}}`}
              value={word.toUpperCase()}
              onChange={event => setWord(event.target.value.toLowerCase())}
            />
            <button type="submit">Go</button>
          </form>
          <div className="letters">
            {Object.keys(letterStates).map((letter, index) => (
              <div key={index} className={classNames(
                "letter",
                getClassName(letterStates[letter])
              )}>{letter.toUpperCase()}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
