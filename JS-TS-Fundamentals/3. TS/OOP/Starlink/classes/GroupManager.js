"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const Validator_js_1 = __importDefault(require("../../Validator.js"));
const GroupOfSatellites_js_1 = __importDefault(require("./GroupOfSatellites.js"));
class GroupManager {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new GroupManager();
        }
        return this.instance;
    }
}
exports.default = GroupManager;
_a = GroupManager;
GroupManager.allSatellitesGroups = [];
// ********** GETTERS **********
GroupManager.getSatellitesGroups = () => {
    return _a.allSatellitesGroups;
};
GroupManager.getSatelliteIdsInGroup = (groupId) => {
    const group = _a.allSatellitesGroups.find((el) => el.id === groupId);
    console.log("TEST", group);
    if (group) {
        return group.getGroupSatellitesList();
    }
};
// ********** MANAGE GROUPS **********
GroupManager.addSatelliteIdToGroup = (satelliteId, groupId) => {
    const groupToAdd = _a.allSatellitesGroups.find((el) => el.id === groupId);
    if (typeof groupToAdd === "undefined") {
        throw new Error("Group not found");
    }
    groupToAdd.addToGroup(satelliteId);
};
GroupManager.createNewSatelliteGroup = (name) => {
    Validator_js_1.default.validateString(name);
    const newGroup = new GroupOfSatellites_js_1.default(name);
    _a.allSatellitesGroups.push(newGroup);
    return newGroup;
};
GroupManager.removeSatelliteGroup = (groupId) => {
    Validator_js_1.default.validateString(groupId);
    _a.allSatellitesGroups = _a.allSatellitesGroups.filter((el) => el.id !== groupId);
};
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
