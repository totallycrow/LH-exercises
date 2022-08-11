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
    // Ma miec: uuid, wysokość, współrzędne, status żagla słonecznego(on/off), status nadawania sygnału(on/off), status włączenia satelity
    location;
    // 'id' is declared but its value is never read.ts(6133)
    id;
    solarSailStatus;
    signalEmitterStatus;
    poweredStatus;
    constructor(locationObj) {
        this.location = new Location_js_1.Location(locationObj.height, locationObj.coordinates);
        this.id = Utilities_js_1.default.idGenerator();
        this.solarSailStatus = "off";
        this.signalEmitterStatus = "off";
        this.poweredStatus = "off";
    }
    setSolarSailStatus = (status) => {
        Validator_js_1.default.validateOnOff(status);
        this.solarSailStatus = status;
    };
    setSignalEmitterStatus = (status) => {
        Validator_js_1.default.validateOnOff(status);
        this.signalEmitterStatus = status;
    };
    setPoweredStatus = (status) => {
        Validator_js_1.default.validateOnOff(status);
        this.poweredStatus = status;
    };
    setHeight = (height) => {
        Validator_js_1.default.validateInt(height);
        this.location.setLocationHeight(height);
    };
    setCoordinates = (coordinates) => {
        Validator_js_1.default.validateCooridnatesObject(coordinates);
        this.location.coordinates = coordinates;
    };
    setCoordinateX = (coordinate) => {
        Validator_js_1.default.validateString(coordinate);
        this.location.coordinates.x = coordinate;
    };
    setCoordinateY = (coordinate) => {
        Validator_js_1.default.validateString(coordinate);
        this.location.coordinates.y = coordinate;
    };
}
exports.default = Satellite;
