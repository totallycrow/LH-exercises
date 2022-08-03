// @ts-ignore
import Validator from "../../Validator.js";
import { ICoordinates, ILocation } from "./Location.js";
import Satellite from "./Satellite.js";
// @ts-ignore
import GroupOfSatellites from "./GroupOfSatellites.js";
import Group from "../../AddressBook-medium/classes/group.js";

type TSetObjectHeight = {
  satelliteId: string;
  property: "height";
  newProperty: number;
};

interface IModifier {
  height: (newProperty: number, satelliteId: string) => void;
  coordinates: (newProperty: ICoordinates, satelliteId: string) => void;
  sailStatus: (newProperty: string, satelliteId: string) => void;
  emitterStatus: (newProperty: string, satelliteId: string) => void;
}

type THeightSetter = {
  property: "height";
  value: number;
  id: string;
};

type TStatusSetter = {
  property: "emitterStatus";
  value: string;
  id: string;
};

export default class SatellitesManager {
  private static instance: SatellitesManager;

  static allSatellitesList: Satellite[] = [];

  private constructor() {}

  public static getInstance(): SatellitesManager {
    if (!SatellitesManager.instance) {
      SatellitesManager.instance = new SatellitesManager();
    }
    // this.instance??
    return SatellitesManager.instance;
  }

  static modifiers: IModifier = {
    height: (newProperty: number, satelliteId: string) =>
      this.setHeight(satelliteId, newProperty),
    coordinates: (newProperty: ICoordinates, satelliteId: string) =>
      this.setCoordinates(satelliteId, newProperty),
    sailStatus: (newProperty: string, satelliteId: string) =>
      this.setSailStatus(satelliteId, newProperty),
    emitterStatus: (newProperty: string, satelliteId: string) =>
      this.setEmitterStatus(satelliteId, newProperty),
  };

  // ********** GETTERS **********

  static getSatellitesList = () => {
    return this.allSatellitesList;
  };

  static findSatellite = (satelliteId: string) => {
    Validator.validateString(satelliteId);
    return this.allSatellitesList.find((el) => el.id === satelliteId);
  };

  // ********** MANAGEMENT **********
  // SETTERS

  // satelliteId: string,
  // property: number,
  // newProperty: number

  public static modifyProperty(obj: THeightSetter | TStatusSetter) {
    const property = obj.property;
    const modifier = this.modifiers[obj.property];

    // ???

    if (property === "height") this.modifiers[property](obj.value, obj.id);
    if (property === "emitterStatus")
      this.modifiers[property](obj.value, obj.id);
  }

  static setHeight = (satelliteId: string, newHeight: number) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setHeight(newHeight);
    }
  };

  static setCoordinates = (
    satelliteId: string,
    newCoordinates: ICoordinates
  ) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setCoordinates(newCoordinates);
    }
    // this.findSatellite(satelliteId).location.setCoordinates(newCoordinates);
  };

  static setSailStatus = (satelliteId: string, status: string) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setSolarSailStatus(status);
    }
  };

  static setEmitterStatus = (satelliteId: string, status: string) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setSignalEmitterStatus(status);
    }
    // this.findSatellite(satelliteId).setSignalEmitterStatus(status);
  };

  static setOnOffStatus = (satelliteId: string, status: string) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setPoweredStatus(status);
    }
    // this.findSatellite(satelliteId).setPoweredStatus(status);
  };

  static turnOffAllSatellites = () => {
    this.getSatellitesList().forEach((sat) => sat.setPoweredStatus("off"));
  };

  static turnOnAllSatellites = () => {
    this.getSatellitesList().forEach((sat) => sat.setPoweredStatus("on"));
  };

  // MANAGEMENT

  // L
  static createNewSatellite = (locationObj: ILocation) => {
    Validator.validateInt(locationObj.height);
    Validator.validateCooridnatesObject(locationObj.coordinates);
    const newSat = new Satellite(locationObj);
    this.allSatellitesList.push(newSat);
  };

  static addSattelliteToList = (satellite: Satellite) => {
    Validator.validateSatellite(satellite);

    if (Validator.findByIdInArrayOfIds(this.allSatellitesList, satellite.id)) {
      throw "Satellite already in the list";
    }
    this.allSatellitesList = [...this.allSatellitesList, satellite];
  };

  static removeSatelliteFromAllGroups = (
    satId: string,
    allGroups: GroupOfSatellites[]
  ) => {
    const clone = allGroups.slice(0);

    clone.forEach((el) => {
      if (el.isSatelliteIdInGroup(satId)) {
        el.removeFromGroup(satId);
      }
    });
  };

  static removeSatelliteFromList = (satellite: Satellite, allGroups: []) => {
    Validator.validateSatellite(satellite);

    if (!Validator.findByIdInArrayOfIds(this.allSatellitesList, satellite.id)) {
      throw "Satellite not found in the list";
    }
    this.allSatellitesList = this.allSatellitesList.filter(
      (el) => el.id !== satellite.id
    );
    this.removeSatelliteFromAllGroups(satellite.id, allGroups);
  };

  static addSatelliteToGroup = (
    satellite: Satellite,
    groupId: string,
    groupList: GroupOfSatellites[]
  ) => {
    Validator.validateSatellite(satellite);

    // find group by id
    const groupToAdd = groupList.find((el) => el.id === groupId);
    console.log("GROUP TO ADD", groupToAdd);

    if (groupToAdd) groupToAdd.addToGroup(satellite.id);
  };

  static removeSatelliteFromGroup = (
    satelliteId: string,
    groupId: string,
    groupList: GroupOfSatellites[]
  ) => {
    // find group by id
    const groupToRemoveFrom = groupList.find((el) => el.id === groupId);
    if (groupToRemoveFrom) groupToRemoveFrom.removeFromGroup(satelliteId);
  };
}

// SatellitesManager.getInstance().getSatellitesGroups();
// // SatellitesManager.getInstance()

// SatellitesManager.getInstance().createNewSatelliteGroup("TEST");

// console.log(SatellitesManager.getInstance().getSatellitesGroups()[0].id);

// SatellitesManager.getInstance().createNewSatellite({
//   height: 120,
//   coordinates: { x: "15.5", y: "100.55" },
// });

// const groupId = SatellitesManager.getInstance().getSatellitesGroups()[0].id;
// const sat = SatellitesManager.getInstance().getSatellitesList()[0];

// console.log(groupId);

// console.log(SatellitesManager.getInstance().getSatelliteIdsInGroup(groupId));

// SatellitesManager.getInstance().addSatelliteToGroup(sat, groupId);

// console.log(SatellitesManager.getInstance().getSatelliteIdsInGroup(groupId));
