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
    constructor(name, surname) {
        // **************************************************
        // ********** MANAGE INDIVIDUAL SATELLITES **********
        // **************************************************
        // this.satellitesManager. doesnt work??
        // Property 'setHeight' does not exist on type 'SatellitesManager'. Did you mean to access the static member 'SatellitesManager.setHeight' instead?ts(2576)
        this.setIndividualSatelliteHeight = (satelliteId, newHeight) => {
            SatellitesManager_js_1.default.setHeight(satelliteId, newHeight);
        };
        this.setIndividualSatelliteCoordinates = (satelliteId, newCoordinates) => {
            SatellitesManager_js_1.default.setCoordinates(satelliteId, newCoordinates);
        };
        this.setIndividualSatelliteSailStatus = (satelliteId, newStatus) => {
            SatellitesManager_js_1.default.setSailStatus(satelliteId, newStatus);
        };
        this.setIndividualSatelliteEmitterStatus = (satelliteId, newStatus) => {
            SatellitesManager_js_1.default.setEmitterStatus(satelliteId, newStatus);
        };
        // *************************************************
        // ********** MANAGE GROUPS OF SATELLITES **********
        // *************************************************
        this.createNewGroup = (name) => {
            return GroupManager_js_1.default.createNewSatelliteGroup(name);
        };
        this.removeGroup = (groupId) => {
            GroupManager_js_1.default.removeSatelliteGroup(groupId);
        };
        // *** SWITCH
        this.setSatelliteGroupHeight = (groupId, newHeight) => {
            this.setGroupProperty("height", groupId, newHeight);
        };
        // *** MODIFIER
        this.setSatelliteGroupSignalEmitterStatus = (groupId, newStatus) => {
            const satelliteIds = GroupManager_js_1.default.getSatelliteIdsInGroup(groupId);
            const satelliteListClone = SatellitesManager_js_1.default.allSatellitesList.slice(0);
            if (satelliteIds) {
                satelliteListClone.forEach((el) => {
                    if (satelliteIds.some((id) => el.id === id)) {
                        SatellitesManager_js_1.default.modifyProperty({
                            property: "emitterStatus",
                            value: newStatus,
                            id: el.id,
                        });
                    }
                });
            }
        };
        this.setSatelliteGroupCoordinates = (groupId, newCoordinates) => {
            this.setGroupProperty("coordinates", groupId, newCoordinates);
        };
        this.setSatelliteGroupSailsStatus = (groupId, newStatus) => {
            this.setGroupProperty("solarSailStatus", groupId, newStatus);
        };
        this.setGroupProperty = (key, groupId, newValue) => {
            Validator_js_1.default.validateString(key);
            Validator_js_1.default.validateString(groupId);
            if (typeof newValue !== "string" && typeof newValue !== "number") {
                throw new Error("Invalid new value");
            }
            const satelliteIds = GroupManager_js_1.default.getSatelliteIdsInGroup(groupId);
            const satelliteListClone = SatellitesManager_js_1.default.allSatellitesList.slice(0);
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
                        if (typeof newValue === "string" &&
                            satelliteIds &&
                            satelliteIds.some((id) => el.id === id)) {
                            el.setSignalEmitterStatus(newValue);
                        }
                    });
                    break;
                case "poweredStatus":
                    satelliteListClone.forEach((el) => {
                        if (satelliteIds &&
                            typeof newValue === "string" &&
                            satelliteIds.some((id) => el.id === id)) {
                            el.setPoweredStatus(newValue);
                        }
                    });
                    break;
                case "coordinates":
                    satelliteListClone.forEach((el) => {
                        if (satelliteIds &&
                            typeof newValue === "object" &&
                            satelliteIds.some((id) => el.id === id)) {
                            el.setCoordinates(newValue);
                        }
                    });
                    break;
                default:
                    throw new Error("Invalid Key");
            }
        };
        this.satellitesManager = SatellitesManager_js_1.default.getInstance();
        this.groupManager = GroupManager_js_1.default.getInstance();
        this.id = Utilities_js_1.default.idGenerator();
        this.name = name;
        this.surname = surname;
    }
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
