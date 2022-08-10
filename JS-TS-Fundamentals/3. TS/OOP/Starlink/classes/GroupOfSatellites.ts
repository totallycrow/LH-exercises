// @ts-ignore
import Validator from "../../Validator.js";
// @ts-ignore
import Utilities from "../../Utilities.js";
import Satellite from "./Satellite.js";

type TSetters = (val: string) => void;

interface IGroups {
  readonly id: string;
  setGroupName: TSetters;
  addToGroup: TSetters;
  removeFromGroup: TSetters;
  getGroupSatellitesList(): Set<string>;
  isSatelliteIdInGroup: TSetters;
}

export default class GroupOfSatellites implements IGroups {
  // Zawiera ewidencję satelit które znajdują się w grupie
  private groupName: string;
  readonly id;
  
  // SET INSTEAD OF ARRAY?
  private satellitesList: Set<string>;
  constructor(name: string) {
    this.groupName = name;
    this.id = Utilities.idGenerator();
    this.satellitesList = new Set();
  }

  // Parameter 'name' implicitly has an 'any' type.ts(7006
  // IF NO TYPE IE NAME: STRING
  setGroupName: TSetters = (name) => {
    Validator.validateString(name);
    this.groupName = name;
  };

  addToGroup = (satelliteId: string) => {
    Validator.validateString(satelliteId);

    if (Validator.findByIdInArrayOfIds(this.satellitesList, satelliteId)) {
      throw "Satellite already exists in the group";
    }
    this.satellitesList.add(satelliteId);
  };

  removeFromGroup = (satelliteId: string) => {
    if (!Validator.findByIdInArrayOfIds(this.satellitesList, satelliteId)) {
      throw "Satellite not found in the group";
    }
    this.satellitesList.delete(satelliteId);
  };

  getGroupSatellitesList = () => {
    return this.satellitesList;
  };

  isSatelliteIdInGroup = (satelliteId: string) => {
    Validator.validateString(satelliteId);
    // Validator.validateSatellite(satellite);
    return this.satellitesList.has(satelliteId);
  };
}
