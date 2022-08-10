import Satellite from "./Satellite.js";
import SatellitesManager from "./SatellitesManager.js";
import GroupManager from "./GroupManager.js";
// @ts-ignore
import Utilities from "../../Utilities.js";
// @ts-ignore
import Validator from "../../Validator.js";
import { ICoordinates } from "./Location.js";

interface IOperator {
  satellitesManager: SatellitesManager;
  groupManager: GroupManager;
  readonly id: string;
  getName(): string;
  getSurname(): string;
  removeSatelliteFromAllGroups(id: string): void;
  setIndividualSatelliteHeight(val: string, h: number): void;
  setIndividualSatelliteCoordinates(val: string, crd: ICoordinates): void;
  setIndividualSatelliteSailStatus(val: string, s: string): void;
  setIndividualSatelliteEmitterStatus(val: string, s: string): void;
  createNewGroup(val: string): void;
  removeGroup(val: string): void;
  setSatelliteGroupHeight(val: string, h: number): void;
  setSatelliteGroupSignalEmitterStatus(val: string, s: string): void;
  setSatelliteGroupCoordinates(val: string, crd: ICoordinates): void;
  setSatelliteGroupSailsStatus(val: string, s: string): void;
  setGroupProperty(
    key: string,
    groupId: string,
    newValue: number | string | ICoordinates
  ): void;
}

export default class Operator implements IOperator {
  private name: string;
  private surname: string;
  private satellitesManager: SatellitesManager;
  private groupManager: GroupManager;
  readonly id: string;

  constructor(name: string, surname: string) {
    this.satellitesManager = SatellitesManager.getInstance();
    this.groupManager = GroupManager.getInstance();
    this.id = Utilities.idGenerator();
    this.name = name;
    this.surname = surname;
  }

  // GETTERS
  getName = () => {
    return this.name;
  };
  getSurname = () => {
    return this.surname;
  };

  // **************************************************
  // ********** MANAGE INDIVIDUAL SATELLITES **********
  // **************************************************

  // ****** **** ****** ******* ****** ****** ******
  // EDITED : MOVE REMOVING SATELLITES UP TO THE OPERATOR

 removeSatelliteFromAllGroups = (satId: string) => {
    const clone = this.groupManager.getSatellitesGroups().slice(0);

    clone.forEach((el) => {
      if (el.isSatelliteIdInGroup(satId)) {
        el.removeFromGroup(satId);
      }
    });
  };

  setIndividualSatelliteHeight = (satelliteId: string, newHeight: number) => {
    this.satellitesManager.setHeight(satelliteId, newHeight);
  };

  setIndividualSatelliteCoordinates = (
    satelliteId: string,
    newCoordinates: ICoordinates
  ) => {
    SatellitesManager.getInstance().setCoordinates(satelliteId, newCoordinates);
  };

  setIndividualSatelliteSailStatus = (
    satelliteId: string,
    newStatus: string
  ) => {
    SatellitesManager.getInstance().setSailStatus(satelliteId, newStatus);
  };

  setIndividualSatelliteEmitterStatus = (
    satelliteId: string,
    newStatus: string
  ) => {
    SatellitesManager.getInstance().setEmitterStatus(satelliteId, newStatus);
  };

  // *************************************************
  // ********** MANAGE GROUPS OF SATELLITES **********
  // *************************************************

  createNewGroup = (name: string) => {
    return this.groupManager.createNewSatelliteGroup(name);
  };

  removeGroup = (groupId: string) => {
    this.groupManager.removeSatelliteGroup(groupId);
  };

  // *** SWITCH
  setSatelliteGroupHeight = (groupId: string, newHeight: number) => {
    this.setGroupProperty("height", groupId, newHeight);
  };

  // *** MODIFIER

  setSatelliteGroupSignalEmitterStatus = (
    groupId: string,
    newStatus: string
  ) => {
    const satelliteIds = this.groupManager.getSatelliteIdsInGroup(groupId);
    const satelliteListClone = this.satellitesManager
      .getSatellitesList()
      .slice(0);

    if (satelliteIds) {
      satelliteListClone.forEach((el) => {
        if (satelliteIds.has(el.id)) {
          SatellitesManager.getInstance().modifyProperty({
            property: "emitterStatus",
            value: newStatus,
            id: el.id,
          });
        }
      });
    }
  };

  setSatelliteGroupCoordinates = (
    groupId: string,
    newCoordinates: ICoordinates
  ) => {
    this.setGroupProperty("coordinates", groupId, newCoordinates);
  };

  setSatelliteGroupSailsStatus = (groupId: string, newStatus: string) => {
    this.setGroupProperty("solarSailStatus", groupId, newStatus);
  };

  setGroupProperty = (
    key: string,
    groupId: string,
    newValue: number | string | ICoordinates
  ) => {
    Validator.validateString(key);
    Validator.validateString(groupId);

    if (typeof newValue !== "string" && typeof newValue !== "number") {
      throw new Error("Invalid new value");
    }

    const satelliteIds = this.groupManager.getSatelliteIdsInGroup(groupId);
    const satelliteListClone = this.satellitesManager
      .getSatellitesList()
      .slice(0);

    switch (key) {
      case "height":
        if (typeof newValue !== "number") {
          throw new Error("Invalid new value");
        }
        satelliteListClone.forEach((el) => {
          if (satelliteIds && satelliteIds.has(el.id)) {
            el.setHeight(newValue);
          }
        });
        break;

      case "solarSailStatus":
        if (typeof newValue !== "string") {
          throw new Error("Invalid new value");
        }
        satelliteListClone.forEach((el) => {
          if (satelliteIds && satelliteIds.has(el.id)) {
            el.setSolarSailStatus(newValue);
          }
        });
        break;

      case "signalEmitterStatus":
        satelliteListClone.forEach((el) => {
          if (
            typeof newValue === "string" &&
            satelliteIds &&
            satelliteIds.has(el.id)
          ) {
            el.setSignalEmitterStatus(newValue);
          }
        });
        break;

      case "poweredStatus":
        satelliteListClone.forEach((el) => {
          if (
            satelliteIds &&
            typeof newValue === "string" &&
            satelliteIds.has(el.id)
          ) {
            el.setPoweredStatus(newValue);
          }
        });
        break;

      case "coordinates":
        satelliteListClone.forEach((el) => {
          if (
            satelliteIds &&
            typeof newValue === "object" &&
            satelliteIds.has(el.id)
          ) {
            el.setCoordinates(newValue);
          }
        });
        break;

      default:
        throw new Error("Invalid Key");
    }
  };
}

// *********************** TEST **************************
//// *************************************************
//// *************************************************
//// *************************************************
// const testSat = new Satellite({
//   height: 120,
//   coordinates: { x: "15.5", y: "100.55" },
// });

// const operator = new Operator("John", "Doe");

// const testGroup = operator.groupManager.createNewSatelliteGroup("Test-Group1");

// console.log(operator.groupManager.getSatellitesGroups());

// console.log(operator);

// operator.satellitesManager.addSattelliteToList(testSat);

// operator.groupManager.addSatelliteIdToGroup(testSat.id, testGroup.id);

// // console.log(operator.satellitesManager.allSatellitesList);

// console.log(operator.setIndividualSatelliteHeight(testSat.id, 1520));
// console.log(
//   operator.setIndividualSatelliteCoordinates(testSat.id, {
//     x: "5123.1",
//     y: "3333.33",
//   })
// );

// console.log(operator.satellitesManager.findSatellite(testSat.id));

// operator.setSatelliteGroupHeight(
//   operator.satellitesManager.getSatellitesList(),
//   testGroup.id,
//   999.99
// );

// operator.setSatelliteGroupCoordinates(
//   operator.satellitesManager.getSatellitesList(),
//   testGroup.id,
//   { x: "995.55", y: "559.99" }
// );

// operator.setSatelliteGroupSailsStatus(
//   operator.satellitesManager.getSatellitesList(),
//   testGroup.id,
//   "on"
// );

// operator.setSatelliteGroupSignalEmitterStatus(
//   operator.satellitesManager.getSatellitesList(),
//   testGroup.id,
//   "on"
// );

// const group2 = operator.createNewGroup("testgroup2");
// operator.removeGroup(group2.id);

// operator.setIndividualSatelliteSailStatus(testSat.id, "off");
// operator.setIndividualSatelliteEmitterStatus(testSat.id, "off");

// console.log(operator.satellitesManager.findSatellite(testSat.id));
