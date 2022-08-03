// @ts-ignore
import Validator from "../../Validator.js";
// @ts-ignore
import Utilities from "../../Utilities.js";
import Satellite from "./Satellite.js";

export default class GroupOfSatellites {
  // Zawiera ewidencję satelit które znajdują się w grupie
  groupName: string;
  id: string;
  satellitesList: string[];
  constructor(name: string) {
    this.groupName = name;
    this.id = Utilities.idGenerator();
    this.satellitesList = [];
  }

  setGroupName = (name: string) => {
    Validator.validateString(name);
    this.groupName = name;
  };

  addToGroup = (satelliteId: string) => {
    Validator.validateString(satelliteId);

    if (Validator.findByIdInArrayOfIds(this.satellitesList, satelliteId)) {
      throw "Satellite already exists in the group";
    }
    this.satellitesList.push(satelliteId);
  };

  removeFromGroup = (satelliteId: string) => {
    if (!Validator.findByIdInArrayOfIds(this.satellitesList, satelliteId)) {
      throw "Satellite not found in the group";
    }
    this.satellitesList = this.satellitesList.filter(
      (el) => el !== satelliteId
    );
  };

  getGroupSatellitesList = () => {
    return this.satellitesList;
  };

  isSatelliteIdInGroup = (satelliteId: string) => {
    Validator.validateString(satelliteId);
    // Validator.validateSatellite(satellite);
    return this.satellitesList.some((el) => el === satelliteId);
  };
}
