import GroupOfSatellites from "./GroupOfSatellites.js";
import Satellite from "./Satellite.js";

describe("Group of Satellites", () => {
  const testGroup = new GroupOfSatellites("TestGroup");
  const testSat = new Satellite({
    height: 650,
    coordinates: { x: "615.5", y: "600.55" },
  });

  test("New instance of GroupOfSatellites is created", () => {
    expect(testGroup instanceof GroupOfSatellites).toBe(true);
  });

  test("Group of satellites is renamed", () => {
    testGroup.setGroupName("TEST-NAME-OVERWRITE");
    expect(testGroup.groupName).toBe("TEST-NAME-OVERWRITE");
  });

  test("A new satellite is added to the group", () => {
    testGroup.addToGroup(testSat.id);
    console.log(testGroup.satellitesList);
    expect(testGroup.satellitesList.length).toBe(1);
    expect(testGroup.satellitesList[0]).toBe(testSat.id);
  });

  test("Satellite already exisiting in the group list can't be added", () => {
    expect(() => testGroup.addToGroup(testSat.id)).toThrow(
      "Satellite already exists in the group"
    );
  });

  test("An existing satellite is removed from the group", () => {
    testGroup.removeFromGroup(testSat);
    console.log(testGroup.satellitesList);
    expect(testGroup.satellitesList.length).toBe(0);
  });
});
