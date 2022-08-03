import Operator from "./Operator.js";
import SatellitesManager from "./SatellitesManager.js";

export default class Overlord extends Operator {
  constructor(name: string, surname: string) {
    super(name, surname);
  }

  setIndividualSatellitePowerStatus = (
    satelliteId: string,
    newStatus: string
  ) => {
    // Property 'setOnOffStatus' does not exist on type 'SatellitesManager'. Did you mean to access the static member 'SatellitesManager.setOnOffStatus' instead?ts(2576)

    SatellitesManager.setOnOffStatus(satelliteId, newStatus);
  };

  groupShutDown = (groupId: string) => {
    this.setGroupProperty("poweredStatus", groupId, "off");
  };

  systemShutDown = () => {
    SatellitesManager.turnOffAllSatellites();
  };
  systemPowerOn = () => {
    SatellitesManager.turnOnAllSatellites();
  };
}

// *************************************************
// *************************************************
// *************************************************

// const overlord = new Overlord("Bob", "Blake");
// const satId = overlord.satellitesManager.allSatellitesList[0].id;

// console.log(overlord);

// console.log(overlord.satellitesManager.allSatellitesList);

// const overGroup = overlord.createNewGroup("OVERGROUP");

// overlord.groupShutDown(overGroup.id);

// console.log(overlord.groupManager.getSatellitesGroups());

// overlord.systemPowerOn();
// console.log(overlord.satellitesManager.allSatellitesList);
// // overlord.systemShutDown();

// overlord.setIndividualSatellitePowerStatus(satId, "off");

// console.log(overlord.satellitesManager.allSatellitesList[0]);
