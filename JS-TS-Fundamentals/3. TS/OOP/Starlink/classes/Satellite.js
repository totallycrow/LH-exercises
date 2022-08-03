"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const Validator_js_1 = __importDefault(require("../../Validator.js"));
const Location_js_1 = require("./Location.js");
// @ts-ignores
const Utilities_js_1 = __importDefault(require("../../Utilities.js"));
class Satellite {
    constructor(locationObj) {
        this.setSolarSailStatus = (status) => {
            Validator_js_1.default.validateOnOff(status);
            this.solarSailStatus = status;
        };
        this.setSignalEmitterStatus = (status) => {
            Validator_js_1.default.validateOnOff(status);
            this.signalEmitterStatus = status;
        };
        this.setPoweredStatus = (status) => {
            Validator_js_1.default.validateOnOff(status);
            this.poweredStatus = status;
        };
        this.setHeight = (height) => {
            Validator_js_1.default.validateInt(height);
            this.location.setLocationHeight(height);
        };
        this.setCoordinates = (coordinates) => {
            Validator_js_1.default.validateCooridnatesObject(coordinates);
            this.location.coordinates = coordinates;
        };
        this.setCoordinateX = (coordinate) => {
            Validator_js_1.default.validateString(coordinate);
            this.location.coordinates.x = coordinate;
        };
        this.setCoordinateY = (coordinate) => {
            Validator_js_1.default.validateString(coordinate);
            this.location.coordinates.y = coordinate;
        };
        this.location = new Location_js_1.Location(locationObj.height, locationObj.coordinates);
        this.id = Utilities_js_1.default.idGenerator();
        this.solarSailStatus = "off";
        this.signalEmitterStatus = "off";
        this.poweredStatus = "off";
    }
}
exports.default = Satellite;
