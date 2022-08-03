// @ts-ignore
import Validator from "../../Validator.js";
import { ICoordinates, ILocation, Location } from "./Location.js";
// @ts-ignores
import Utilities from "../../Utilities.js";

export default class Satellite {
  // Ma miec: uuid, wysokość, współrzędne, status żagla słonecznego(on/off), status nadawania sygnału(on/off), status włączenia satelity
  private location: Location;

  // 'id' is declared but its value is never read.ts(6133)
  readonly id: string;

  private solarSailStatus: string;
  private signalEmitterStatus: string;
  private poweredStatus: string;
  constructor(locationObj: ILocation) {
    this.location = new Location(locationObj.height, locationObj.coordinates);

    this.id = Utilities.idGenerator();

    this.solarSailStatus = "off";
    this.signalEmitterStatus = "off";
    this.poweredStatus = "off";
  }

  setSolarSailStatus = (status: string) => {
    Validator.validateOnOff(status);
    this.solarSailStatus = status;
  };

  setSignalEmitterStatus = (status: string) => {
    Validator.validateOnOff(status);
    this.signalEmitterStatus = status;
  };

  setPoweredStatus = (status: string) => {
    Validator.validateOnOff(status);
    this.poweredStatus = status;
  };

  setHeight = (height: number) => {
    Validator.validateInt(height);
    this.location.setLocationHeight(height);
  };
  setCoordinates = (coordinates: ICoordinates) => {
    Validator.validateCooridnatesObject(coordinates);
    this.location.coordinates = coordinates;
  };

  setCoordinateX = (coordinate: string) => {
    Validator.validateString(coordinate);
    this.location.coordinates.x = coordinate;
  };

  setCoordinateY = (coordinate: string) => {
    Validator.validateString(coordinate);
    this.location.coordinates.y = coordinate;
  };
}
