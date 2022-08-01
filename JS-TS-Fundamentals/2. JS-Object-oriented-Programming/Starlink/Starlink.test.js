import Operator from "./classes/Operator.js";
import Overlord from "./classes/Overlord.js";

describe("Starlink", () => {
  const operator = new Operator("Tom", "Jerry");
  const overlord = new Overlord("Robert", "Maklowicz");
  //   const testSat = new Satellite({
  //     height: 650,
  //     coordinates: { x: "615.5", y: "600.55" },
  //   });

  // test("New instance of Operator is created", () => {
  //   expect(operator instanceof Operator).toBe(true);
  // });

  // test("New instance of Overlord is created", () => {
  //   expect(overlord instanceof Operator).toBe(true);
  // });

  beforeAll(() => {});

  test("A new Satellite is created by an operator", () => {
    const satelite = operator.satellitesManager.createNewSatellite({
      height: 650,
      coordinates: { x: "615.5", y: "600.55" },
    });
    expect(operator.satellitesManager.allSatellitesList.length).toBe(1);
  });

  test("A new Group is created by an operator", () => {
    operator.groupManager.createNewSatelliteGroup("Operator Group 1");
    expect(operator.groupManager.allSatellitesGroups.length).toBe(1);
  });

  test("A new Satellite is created by an overlord", () => {
    const mockedSateliteConstructor = {
      height: 1990,
      coordinates: { x: "994.5", y: "988.9" },
    };

    overlord.satellitesManager.createNewSatellite(mockedSateliteConstructor);
    expect(overlord.satellitesManager.allSatellitesList.length).toBe(2);
  });

  test("A new Group is created by an overlord", () => {
    overlord.groupManager.createNewSatelliteGroup("Overlord Group 1");
    expect(overlord.groupManager.allSatellitesGroups.length).toBe(2);
  });

  // test("The first Group is empty", () => {
  //   const firstGroup = overlord.groupManager.getSatellitesGroups()[0];
  //   console.log(firstGroup);

  //   const satsOfGroup = firstGroup.getGroupSatellitesList();
  //   console.log(satsOfGroup);

  //   expect(satsOfGroup.length).toBe(0);
  // });

  test("A first Satellite in the list is added to the first group in the list", () => {
    const sat1 = overlord.satellitesManager.allSatellitesList[0];
    const firstGroup = overlord.groupManager.getSatellitesGroups()[0];

    overlord.satellitesManager.addSatelliteToGroup(
      sat1,
      firstGroup.id,
      overlord.groupManager.allSatellitesGroups
    );
    expect(
      overlord.groupManager.allSatellitesGroups[0].satellitesList.length
    ).toBe(1);
  });

  test("Height of all Satellites in the first Group in the list is changed to given number", () => {
    // GIVEN
    const givenMockedNumber = 9999999;
    const selectedSateliteByMockedId =
      overlord.satellitesManager.allSatellitesList[0];
    const firstGroup = overlord.groupManager.getSatellitesGroups()[0];

    // WHEN
    overlord.groupManager.setGroupProperty(
      overlord.satellitesManager.allSatellitesList,
      "height",
      firstGroup.id,
      givenMockedNumber
    );

    // THEN
    expect(satellitesManager.allSatellitesList[0].location.height).toBe(
      givenMockedNumber
    );
  });

  //   test("A new satellite is added to the group", () => {
  //     testGroup.addToGroup(testSat.id);
  //     console.log(testGroup.satellitesList);
  //     expect(testGroup.satellitesList.length).toBe(1);
  //     expect(testGroup.satellitesList[0]).toBe(testSat.id);
  //   });

  //   test("Satellite already exisiting in the group list can't be added", () => {
  //     expect(() => testGroup.addToGroup(testSat.id)).toThrow(
  //       "Satellite already exists in the group"
  //     );
  //   });

  //   test("An existing satellite is removed from the group", () => {
  //     testGroup.removeFromGroup(testSat);
  //     console.log(testGroup.satellitesList);
  //     expect(testGroup.satellitesList.length).toBe(0);
  //   });
});
