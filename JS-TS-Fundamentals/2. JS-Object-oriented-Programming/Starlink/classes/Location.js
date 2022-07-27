import Validator from "../../Validator.js";

export default class Location {
  constructor(height, coordinates = { x: "", y: "" }) {
    Validator.validateInt(height);
    Validator.validateCooridnatesObject(coordinates);

    this.height = height;
    this.coordinates = coordinates;
  }

  setHeight = (height) => {
    Validator.validateInt(height);
    this.height = height;
  };
  setCoordinates = (coordinates) => {
    Validator.validateCooridnatesObject(coordinates);
    this.coordinates = coordinates;
  };

  setCoordinateX = (coordinate) => {
    Validator.validateString(coordinate);
    this.coordinates.x = coordinate;
  };

  setCoordinateY = (coordinate) => {
    Validator.validateString(coordinate);
    this.coordinates.y = coordinate;
  };
}
