import Validator from "../../Validator.js";
import GroupOfSatellites from "./GroupOfSatellites.js";
import Satellite from "./Satellite.js";

export default class GroupManager {
  constructor() {
    this.allSatellitesGroups = [];
  }
  static _instance;

  //   TypeError: Class constructor GroupManager cannot be invoked without 'new'
  static getInstance() {
    if (this._instance === undefined) {
      this._instance = new GroupManager();
      return this._instance;
    }
    return this._instance;
  }

  // ********** GETTERS **********
  getSatellitesGroups = () => {
    return this.allSatellitesGroups;
  };

  getSatelliteIdsInGroup = (groupId) => {
    const group = this.allSatellitesGroups.find((el) => el.id === groupId);
    console.log("TEST", group);
    return group.getGroupSatellitesList();
  };

  addSatelliteIdToGroup = (satelliteId, groupId) => {
    Validator.validateString(satelliteId);

    // find group by id
    const groupToAdd = this.allSatellitesGroups.find((el) => el.id === groupId);
    console.log("GROUP TO ADD", groupToAdd);
    groupToAdd.addToGroup(satelliteId);
  };

  // ********** MANAGE GROUPS **********

  //   GROUPS HANDLING

  createNewSatelliteGroup = (name) => {
    Validator.validateString(name);
    const newGroup = new GroupOfSatellites(name);
    this.allSatellitesGroups.push(newGroup);
    return newGroup;
  };

  removeSatelliteGroup = (groupId) => {
    Validator.validateString(groupId);

    this.allSatellitesGroups = this.allSatellitesGroups.filter(
      (el) => el.id !== groupId
    );
  };

  //   todo
  static removeContactFromGroups = (first) => {};

  setGroupProperty = (allSatellitesList, key, groupId, newValue) => {
    // validate properties
    // todo
    const satelliteIds = this.getSatelliteIdsInGroup(groupId);
    const satelliteListClone = allSatellitesList.slice(0);

    switch (key) {
      case "height":
        satelliteListClone.forEach((el) => {
          if (satelliteIds.some((id) => el.id === id)) {
            el.setHeight(newValue);
          }
        });
        break;

      case "solarSailStatus":
        satelliteListClone.forEach((el) => {
          if (satelliteIds.some((id) => el.id === id)) {
            el.setSolarSailStatus(newValue);
          }
        });
        break;

      case "signalEmitterStatus":
        satelliteListClone.forEach((el) => {
          if (satelliteIds.some((id) => el.id === id)) {
            el.setSignalEmitterStatus(newValue);
          }
        });
        break;

      case "poweredStatus":
        satelliteListClone.forEach((el) => {
          if (satelliteIds.some((id) => el.id === id)) {
            el.setPoweredStatus(newValue);
          }
        });
        break;

      case "coordinates":
        satelliteListClone.forEach((el) => {
          if (satelliteIds.some((id) => el.id === id)) {
            el.setCoordinates(newValue);
          }
        });
        break;

      default:
        throw new Error("Invalid Key");
    }
  };

  //   setGroupHeight = (allSatellitesList, groupId, newHeight) => {
  //     // find satellites in group id
  //     const satelliteIds = this.getSatelliteIdsInGroup(groupId);
  //     const satelliteListClone = allSatellitesList.slice(0);

  //     satelliteListClone.forEach((el) => {
  //       if (satelliteIds.some((id) => el.id === id)) {
  //         el.setHeight(newHeight);
  //       }
  //     });
  //   };
}

// ******** TESTING **********

// const testSat1 = new Satellite({
//   height: 120,
//   coordinates: { x: "15.5", y: "100.55" },
// });
// testSat1.id = "1";

// const testSat2 = new Satellite({
//   height: 120,
//   coordinates: { x: "15.5", y: "100.55" },
// });

// console.log(testSat1);
// console.log(testSat2);

// let satList = [testSat1, testSat2];

// const testGroup =
//   GroupManager.getInstance().createNewSatelliteGroup("TESTING-GROUP");

// console.log(testGroup);

// console.log(GroupManager.getInstance().getSatelliteIdsInGroup(testGroup.id));

// GroupManager.getInstance().addSatelliteIdToGroup("1", testGroup.id);

// console.log(GroupManager.getInstance().getSatelliteIdsInGroup(testGroup.id));

// console.log(testSat1);

// GroupManager.getInstance().setGroupProperty(
//   satList,
//   "height",
//   testGroup.id,
//   200
// );
// GroupManager.getInstance().setGroupProperty(
//   satList,
//   "solarSailStatus",
//   testGroup.id,
//   "on"
// );
// GroupManager.getInstance().setGroupProperty(
//   satList,
//   "poweredStatus",
//   testGroup.id,
//   "on"
// );
// GroupManager.getInstance().setGroupProperty(
//   satList,
//   "signalEmitterStatus",
//   testGroup.id,
//   "on"
// );

// GroupManager.getInstance().setGroupProperty(
//   satList,
//   "coordinates",
//   testGroup.id,
//   { x: "665.66", y: "779.98" }
// );

// // GroupManager.getInstance().setGroupHeight(satList, testGroup.id, 200);
// // GroupManager.getInstance().setSailStatus(satList, testGroup.id, "on");
// // GroupManager.getInstance().setPoweredStatus(satList, testGroup.id, "on");
// // GroupManager.getInstance().setEmitterStatus(satList, testGroup.id, "on");

// console.log(testSat1);
// console.log(testSat2);

// console.log("TEST GROUP", GroupManager.getInstance().getSatellitesGroups());
// GroupManager.getInstance();
// console.log("TEST GROUP", GroupManager.getInstance().getSatellitesGroups());
