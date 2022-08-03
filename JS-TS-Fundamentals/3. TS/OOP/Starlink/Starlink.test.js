import Operator from "./classes/Operator.js";
import Overlord from "./classes/Overlord.js";
import SatellitesManager from "./classes/SatellitesManager.js";
import GroupManager from "./classes/GroupManager.js";

describe("Add many satelites, divide them into groups and set height", () => {
  // Reset lists before each test
  beforeAll(() => {
    // SatellitesManager.getInstance().allSatellitesList = [];
    // GroupManager.getInstance().allSatellitesGroups = [];
    // const sateliteAObj = {
    //   height: 500,
    //   coordinates: { x: "500.50", y: "500.60" },
    // };
    // const sateliteBObj = {
    //   height: 600,
    //   coordinates: { x: "600.50", y: "600.60" },
    // };
    // const sateliteCObj = {
    //   height: 700,
    //   coordinates: { x: "700.50", y: "700.60" },
    // };
    // const sateliteDObj = {
    //   height: 800,
    //   coordinates: { x: "800.50", y: "800.60" },
    // };
  });

  const operator = new Operator("Tom", "Jerry");
  const overlord = new Overlord("Robert", "Maklowicz");

  test("Overlord created four satellites", () => {
    const sateliteA = overlord.satellitesManager.createNewSatellite({
      height: 500,
      coordinates: { x: "500.50", y: "500.60" },
    });
    const sateliteB = overlord.satellitesManager.createNewSatellite({
      height: 600,
      coordinates: { x: "600.50", y: "600.60" },
    });
    const sateliteC = overlord.satellitesManager.createNewSatellite({
      height: 700,
      coordinates: { x: "700.50", y: "700.60" },
    });
    const sateliteD = overlord.satellitesManager.createNewSatellite({
      height: 800,
      coordinates: { x: "800.50", y: "800.60" },
    });
    expect(SatellitesManager.getInstance().allSatellitesList.length).toBe(4);
  });

  test("Overlord created two groups", () => {
    overlord.groupManager.createNewSatelliteGroup("Overlord-Group-1");
    overlord.groupManager.createNewSatelliteGroup("Overlord-Group-2");
    expect(GroupManager.getInstance().allSatellitesGroups.length).toBe(2);
  });

  test("Overlord split the four satellites into two groups", () => {
    const groupA = overlord.groupManager.getSatellitesGroups()[0];
    const groupB = overlord.groupManager.getSatellitesGroups()[1];
    const allGroups = GroupManager.getInstance().getSatellitesGroups();
    const firstSat = SatellitesManager.getInstance().allSatellitesList[0];
    const secondSat = SatellitesManager.getInstance().allSatellitesList[1];
    const thirdSat = SatellitesManager.getInstance().allSatellitesList[2];
    const fourthSat = SatellitesManager.getInstance().allSatellitesList[3];

    overlord.satellitesManager.addSatelliteToGroup(
      firstSat,
      groupA.id,
      allGroups
    );
    overlord.satellitesManager.addSatelliteToGroup(
      secondSat,
      groupA.id,
      allGroups
    );
    overlord.satellitesManager.addSatelliteToGroup(
      thirdSat,
      groupB.id,
      allGroups
    );
    overlord.satellitesManager.addSatelliteToGroup(
      fourthSat,
      groupB.id,
      allGroups
    );

    expect(
      overlord.groupManager.allSatellitesGroups[0].satellitesList.length
    ).toBe(2);
    expect(
      overlord.groupManager.allSatellitesGroups[1].satellitesList.length
    ).toBe(2);
  });

  test("Overlord set the height of the first group of Satellites to 1020", () => {
    // GIVEN
    const givenMockedNumber = 1020;
    const firstGroup = overlord.groupManager.getSatellitesGroups()[0];

    overlord.setSatelliteGroupHeight(firstGroup.id, 1020);
    expect(
      SatellitesManager.getInstance().allSatellitesList[0].location.height
    ).toBe(1020);
    expect(
      SatellitesManager.getInstance().allSatellitesList[1].location.height
    ).toBe(1020);
  });

  test("Overlord set the emitter of the second group of Satellites on", () => {
    // GIVEN
    const secondGroup = overlord.groupManager.getSatellitesGroups()[1];

    overlord.setSatelliteGroupSignalEmitterStatus(secondGroup.id, "on");
    expect(
      SatellitesManager.getInstance().allSatellitesList[0].signalEmitterStatus
    ).toBe("off");
    expect(
      SatellitesManager.getInstance().allSatellitesList[2].signalEmitterStatus
    ).toBe("on");
  });

  test("Overlord turned all satellites on", () => {
    overlord.systemPowerOn();
    expect(
      SatellitesManager.getInstance().allSatellitesList[0].poweredStatus
    ).toBe("on");
  });

  test("Overlord turned the second group off", () => {
    const secondGroup = overlord.groupManager.getSatellitesGroups()[1];

    overlord.groupShutDown(secondGroup.id);
    expect(
      SatellitesManager.getInstance().allSatellitesList[2].poweredStatus
    ).toBe("off");
  });

  test("Overlord turned the whole system off", () => {
    overlord.systemShutDown();
    expect(
      SatellitesManager.getInstance().allSatellitesList[0].poweredStatus
    ).toBe("off");
    expect(
      SatellitesManager.getInstance().allSatellitesList[2].poweredStatus
    ).toBe("off");
  });
});

//   // ******************************
//   // ********** OLD TEST **********

//   // test("A new Satellite is created by an operator", () => {
//   //   const satelite = operator.satellitesManager.createNewSatellite({
//   //     height: 650,
//   //     coordinates: { x: "615.5", y: "600.55" },
//   //   });
//   //   expect(operator.satellitesManager.allSatellitesList.length).toBe(1);
//   // });

//   // test("A new Group is created by an operator", () => {
//   //   operator.groupManager.createNewSatelliteGroup("Operator Group 1");
//   //   expect(operator.groupManager.allSatellitesGroups.length).toBe(1);
//   // });

//   // test("A new Satellite is created by an overlord", () => {
//   //   const mockedSateliteConstructor = {
//   //     height: 1990,
//   //     coordinates: { x: "994.5", y: "988.9" },
//   //   };

//   //   overlord.satellitesManager.createNewSatellite(mockedSateliteConstructor);
//   //   expect(overlord.satellitesManager.allSatellitesList.length).toBe(2);
//   // });

//   // test("A new Group is created by an overlord", () => {
//   //   overlord.groupManager.createNewSatelliteGroup("Overlord Group 1");
//   //   expect(overlord.groupManager.allSatellitesGroups.length).toBe(2);
//   // });

//   // // test("The first Group is empty", () => {
//   // //   const firstGroup = overlord.groupManager.getSatellitesGroups()[0];
//   // //   console.log(firstGroup);

//   // //   const satsOfGroup = firstGroup.getGroupSatellitesList();
//   // //   console.log(satsOfGroup);

//   // //   expect(satsOfGroup.length).toBe(0);
//   // // });

//   // test("A first Satellite in the list is added to the first group in the list", () => {
//   //   const sat1 = overlord.satellitesManager.allSatellitesList[0];
//   //   const firstGroup = overlord.groupManager.getSatellitesGroups()[0];

//   //   overlord.satellitesManager.addSatelliteToGroup(
//   //     sat1,
//   //     firstGroup.id,
//   //     overlord.groupManager.allSatellitesGroups
//   //   );
//   //   expect(
//   //     overlord.groupManager.allSatellitesGroups[0].satellitesList.length
//   //   ).toBe(1);
//   // });

//   // test("Height of all Satellites in the first Group in the list is changed to given number", () => {
//   //   // GIVEN
//   //   const givenMockedNumber = 9999999;
//   //   const selectedSateliteByMockedId =
//   //     overlord.satellitesManager.allSatellitesList[0];
//   //   const firstGroup = overlord.groupManager.getSatellitesGroups()[0];

//   //   // WHEN
//   //   overlord.groupManager.setGroupProperty(
//   //     overlord.satellitesManager.allSatellitesList,
//   //     "height",
//   //     firstGroup.id,
//   //     givenMockedNumber
//   //   );

//     // THEN
//     // expect(satellitesManager.allSatellitesList[0].location.height).toBe(
//     //   givenMockedNumber
//     // );
//   });

//   //   test("A new satellite is added to the group", () => {
//   //     testGroup.addToGroup(testSat.id);
//   //     console.log(testGroup.satellitesList);
//   //     expect(testGroup.satellitesList.length).toBe(1);
//   //     expect(testGroup.satellitesList[0]).toBe(testSat.id);
//   //   });

//   //   test("Satellite already exisiting in the group list can't be added", () => {
//   //     expect(() => testGroup.addToGroup(testSat.id)).toThrow(
//   //       "Satellite already exists in the group"
//   //     );
//   //   });

//   //   test("An existing satellite is removed from the group", () => {
//   //     testGroup.removeFromGroup(testSat);
//   //     console.log(testGroup.satellitesList);
//   //     expect(testGroup.satellitesList.length).toBe(0);
//   //   });
// });
