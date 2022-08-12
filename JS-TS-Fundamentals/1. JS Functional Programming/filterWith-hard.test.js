import { filterWith } from "./filterWith-hard.js";
import { arrayData } from "./mocks/mockArray.js";

describe("Provide some words and an array and see if the words are in the array", () => {
  const data = arrayData;

  test("Provide some name and see if it's in the array", () => {
    const mockWord = "nisi";
    const numberOfMatchesFound = filterWith(data, mockWord).length;
    console.log(numberOfMatchesFound);

    expect(numberOfMatchesFound).toBe(2);
  });
});
