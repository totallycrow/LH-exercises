"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const Validator_js_1 = __importDefault(require("../../Validator.js"));
// @ts-ignore
const Utilities_js_1 = __importDefault(require("../../Utilities.js"));
class GroupOfSatellites {
    // Zawiera ewidencję satelit które znajdują się w grupie
    groupName;
    id;
    // SET INSTEAD OF ARRAY?
    satellitesList;
    constructor(name) {
        this.groupName = name;
        this.id = Utilities_js_1.default.idGenerator();
        this.satellitesList = new Set();
    }
    // Parameter 'name' implicitly has an 'any' type.ts(7006
    // IF NO TYPE IE NAME: STRING
    setGroupName = (name) => {
        Validator_js_1.default.validateString(name);
        this.groupName = name;
    };
    addToGroup = (satelliteId) => {
        Validator_js_1.default.validateString(satelliteId);
        if (Validator_js_1.default.findByIdInArrayOfIds(this.satellitesList, satelliteId)) {
            throw "Satellite already exists in the group";
        }
        this.satellitesList.add(satelliteId);
    };
    removeFromGroup = (satelliteId) => {
        if (!Validator_js_1.default.findByIdInArrayOfIds(this.satellitesList, satelliteId)) {
            throw "Satellite not found in the group";
        }
        this.satellitesList.delete(satelliteId);
    };
    getGroupSatellitesList = () => {
        return this.satellitesList;
    };
    isSatelliteIdInGroup = (satelliteId) => {
        Validator_js_1.default.validateString(satelliteId);
        // Validator.validateSatellite(satellite);
        return this.satellitesList.has(satelliteId);
    };
}
exports.default = GroupOfSatellites;
