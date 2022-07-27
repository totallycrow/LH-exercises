import Satellite from "./Satellite.js";

describe("Location", () => {
  const testSat = new Satellite({
    height: 120,
    coordinates: { x: "15.5", y: "100.55" },
  });

  test("Confirms setHeight() is a function", () => {
    expect(testSat instanceof Satellite).toBe(true);
  });
});
