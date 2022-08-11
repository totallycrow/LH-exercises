"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const Validator_js_1 = __importDefault(require("../../Validator.js"));
const Satellite_js_1 = __importDefault(require("./Satellite.js"));
class SatellitesManager {
    static instance;
    allSatellitesList = [];
    constructor() { }
    static getInstance() {
        if (!SatellitesManager.instance) {
            this.instance = new SatellitesManager();
        }
        return this.instance;
    }
    modifiers = {
        height: (newProperty, satelliteId) => this.setHeight(satelliteId, newProperty),
        coordinates: (newProperty, satelliteId) => this.setCoordinates(satelliteId, newProperty),
        sailStatus: (newProperty, satelliteId) => this.setSailStatus(satelliteId, newProperty),
        emitterStatus: (newProperty, satelliteId) => this.setEmitterStatus(satelliteId, newProperty),
    };
    // ********** GETTERS **********
    getSatellitesList = () => {
        return this.allSatellitesList;
    };
    findSatellite = (satelliteId) => {
        Validator_js_1.default.validateString(satelliteId);
        return this.allSatellitesList.find((el) => el.id === satelliteId);
    };
    // ********** MANAGEMENT **********
    // SETTERS
    // satelliteId: string,
    // property: number,
    // newProperty: number
    modifyProperty({ property, value, id, }) {
        const modifier = this.modifiers[property];
        modifier(value, id);
    }
    setHeight = (satelliteId, newHeight) => {
        const sat = this.findSatellite(satelliteId);
        if (sat) {
            sat.setHeight(newHeight);
        }
    };
    setCoordinates = (satelliteId, newCoordinates) => {
        const sat = this.findSatellite(satelliteId);
        if (sat) {
            sat.setCoordinates(newCoordinates);
        }
        // this.findSatellite(satelliteId).location.setCoordinates(newCoordinates);
    };
    setSailStatus = (satelliteId, status) => {
        const sat = this.findSatellite(satelliteId);
        if (sat) {
            sat.setSolarSailStatus(status);
        }
    };
    setEmitterStatus = (satelliteId, status) => {
        const sat = this.findSatellite(satelliteId);
        if (sat) {
            sat.setSignalEmitterStatus(status);
        }
        // this.findSatellite(satelliteId).setSignalEmitterStatus(status);
    };
    setOnOffStatus = (satelliteId, status) => {
        const sat = this.findSatellite(satelliteId);
        if (sat) {
            sat.setPoweredStatus(status);
        }
        // this.findSatellite(satelliteId).setPoweredStatus(status);
    };
    turnOffAllSatellites = () => {
        this.allSatellitesList.forEach((sat) => sat.setPoweredStatus("off"));
    };
    turnOnAllSatellites = () => {
        this.allSatellitesList.forEach((sat) => sat.setPoweredStatus("on"));
    };
    // MANAGEMENT
    // L
    createNewSatellite = (locationObj) => {
        const newSat = new Satellite_js_1.default(locationObj);
        this.allSatellitesList.push(newSat);
    };
    addSattelliteToList = (satellite) => {
        this.allSatellitesList.push(satellite);
    };
    // invalidate
    removeSatelliteFromList = (satelliteId) => {
        if (!Validator_js_1.default.findByIdInArrayOfIds(this.allSatellitesList, satelliteId)) {
            throw "Satellite not found in the list";
        }
        const map = new Map();
        map.delete(satelliteId);
        this.allSatellitesList = this.allSatellitesList.filter((el) => el.id !== satelliteId);
    };
}
exports.default = SatellitesManager;
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
