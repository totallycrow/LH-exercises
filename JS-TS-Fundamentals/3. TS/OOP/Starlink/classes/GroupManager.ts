// @ts-ignore
import Group from "../../AddressBook-medium/classes/group.js";
// @ts-ignore
import Validator from "../../Validator.js";
import GroupOfSatellites from "./GroupOfSatellites.js";

type TGetInstance = () => GroupManager;

// INTERFACE WITH SINGLETON?
// cant' use public static
interface IGroupsManager {
  getInstance(): TGetInstance;
  getSatellitesGroups(): void;
  getSatelliteIdsInGroup(id: string): void;
  addSatelliteIdToGroup(satid: string, groupid: string): void;
  createNewSatelliteGroup(n: string): void;
  removeSatelliteGroup(gid: string): void;
}

// ??
// Class 'GroupManager' incorrectly implements interface 'IGroupsManager'.
// Property 'getInstance' is missing in type 'GroupManager' but required in type 'IGroupsManager'.ts(2420)

export default class GroupManager implements IGroupsManager {
  private static instance: GroupManager;
  private allSatellitesGroups: GroupOfSatellites[] = [];
  private constructor() {}

  public static getInstance(): GroupManager {
    if (!this.instance) {
      this.instance = new GroupManager();
    }
    return this.instance;
  }

  // ********** GETTERS **********
  getSatellitesGroups = () => {
    return this.allSatellitesGroups;
  };

  getSatelliteIdsInGroup = (groupId: string) => {
    const group = this.allSatellitesGroups.find((el) => el.id === groupId);
    console.log("TEST", group);
    if (group) {
      return group.getGroupSatellitesList();
    }
  };

  // ********** MANAGE GROUPS **********

  addSatelliteIdToGroup = (satelliteId: string, groupId: string) => {
    const groupToAdd = this.allSatellitesGroups.find((el) => el.id === groupId);

    if (typeof groupToAdd === "undefined") {
      throw new Error("Group not found");
    }
    groupToAdd.addToGroup(satelliteId);
  };

  createNewSatelliteGroup = (name: string) => {
    Validator.validateString(name);
    const newGroup = new GroupOfSatellites(name);
    this.allSatellitesGroups.push(newGroup);
    return newGroup;
  };

  removeSatelliteGroup = (groupId: string) => {
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
