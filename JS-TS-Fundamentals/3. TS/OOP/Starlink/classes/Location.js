"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
// @ts-ignore
const Validator_js_1 = __importDefault(require("../../../../2. JS-Object-oriented-Programming/Validator.js"));
class Location {
    height;
    coordinates;
    constructor(height, coordinates = { x: "", y: "" }) {
        this.height = height;
        this.coordinates = coordinates;
    }
    setLocationHeight = (height) => {
        Validator_js_1.default.validateInt(height);
        this.height = height;
    };
    setCoordinates = (coordinates) => {
        Validator_js_1.default.validateCooridnatesObject(coordinates);
        this.coordinates = coordinates;
    };
    setCoordinateX = (coordinate) => {
        Validator_js_1.default.validateString(coordinate);
        this.coordinates = { ...this.coordinates, x: coordinate.x };
    };
    setCoordinateY = (coordinate) => {
        Validator_js_1.default.validateString(coordinate);
        this.coordinates = { ...this.coordinates, y: coordinate.y };
    };
}
exports.Location = Location;
