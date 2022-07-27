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
}

// TEST

const testLoc = new Location(1200, { x: "150.2", y: "121.35" });

console.log(testLoc);
testLoc.setHeight(5);
console.log(testLoc);

testLoc.setCoordinates({ x: "650.2", y: "621.35" });
console.log(testLoc);
