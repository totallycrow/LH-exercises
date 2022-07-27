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

  //   RENAME GROUP
  setGroupName = (name) => {
    Validator.validateString(name);
    this.groupName = name;
  };

  addSatelliteToGroup = (satellite) => {
    Validator.validateSatellite(satellite);

    if (Validator.findByIdInArray(this.satellitesList, satellite.id)) {
      throw "Satellite already exists in the group";
    }
    this.satellitesList.push(satellite.id);
  };

  removeSatelliteFromGroup = (satellite) => {
    Validator.validateSatellite(satellite);

    if (!Validator.findByIdInArrayOfIds(this.satellitesList, satellite.id)) {
      throw "Satellite not found in the group";
    }
    this.satellitesList = this.satellitesList.filter(
      (el) => el !== satellite.id
    );
  };

  //   ADD SATELLITE TO GROUP
  //   REMOVE SATELLITE FROM GROUP
}
