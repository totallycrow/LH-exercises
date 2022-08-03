// @ts-ignore
import Validator from "../../../../2. JS-Object-oriented-Programming/Validator.js";

export interface ICoordinates {
  x: string;
  y: string;
}

export interface ILocation {
  height: number;
  coordinates: ICoordinates;
}

export class Location implements ILocation {
  height: number;
  coordinates: ICoordinates;

  constructor(height: number, coordinates = { x: "", y: "" }) {
    this.height = height;
    this.coordinates = coordinates;
  }

  setLocationHeight = (height: number) => {
    Validator.validateInt(height);
    this.height = height;
  };
  setCoordinates = (coordinates: ICoordinates) => {
    Validator.validateCooridnatesObject(coordinates);
    this.coordinates = coordinates;
  };

  setCoordinateX = (coordinate: ICoordinates) => {
    Validator.validateString(coordinate);
    this.coordinates = { ...this.coordinates, x: coordinate.x };
  };

  setCoordinateY = (coordinate: ICoordinates) => {
    Validator.validateString(coordinate);
    this.coordinates = { ...this.coordinates, y: coordinate.y };
  };
}
