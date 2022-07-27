import GroupOfSatellites from "./GroupOfSatellites.js";

describe("Location", () => {
  const testGroup = new GroupOfSatellites("TestGroup");

  test("New instance of GroupOfSatellites is created", () => {
    expect(testGroup instanceof GroupOfSatellites).toBe(true);
  });
});
