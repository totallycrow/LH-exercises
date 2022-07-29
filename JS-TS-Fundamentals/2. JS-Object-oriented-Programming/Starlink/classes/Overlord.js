import Operator from "./Operator.js";

export default class Overlord extends Operator {
  constructor(name, surname) {
    super(name, surname);
  }

  setIndividualSatellitePowerStatus = (satelliteId, newStatus) => {
    this.satellitesManager.setOnOffStatus(satelliteId, newStatus);
  };

  groupShutDown = (groupId) => {
    this.groupManager.setGroupProperty(
      this.satellitesManager.allSatellitesList,
      "poweredStatus",
      groupId,
      "off"
    );
  };

  systemShutDown = () => {
    this.satellitesManager.turnOffAllSatellites();
  };
  systemPowerOn = () => {
    this.satellitesManager.turnOnAllSatellites();
  };
}

// *************************************************
// *************************************************
// *************************************************

const overlord = new Overlord("Bob", "Blake");
const satId = overlord.satellitesManager.allSatellitesList[0].id;

console.log(overlord);

console.log(overlord.satellitesManager.allSatellitesList);

const overGroup = overlord.createNewGroup("OVERGROUP");

overlord.groupShutDown(overGroup.id);

console.log(overlord.groupManager.getSatellitesGroups());

overlord.systemPowerOn();
console.log(overlord.satellitesManager.allSatellitesList);
// overlord.systemShutDown();

overlord.setIndividualSatellitePowerStatus(satId, "off");

console.log(overlord.satellitesManager.allSatellitesList[0]);
