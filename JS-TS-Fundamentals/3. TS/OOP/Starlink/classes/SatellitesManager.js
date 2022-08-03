"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const Validator_js_1 = __importDefault(require("../../Validator.js"));
const Satellite_js_1 = __importDefault(require("./Satellite.js"));
class SatellitesManager {
    constructor() { }
    static getInstance() {
        if (!SatellitesManager.instance) {
            SatellitesManager.instance = new SatellitesManager();
        }
        // this.instance??
        return SatellitesManager.instance;
    }
    // ********** MANAGEMENT **********
    // SETTERS
    // satelliteId: string,
    // property: number,
    // newProperty: number
    static modifyProperty(obj) {
        const property = obj.property;
        const modifier = this.modifiers[obj.property];
        // ???
        if (property === "height")
            this.modifiers[property](obj.value, obj.id);
        if (property === "emitterStatus")
            this.modifiers[property](obj.value, obj.id);
    }
}
exports.default = SatellitesManager;
_a = SatellitesManager;
SatellitesManager.allSatellitesList = [];
SatellitesManager.modifiers = {
    height: (newProperty, satelliteId) => _a.setHeight(satelliteId, newProperty),
    coordinates: (newProperty, satelliteId) => _a.setCoordinates(satelliteId, newProperty),
    sailStatus: (newProperty, satelliteId) => _a.setSailStatus(satelliteId, newProperty),
    emitterStatus: (newProperty, satelliteId) => _a.setEmitterStatus(satelliteId, newProperty),
};
// ********** GETTERS **********
SatellitesManager.getSatellitesList = () => {
    return _a.allSatellitesList;
};
SatellitesManager.findSatellite = (satelliteId) => {
    Validator_js_1.default.validateString(satelliteId);
    return _a.allSatellitesList.find((el) => el.id === satelliteId);
};
SatellitesManager.setHeight = (satelliteId, newHeight) => {
    const sat = _a.findSatellite(satelliteId);
    if (sat) {
        sat.setHeight(newHeight);
    }
};
SatellitesManager.setCoordinates = (satelliteId, newCoordinates) => {
    const sat = _a.findSatellite(satelliteId);
    if (sat) {
        sat.setCoordinates(newCoordinates);
    }
    // this.findSatellite(satelliteId).location.setCoordinates(newCoordinates);
};
SatellitesManager.setSailStatus = (satelliteId, status) => {
    const sat = _a.findSatellite(satelliteId);
    if (sat) {
        sat.setSolarSailStatus(status);
    }
};
SatellitesManager.setEmitterStatus = (satelliteId, status) => {
    const sat = _a.findSatellite(satelliteId);
    if (sat) {
        sat.setSignalEmitterStatus(status);
    }
    // this.findSatellite(satelliteId).setSignalEmitterStatus(status);
};
SatellitesManager.setOnOffStatus = (satelliteId, status) => {
    const sat = _a.findSatellite(satelliteId);
    if (sat) {
        sat.setPoweredStatus(status);
    }
    // this.findSatellite(satelliteId).setPoweredStatus(status);
};
SatellitesManager.turnOffAllSatellites = () => {
    _a.getSatellitesList().forEach((sat) => sat.setPoweredStatus("off"));
};
SatellitesManager.turnOnAllSatellites = () => {
    _a.getSatellitesList().forEach((sat) => sat.setPoweredStatus("on"));
};
// MANAGEMENT
// L
SatellitesManager.createNewSatellite = (locationObj) => {
    Validator_js_1.default.validateInt(locationObj.height);
    Validator_js_1.default.validateCooridnatesObject(locationObj.coordinates);
    const newSat = new Satellite_js_1.default(locationObj);
    _a.allSatellitesList.push(newSat);
};
SatellitesManager.addSattelliteToList = (satellite) => {
    Validator_js_1.default.validateSatellite(satellite);
    if (Validator_js_1.default.findByIdInArrayOfIds(_a.allSatellitesList, satellite.id)) {
        throw "Satellite already in the list";
    }
    _a.allSatellitesList = [..._a.allSatellitesList, satellite];
};
SatellitesManager.removeSatelliteFromAllGroups = (satId, allGroups) => {
    const clone = allGroups.slice(0);
    clone.forEach((el) => {
        if (el.isSatelliteIdInGroup(satId)) {
            el.removeFromGroup(satId);
        }
    });
};
SatellitesManager.removeSatelliteFromList = (satellite, allGroups) => {
    Validator_js_1.default.validateSatellite(satellite);
    if (!Validator_js_1.default.findByIdInArrayOfIds(_a.allSatellitesList, satellite.id)) {
        throw "Satellite not found in the list";
    }
    _a.allSatellitesList = _a.allSatellitesList.filter((el) => el.id !== satellite.id);
    _a.removeSatelliteFromAllGroups(satellite.id, allGroups);
};
SatellitesManager.addSatelliteToGroup = (satellite, groupId, groupList) => {
    Validator_js_1.default.validateSatellite(satellite);
    // find group by id
    const groupToAdd = groupList.find((el) => el.id === groupId);
    console.log("GROUP TO ADD", groupToAdd);
    if (groupToAdd)
        groupToAdd.addToGroup(satellite.id);
};
SatellitesManager.removeSatelliteFromGroup = (satelliteId, groupId, groupList) => {
    // find group by id
    const groupToRemoveFrom = groupList.find((el) => el.id === groupId);
    if (groupToRemoveFrom)
        groupToRemoveFrom.removeFromGroup(satelliteId);
};
// SatellitesManager.getInstance().getSatellitesGroups();
// // SatellitesManager.getInstance()
// SatellitesManager.getInstance().createNewSatelliteGroup("TEST");
// console.log(SatellitesManager.getInstance().getSatellitesGroups()[0].id);
// SatellitesManager.getInstance().createNewSatellite({
//   height: 120,
//   coordinates: { x: "15.5", y: "100.55" },
// });
// const groupId = SatellitesManager.getInstance().getSatellitesGroups()[0].id;
// const sat = SatellitesManager.getInstance().getSatellitesList()[0];
// console.log(groupId);
// console.log(SatellitesManager.getInstance().getSatelliteIdsInGroup(groupId));
// SatellitesManager.getInstance().addSatelliteToGroup(sat, groupId);
// console.log(SatellitesManager.getInstance().getSatelliteIdsInGroup(groupId));
