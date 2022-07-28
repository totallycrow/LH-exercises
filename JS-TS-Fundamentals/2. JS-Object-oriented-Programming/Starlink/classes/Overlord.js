import Operator from "./Operator.js";

class Overlord extends Operator {
  constructor(name, surname) {
    super(name, surname);
  }

  satelliteShutDown = (satelliteId) => {};

  groupShutDown = (groupId) => {
    this.groupManager.setGroupProperty(
      this.satellitesManager.allSatellitesList,
      "poweredStatus",
      groupId,
      "off"
    );
    //   satList,
    //   "poweredStatus",
    //   testGroup.id,
    //   "on"
    // );
  };

  systemShutDown = () => {
    this.satellitesManager.turnOffAllSatellites();
  };
  systemPowerOn = () => {
    this.satellitesManager.turnOnAllSatellites();
  };
}

const overlord = new Overlord("Bob", "Blake");

console.log(overlord);

console.log(overlord.satellitesManager.allSatellitesList);

const overGroup = overlord.createNewGroup("OVERGROUP");

overlord.groupShutDown(overGroup.id);

console.log(overlord.groupManager.getSatellitesGroups());

overlord.systemPowerOn();
console.log(overlord.satellitesManager.allSatellitesList);
overlord.systemShutDown();

console.log(overlord.satellitesManager.allSatellitesList);
