"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
// @ts-ignore
const Validator_js_1 = __importDefault(require("../../../../2. JS-Object-oriented-Programming/Validator.js"));
class Location {
    constructor(height, coordinates = { x: "", y: "" }) {
        this.setLocationHeight = (height) => {
            Validator_js_1.default.validateInt(height);
            this.height = height;
        };
        this.setCoordinates = (coordinates) => {
            Validator_js_1.default.validateCooridnatesObject(coordinates);
            this.coordinates = coordinates;
        };
        this.setCoordinateX = (coordinate) => {
            Validator_js_1.default.validateString(coordinate);
            this.coordinates = Object.assign(Object.assign({}, this.coordinates), { x: coordinate.x });
        };
        this.setCoordinateY = (coordinate) => {
            Validator_js_1.default.validateString(coordinate);
            this.coordinates = Object.assign(Object.assign({}, this.coordinates), { y: coordinate.y });
        };
        this.height = height;
        this.coordinates = coordinates;
    }
}
exports.Location = Location;
