import Validator from "../../Validator.js";
import GroupOfSatellites from "./GroupOfSatellites.js";

export default class GroupManager {
  constructor() {
    this.allSatellitesGroups = [];
  }
  static _instance;

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

  // ********** MANAGE GROUPS **********

  addSatelliteIdToGroup = (satelliteId, groupId) => {
    Validator.validateString(satelliteId);
    Validator.validateString(satelliteId);

    const groupToAdd = this.allSatellitesGroups.find((el) => el.id === groupId);

    if (groupToAdd === "undefined") {
      throw new Error("Group not found");
    }

    console.log("GROUP TO ADD", groupToAdd);
    groupToAdd.addToGroup(satelliteId);
  };

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
