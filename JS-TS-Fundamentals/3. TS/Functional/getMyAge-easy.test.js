import { getMyAge } from "./getMyAge-easy.js";

describe("Provide different types of year and get correct age back", () => {
  const stringYear = "1995";
  const numYear = 1995;
  const dateYear = new Date("12/12/1995");

  test("Provide some string year and get correct age", () => {
    expect(getMyAge(stringYear)).toBe(27);
  });

  test("Provide some number year and get correct age", () => {
    expect(getMyAge(numYear)).toBe(27);
  });

  test("Provide some date and get correct age", () => {
    expect(getMyAge(dateYear)).toBe(27);
  });
});
