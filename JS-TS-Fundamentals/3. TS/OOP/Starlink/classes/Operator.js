"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SatellitesManager_js_1 = __importDefault(require("./SatellitesManager.js"));
const GroupManager_js_1 = __importDefault(require("./GroupManager.js"));
// @ts-ignore
const Utilities_js_1 = __importDefault(require("../../Utilities.js"));
// @ts-ignore
const Validator_js_1 = __importDefault(require("../../Validator.js"));
class Operator {
    name;
    surname;
    satellitesManager;
    groupManager;
    id;
    constructor(name, surname) {
        this.satellitesManager = SatellitesManager_js_1.default.getInstance();
        this.groupManager = GroupManager_js_1.default.getInstance();
        this.id = Utilities_js_1.default.idGenerator();
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
    removeSatelliteFromAllGroups = (satId) => {
        const clone = this.groupManager.getSatellitesGroups().slice(0);
        clone.forEach((el) => {
            if (el.isSatelliteIdInGroup(satId)) {
                el.removeFromGroup(satId);
            }
        });
    };
    setIndividualSatelliteHeight = (satelliteId, newHeight) => {
        this.satellitesManager.setHeight(satelliteId, newHeight);
    };
    setIndividualSatelliteCoordinates = (satelliteId, newCoordinates) => {
        SatellitesManager_js_1.default.getInstance().setCoordinates(satelliteId, newCoordinates);
    };
    setIndividualSatelliteSailStatus = (satelliteId, newStatus) => {
        SatellitesManager_js_1.default.getInstance().setSailStatus(satelliteId, newStatus);
    };
    setIndividualSatelliteEmitterStatus = (satelliteId, newStatus) => {
        SatellitesManager_js_1.default.getInstance().setEmitterStatus(satelliteId, newStatus);
    };
    // *************************************************
    // ********** MANAGE GROUPS OF SATELLITES **********
    // *************************************************
    createNewGroup = (name) => {
        return this.groupManager.createNewSatelliteGroup(name);
    };
    removeGroup = (groupId) => {
        this.groupManager.removeSatelliteGroup(groupId);
    };
    // *** SWITCH
    setSatelliteGroupHeight = (groupId, newHeight) => {
        this.setGroupProperty("height", groupId, newHeight);
    };
    // *** MODIFIER
    setSatelliteGroupSignalEmitterStatus = (groupId, newStatus) => {
        const satelliteIds = this.groupManager.getSatelliteIdsInGroup(groupId);
        const satelliteListClone = this.satellitesManager
            .getSatellitesList()
            .slice(0);
        if (satelliteIds) {
            satelliteListClone.forEach((el) => {
                if (satelliteIds.has(el.id)) {
                    SatellitesManager_js_1.default.getInstance().modifyProperty({
                        property: "emitterStatus",
                        value: newStatus,
                        id: el.id,
                    });
                }
            });
        }
    };
    setSatelliteGroupCoordinates = (groupId, newCoordinates) => {
        this.setGroupProperty("coordinates", groupId, newCoordinates);
    };
    setSatelliteGroupSailsStatus = (groupId, newStatus) => {
        this.setGroupProperty("solarSailStatus", groupId, newStatus);
    };
    setGroupProperty = (key, groupId, newValue) => {
        Validator_js_1.default.validateString(key);
        Validator_js_1.default.validateString(groupId);
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
                    if (typeof newValue === "string" &&
                        satelliteIds &&
                        satelliteIds.has(el.id)) {
                        el.setSignalEmitterStatus(newValue);
                    }
                });
                break;
            case "poweredStatus":
                satelliteListClone.forEach((el) => {
                    if (satelliteIds &&
                        typeof newValue === "string" &&
                        satelliteIds.has(el.id)) {
                        el.setPoweredStatus(newValue);
                    }
                });
                break;
            case "coordinates":
                satelliteListClone.forEach((el) => {
                    if (satelliteIds &&
                        typeof newValue === "object" &&
                        satelliteIds.has(el.id)) {
                        el.setCoordinates(newValue);
                    }
                });
                break;
            default:
                throw new Error("Invalid Key");
        }
    };
}
exports.default = Operator;
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
