import { getMyAge } from "./getMyAge-easy.js";

describe("Provide different types of year and get correct age back", () => {
  const stringYear = "1995";
  const numYear = 1995;
  const dateYear = new Date("12/12/1995");
  const invalidYear = "1250";

  test("Provide some string year and get correct age back", () => {
    expect(getMyAge(stringYear)).toBe(27);
  });

  test("Provide some number year and get correct age back", () => {
    expect(getMyAge(numYear)).toBe(27);
  });

  test("Provide some date and get correct age back", () => {
    expect(getMyAge(dateYear)).toBe(27);
  });
  test("See if possible to provide an invalid year", () => {
    expect(getMyAge(invalidYear)).toThrow("Invalid birth year");
  });
});
