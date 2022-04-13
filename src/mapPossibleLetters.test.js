import mapPossibleLetters from "./mapPossibleLetters";

it("correctly maps possibilities on one levels", () => {
  expect(mapPossibleLetters([["a", "b", "c"]])).toStrictEqual([
    "a",
    "b",
    "c"
  ]);
});

it("correctly maps possibilities on two levels", () => {
  expect(mapPossibleLetters([["a", "b", "c"], ["d", "e", "f"]])).toStrictEqual([
    "ad",
    "ae",
    "af",
    "bd",
    "be",
    "bf",
    "cd",
    "ce",
    "cf"
  ]);
});

it("correctly maps possibilities on three levels", () => {
  expect(mapPossibleLetters([["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]])).toStrictEqual([
    "adg",
    "adh",
    "adi",
    "aeg",
    "aeh",
    "aei",
    "afg",
    "afh",
    "afi",
    "bdg",
    "bdh",
    "bdi",
    "beg",
    "beh",
    "bei",
    "bfg",
    "bfh",
    "bfi",
    "cdg",
    "cdh",
    "cdi",
    "ceg",
    "ceh",
    "cei",
    "cfg",
    "cfh",
    "cfi"
  ]);
});
