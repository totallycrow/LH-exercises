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
    constructor(name) {
        // Parameter 'name' implicitly has an 'any' type.ts(7006
        // IF NO TYPE IE NAME: STRING
        this.setGroupName = (name) => {
            Validator_js_1.default.validateString(name);
            this.groupName = name;
        };
        this.addToGroup = (satelliteId) => {
            Validator_js_1.default.validateString(satelliteId);
            if (Validator_js_1.default.findByIdInArrayOfIds(this.satellitesList, satelliteId)) {
                throw "Satellite already exists in the group";
            }
            this.satellitesList.add(satelliteId);
        };
        this.removeFromGroup = (satelliteId) => {
            if (!Validator_js_1.default.findByIdInArrayOfIds(this.satellitesList, satelliteId)) {
                throw "Satellite not found in the group";
            }
            this.satellitesList.delete(satelliteId);
        };
        this.getGroupSatellitesList = () => {
            return this.satellitesList;
        };
        this.isSatelliteIdInGroup = (satelliteId) => {
            Validator_js_1.default.validateString(satelliteId);
            // Validator.validateSatellite(satellite);
            return this.satellitesList.has(satelliteId);
        };
        this.groupName = name;
        this.id = Utilities_js_1.default.idGenerator();
        this.satellitesList = new Set();
    }
}
exports.default = GroupOfSatellites;
