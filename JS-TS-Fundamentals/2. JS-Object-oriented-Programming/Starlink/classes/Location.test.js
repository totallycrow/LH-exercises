import Validator from "../../Validator.js";
import Location from "./Location.js";

describe("Location", () => {
  const testLoc = new Location(1200, { x: "150.2", y: "121.35" });

  test("Confirms setHeight() is a function", () => {
    expect(typeof testLoc.setHeight).toEqual("function");
  });

  test("Location height is changed to 5", () => {
    testLoc.setHeight(5);
    expect(testLoc.height).toBe(5);
  });

  test("Location height is changed to 1200", () => {
    testLoc.setHeight(1200);
    expect(testLoc.height).toBe(1200);
  });

  test("Coordinate x is changed to 22.48", () => {
    testLoc.setCoordinateX("22.48");
    expect(testLoc.coordinates.x).toBe("22.48");
  });

  test("Coordinate y is changed to 400.51", () => {
    testLoc.setCoordinateY("400.51");
    expect(testLoc.coordinates.y).toBe("400.51");
  });

  test("Coordinate y is can't be set to number 5", () => {
    testLoc.setCoordinateY(5);
    expect(testLoc.coordinates.y).toBe(5);
  });
});
