import tryWord, { WRONG, MISPLACED, RIGHT } from "./tryWord";

it("matches right letters", () => {
  expect(tryWord("abcde", "abcde")).toStrictEqual([
    RIGHT,
    RIGHT,
    RIGHT,
    RIGHT,
    RIGHT
  ]);
});

it("matches wrong letters", () => {
  expect(tryWord("abcde", "fghij")).toStrictEqual([
    WRONG,
    WRONG,
    WRONG,
    WRONG,
    WRONG
  ]);
});

it("matches misplaced letters", () => {
  expect(tryWord("abcde", "edcba")).toStrictEqual([
    MISPLACED,
    MISPLACED,
    RIGHT,
    MISPLACED,
    MISPLACED
  ]);
});

it("correctly handles repetitions in answer", () => {
  expect(tryWord("abcde", "baade")).toStrictEqual([
    MISPLACED,
    MISPLACED,
    WRONG,
    RIGHT,
    RIGHT
  ]);
});

it("correctly handles repetitions in proposition", () => {
  expect(tryWord("baade", "abcde")).toStrictEqual([
    MISPLACED,
    MISPLACED,
    WRONG,
    RIGHT,
    RIGHT
  ]);
});

it("prioritizes right letters", () => {
  expect(tryWord("baade", "cbade")).toStrictEqual([
    MISPLACED,
    WRONG,
    RIGHT,
    RIGHT,
    RIGHT
  ]);

  expect(tryWord("baacd", "abaca")).toStrictEqual([
    MISPLACED,
    MISPLACED,
    RIGHT,
    RIGHT,
    WRONG
  ]);

  expect(tryWord("abaca", "baacd")).toStrictEqual([
    MISPLACED,
    MISPLACED,
    RIGHT,
    RIGHT,
    WRONG
  ]);
});
