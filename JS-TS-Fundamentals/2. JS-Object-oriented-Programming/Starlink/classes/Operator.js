import Satellite from "./Satellite.js";
import SatellitesManager from "./SatellitesManager.js";
import GroupOfSatellites from "./GroupOfSatellites.js";
import GroupManager from "./GroupManager.js";
import Utilities from "../../Utilities.js";

export default class Operator {
  // Ma miec: imie, nazwisko, uuid
  // Ma umożliwiać:
  // - zmianę wysokości i wpółrzędnych pojedynczych satelit
  // - zmianę wysokości i wpółrzędnychcałej grupy
  // - otwieranie i składanie żagli słonecznych dla pojedynczego egzemplarza jak i całej grupy
  // - właczanie i wyłączanie sygnału nadawczego dla pojedynczych satelit oraz grup
  // - może tworzyć nowe grupy
  constructor(name, surname) {
    this.satellitesManager = SatellitesManager.getInstance();
    this.groupManager = GroupManager.getInstance();
    this.id = Utilities.idGenerator();
    this.name = name;
    this.surname = surname;
  }
  setIndividualSatelliteHeight = (satelliteId, newHeight) => {
    this.satellitesManager.setHeight(satelliteId, newHeight);
  };

  setIndividualSatelliteCoordinates = (satelliteId, newCoordinates) => {
    this.satellitesManager.setCoordinates(satelliteId, newCoordinates);
  };

  setIndividualSatelliteSailStatus = (satelliteId, newStatus) => {
    this.satellitesManager.setSailStatus(satelliteId, newStatus);
  };

  setIndividualSatelliteEmitterStatus = (satelliteId, newStatus) => {
    this.satellitesManager.setEmitterStatus(satelliteId, newStatus);
  };

  // setSailStatus = (status) => {
  //   this.findSatellite(satelliteId).setSolarSailStatus(status);
  // };

  // setEmitterStatus = (status) => {
  //   this.findSatellite(satelliteId).setSignalEmitterStatus(status);
  // };

  createNewGroup = (name) => {
    return this.groupManager.createNewSatelliteGroup(name);
  };

  removeGroup = (groupId) => {
    this.groupManager.removeSatelliteGroup(groupId);
  };

  setSatelliteGroupHeight = (allSatellitesList, groupId, newHeight) => {
    this.groupManager.setGroupProperty(
      allSatellitesList,
      "height",
      groupId,
      newHeight
    );
  };

  setSatelliteGroupCoordinates = (
    allSatellitesList,
    groupId,
    newCoordinates
  ) => {
    this.groupManager.setGroupProperty(
      allSatellitesList,
      "coordinates",
      groupId,
      newCoordinates
    );
  };

  setSatelliteGroupSailsStatus = (allSatellitesList, groupId, newStatus) => {
    this.groupManager.setGroupProperty(
      allSatellitesList,
      "solarSailStatus",
      groupId,
      newStatus
    );
  };

  setSatelliteGroupSignalEmitterStatus = (
    allSatellitesList,
    groupId,
    newStatus
  ) => {
    this.groupManager.setGroupProperty(
      allSatellitesList,
      "signalEmitterStatus",
      groupId,
      newStatus
    );
  };
}

//
//
//
const testSat = new Satellite({
  height: 120,
  coordinates: { x: "15.5", y: "100.55" },
});

const operator = new Operator("John", "Doe");

const testGroup = operator.groupManager.createNewSatelliteGroup("Test-Group1");

console.log(operator.groupManager.getSatellitesGroups());

console.log(operator);

operator.satellitesManager.addSattelliteToList(testSat);

operator.groupManager.addSatelliteIdToGroup(testSat.id, testGroup.id);

// console.log(operator.satellitesManager.allSatellitesList);

console.log(operator.setIndividualSatelliteHeight(testSat.id, 1520));
console.log(
  operator.setIndividualSatelliteCoordinates(testSat.id, {
    x: "5123.1",
    y: "3333.33",
  })
);

console.log(operator.satellitesManager.findSatellite(testSat.id));

operator.setSatelliteGroupHeight(
  operator.satellitesManager.getSatellitesList(),
  testGroup.id,
  999.99
);

operator.setSatelliteGroupCoordinates(
  operator.satellitesManager.getSatellitesList(),
  testGroup.id,
  { x: "995.55", y: "559.99" }
);

operator.setSatelliteGroupSailsStatus(
  operator.satellitesManager.getSatellitesList(),
  testGroup.id,
  "on"
);

operator.setSatelliteGroupSignalEmitterStatus(
  operator.satellitesManager.getSatellitesList(),
  testGroup.id,
  "on"
);

const group2 = operator.createNewGroup("testgroup2");
operator.removeGroup(group2.id);

operator.setIndividualSatelliteSailStatus(testSat.id, "off");
operator.setIndividualSatelliteEmitterStatus(testSat.id, "off");

console.log(operator.satellitesManager.findSatellite(testSat.id));
