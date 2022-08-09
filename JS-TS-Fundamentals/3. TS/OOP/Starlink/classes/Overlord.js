"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Operator_js_1 = __importDefault(require("./Operator.js"));
class Overlord extends Operator_js_1.default {
    constructor(name, surname) {
        super(name, surname);
        this.setIndividualSatellitePowerStatus = (satelliteId, newStatus) => {
            // Property 'setOnOffStatus' does not exist on type 'SatellitesManager'. Did you mean to access the static member 'SatellitesManager.setOnOffStatus' instead?ts(2576)
            this.satellitesManager.setOnOffStatus(satelliteId, newStatus);
        };
        this.groupShutDown = (groupId) => {
            this.setGroupProperty("poweredStatus", groupId, "off");
        };
        this.systemShutDown = () => {
            this.satellitesManager.turnOffAllSatellites();
        };
        this.systemPowerOn = () => {
            this.satellitesManager.turnOnAllSatellites();
        };
    }
}
exports.default = Overlord;
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
