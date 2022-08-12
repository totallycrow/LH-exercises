import { filterWith } from "./filterWith-hard.js";
import { arrayData } from "./mocks/mockArray.js";

describe("Provide some input and an array and see if there are any matches", () => {
  const data = arrayData;

  test("Provide some name and see if it's in the array", () => {
    const mockWord = "nisi";
    const numberOfMatchesFound = filterWith(data, mockWord).length;
    console.log(numberOfMatchesFound);

    expect(numberOfMatchesFound).toBe(2);
  });

  test("Provide some number and see if it's in the array", () => {
    const mockNum = 74984;
    const numberOfMatchesFound = filterWith(data, mockNum).length;
    console.log(numberOfMatchesFound);

    expect(numberOfMatchesFound).toBe(1);
  });

  test("Provide some number as text and see if it's in the array", () => {
    const mockNum = "74984";
    const numberOfMatchesFound = filterWith(data, mockNum).length;
    console.log(numberOfMatchesFound);

    expect(numberOfMatchesFound).toBe(1);
  });

  test("Provide too short input and see if there are any results", () => {
    const mockNum = "a";
    const numberOfMatchesFound = filterWith(data, mockNum).length;
    console.log(numberOfMatchesFound);

    expect(numberOfMatchesFound).toBe(0);
  });
});

// 74984
