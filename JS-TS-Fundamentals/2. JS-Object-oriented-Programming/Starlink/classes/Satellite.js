import Validator from "../../Validator.js";
import Location from "./Location.js";
import Utilities from "../../Utilities.js";

export default class Satellite {
  // Ma miec: uuid, wysokość, współrzędne, status żagla słonecznego(on/off), status nadawania sygnału(on/off), status włączenia satelity
  constructor(locationObj) {
    Validator.validateInt(locationObj.height);
    Validator.validateCooridnatesObject(locationObj.coordinates);

    this.location = new Location(locationObj.height, locationObj.coordinates);

    this.id = Utilities.idGenerator();

    this.solarSailStatus = "off";
    this.signalEmitterStatus = "off";
    this.poweredStatus = "off";
  }

  setSolarSailStatus = (status) => {
    Validator.validateOnOff(status);
    this.solarSailStatus = status;
  };

  setSignalEmitterStatus = (status) => {
    Validator.validateOnOff(status);
    this.signalEmitterStatus = status;
  };

  setPoweredStatus = (status) => {
    Validator.validateOnOff(status);
    this.poweredStatus = status;
  };

  setHeight = (height) => {
    Validator.validateInt(height);
    this.location.setLocationHeight(height);
  };
  setCoordinates = (coordinates) => {
    Validator.validateCooridnatesObject(coordinates);
    this.location.coordinates = coordinates;
  };

  setCoordinateX = (coordinate) => {
    Validator.validateString(coordinate);
    this.location.coordinates.x = coordinate;
  };

  setCoordinateY = (coordinate) => {
    Validator.validateString(coordinate);
    this.location.coordinates.y = coordinate;
  };
}
