import Validator from "../../Validator.js";
import Utilities from "../../Utilities.js";

export default class GroupOfSatellites {
  // Zawiera ewidencję satelit które znajdują się w grupie
  constructor(name) {
    Validator.validateString(name);
    this.id = Utilities.idGenerator();
    this.satellitesList = [];
  }

  //   RENAME GROUP

  //   ADD SATELLITE TO GROUP
  //   REMOVE SATELLITE FROM GROUP
}
