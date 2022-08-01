import Validator from "../../Validator.js";
import Satellite from "./Satellite.js";

export default class SatellitesManager {
  constructor() {
    this.allSatellitesList = [];
  }

  static _instance;

  static getInstance() {
    if (this._instance === undefined) {
      this._instance = new SatellitesManager();
      return this._instance;
    }
    return this._instance;
  }

  modifiers = {
    height: (newProperty, satelliteId) =>
      this.setHeight(satelliteId, newProperty),
    coordinates: (newProperty, satelliteId) =>
      this.setCoordinates(satelliteId, newProperty),
    sailStatus: (newProperty, satelliteId) =>
      this.setSailStatus(satelliteId, newProperty),
    emitterStatus: (newProperty, satelliteId) =>
      this.setEmitterStatus(satelliteId, newProperty),
  };

  // ********** GETTERS **********

  getSatellitesList = () => {
    return this.allSatellitesList;
  };

  findSatellite = (satelliteId) => {
    Validator.validateString(satelliteId);
    return this.allSatellitesList.find((el) => el.id === satelliteId);
  };

  // ********** MANAGEMENT **********
  // SETTERS

  modifyProperty(satelliteId, property, newProperty) {
    const modifier = this.modifiers[property];
    modifier(newProperty, satelliteId);
  }

  setPropetyForMany(arrayOfIds, property, newProperty) {
    const modifier = this.modifiers[property];
    arrayOfIds.forEach((el) => modifier(el, newProperty));
  }

  setHeight = (satelliteId, newHeight) => {
    this.findSatellite(satelliteId).setHeight(newHeight);
  };

  setCoordinates = (satelliteId, newCoordinates) => {
    this.findSatellite(satelliteId).location.setCoordinates(newCoordinates);
  };

  setSailStatus = (satelliteId, status) => {
    this.findSatellite(satelliteId).setSolarSailStatus(status);
  };

  setEmitterStatus = (satelliteId, status) => {
    this.findSatellite(satelliteId).setSignalEmitterStatus(status);
  };

  setOnOffStatus = (satelliteId, status) => {
    this.findSatellite(satelliteId).setPoweredStatus(status);
  };

  turnOffAllSatellites = () => {
    this.getSatellitesList().forEach((sat) => sat.setPoweredStatus("off"));
  };

  turnOnAllSatellites = () => {
    this.getSatellitesList().forEach((sat) => sat.setPoweredStatus("on"));
  };

  // MANAGEMENT

  // L
  createNewSatellite = (locationObj) => {
    Validator.validateInt(locationObj.height);
    Validator.validateCooridnatesObject(locationObj.coordinates);
    const newSat = new Satellite(locationObj);
    this.allSatellitesList.push(newSat);
  };

  addSattelliteToList = (satellite) => {
    Validator.validateSatellite(satellite);

    if (Validator.findByIdInArrayOfIds(this.allSatellitesList, satellite.id)) {
      throw "Satellite already in the list";
    }
    this.allSatellitesList = [...this.allSatellitesList, satellite];
  };

  removeSatelliteFromAllGroups = (satId, allGroups) => {
    const clone = allGroups.slice(0);

    clone.forEach((el) => {
      if (el.isSatelliteIdInGroup(satId)) {
        el.removeFromGroup(satId);
      }
    });
  };

  removeSatelliteFromList = (satellite, allGroups) => {
    Validator.validateSatellite(satellite);

    if (!Validator.findByIdInArrayOfIds(this.allSatellitesList, satellite.id)) {
      throw "Satellite not found in the list";
    }
    this.allSatellitesList = this.allSatellitesList.filter(
      (el) => el.id !== satellite.id
    );
    this.removeSatelliteFromAllGroups(satellite.id, allGroups);
  };

  addSatelliteToGroup = (satellite, groupId, groupList) => {
    Validator.validateSatellite(satellite);

    // find group by id
    const groupToAdd = groupList.find((el) => el.id === groupId);
    console.log("GROUP TO ADD", groupToAdd);
    groupToAdd.addToGroup(satellite.id);
  };

  removeSatelliteFromGroup = (satellite, groupId, groupList) => {
    Validator.validateSatellite(satellite);

    // find group by id
    const groupToRemoveFrom = groupList.find((el) => el.id === groupId);
    groupToRemoveFrom.removeFromGroup(satellite);
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
