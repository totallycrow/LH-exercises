import Satellite from "./Satellite.js";
import SatellitesManager from "./SatellitesManager.js";
import GroupManager from "./GroupManager.js";
// @ts-ignore
import Utilities from "../../Utilities.js";
// @ts-ignore
import Validator from "../../Validator.js";
import { ICoordinates } from "./Location.js";

export default class Operator {
  // Ma miec: imie, nazwisko, uuid
  // Ma umożliwiać:
  // - zmianę wysokości i wpółrzędnych pojedynczych satelit
  // - zmianę wysokości i wpółrzędnychcałej grupy
  // - otwieranie i składanie żagli słonecznych dla pojedynczego egzemplarza jak i całej grupy
  // - właczanie i wyłączanie sygnału nadawczego dla pojedynczych satelit oraz grup
  // - może tworzyć nowe grupy
  name: string;
  surname: string;
  satellitesManager: SatellitesManager;
  groupManager: GroupManager;
  id: string;

  constructor(name: string, surname: string) {
    this.satellitesManager = SatellitesManager.getInstance();
    this.groupManager = GroupManager.getInstance();
    this.id = Utilities.idGenerator();
    this.name = name;
    this.surname = surname;
  }

  // **************************************************
  // ********** MANAGE INDIVIDUAL SATELLITES **********
  // **************************************************

  // this.satellitesManager. doesnt work??
  // Property 'setHeight' does not exist on type 'SatellitesManager'. Did you mean to access the static member 'SatellitesManager.setHeight' instead?ts(2576)

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
    return GroupManager.createNewSatelliteGroup(name);
  };

  removeGroup = (groupId: string) => {
    GroupManager.removeSatelliteGroup(groupId);
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
    const satelliteIds = GroupManager.getSatelliteIdsInGroup(groupId);
    const satelliteListClone = SatellitesManager.getInstance().getSatellitesList().slice(0);

    if (satelliteIds) {
      satelliteListClone.forEach((el) => {
        if (satelliteIds.some((id) => el.id === id)) {
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

    const satelliteIds = GroupManager.getSatelliteIdsInGroup(groupId);
    const satelliteListClone = SatellitesManager.allSatellitesList.slice(0);

    switch (key) {
      case "height":
        if (typeof newValue !== "number") {
          throw new Error("Invalid new value");
        }
        satelliteListClone.forEach((el) => {
          if (satelliteIds && satelliteIds.some((id) => el.id === id)) {
            el.setHeight(newValue);
          }
        });
        break;

      case "solarSailStatus":
        if (typeof newValue !== "string") {
          throw new Error("Invalid new value");
        }
        satelliteListClone.forEach((el) => {
          if (satelliteIds && satelliteIds.some((id) => el.id === id)) {
            el.setSolarSailStatus(newValue);
          }
        });
        break;

      case "signalEmitterStatus":
        satelliteListClone.forEach((el) => {
          if (
            typeof newValue === "string" &&
            satelliteIds &&
            satelliteIds.some((id) => el.id === id)
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
            satelliteIds.some((id) => el.id === id)
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
            satelliteIds.some((id) => el.id === id)
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
