import Validator from "../../Validator.js";
import Location from "./Location.js";

describe("Test", () => {
  const testLoc = new Location(1200, { x: "150.2", y: "121.35" });

  test("defines setHeight()", () => {
    expect(typeof testLoc.setHeight).toEqual("function");
  });
});
