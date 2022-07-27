import Validator from "../../Validator.js";
import Location from "./Location.js";

export default class Satellite {
  // Ma miec: uuid, wysokość, współrzędne, status żagla słonecznego(on/off), status nadawania sygnału(on/off), status włączenia satelity
  constructor(locationObj) {
    Validator.validateInt(locationObj.height);
    Validator.validateCooridnatesObject(locationObj.coordinates);

    this.location = new Location(locationObj.height, locationObj.coordinates);
  }
}
