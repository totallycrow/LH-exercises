import Validator from "../../Validator.js";
import Utilities from "../../Utilities.js";

export default class GroupOfSatellites {
  // Zawiera ewidencję satelit które znajdują się w grupie
  constructor(name) {
    Validator.validateString(name);
    this.groupName = name;
    this.id = Utilities.idGenerator();
    this.satellitesList = [];
  }

  setGroupName = (name) => {
    Validator.validateString(name);
    this.groupName = name;
  };

  addToGroup = (satelliteId) => {
    Validator.validateString(satelliteId);

    if (Validator.findByIdInArrayOfIds(this.satellitesList, satelliteId)) {
      throw "Satellite already exists in the group";
    }
    this.satellitesList.push(satelliteId);
  };

  removeFromGroup = (satellite) => {
    Validator.validateSatellite(satellite);

    if (!Validator.findByIdInArrayOfIds(this.satellitesList, satellite.id)) {
      throw "Satellite not found in the group";
    }
    this.satellitesList = this.satellitesList.filter(
      (el) => el !== satellite.id
    );
  };

  getGroupSatellitesList = () => {
    return this.satellitesList;
  };

  isSatelliteIdInGroup = (satelliteId) => {
    Validator.validateString(satelliteId);
    // Validator.validateSatellite(satellite);
    return this.satellitesList.some((el) => el === satelliteId);
  };
}
