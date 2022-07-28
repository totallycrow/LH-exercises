import Validator from "../../Validator.js";
import Utilities from "../../Utilities.js";
import GroupOfSatellites from "./GroupOfSatellites.js";
import Satellite from "./Satellite.js";

export default class SatellitesManager {
  constructor() {
    this.allSatellitesGroups = [];
    this.allSatellitesList = [];
  }

  //   TypeError: Class constructor SatellitesManager cannot be invoked without 'new'
  static _instance;

  static getInstance() {
    if (this._instance === undefined) {
      this._instance = new SatellitesManager();
      return this._instance;
    }
    return this._instance;
  }

  // ********** GETTERS **********
  //   getSatellitesGroups = () => {
  //     return this.allSatellitesGroups;
  //   };

  getSatellitesList = () => {
    return this.allSatellitesList;
  };

  findSatellite = (satelliteId) => {
    return this.allSatellitesList.find((el) => el.id === satelliteId);
  };

  setHeight = (satelliteId, newHeight) => {
    this.findSatellite(satelliteId).setHeight(newHeight);
  };

  setCoordinates = (satelliteId, newCoordinates) => {
    this.findSatellite(satelliteId).coordinates = newCoordinates;
  };

  //   TODO TURN OFF

  turnOffAllSatellites = () => {
    this.getSatellitesList().forEach((sat) => sat.setPoweredStatus("off"));
  };

  turnOnAllSatellites = () => {
    this.getSatellitesList().forEach((sat) => sat.setPoweredStatus("on"));
  };

  //   getSatelliteIdsInGroup = (groupId) => {
  //     const group = this.allSatellitesGroups.find((el) => el.id === groupId);
  //     console.log("TEST", group);
  //     return group.getGroupSatellitesList();
  //   };

  // ********** MANAGE METHODS **********

  // ********** MANAGE SATELLITES **********

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

  removeSatelliteFromList = (satellite) => {
    Validator.validateSatellite(satellite);

    if (!Validator.findByIdInArrayOfIds(this.allSatellitesList, satellite.id)) {
      throw "Satellite not found in the list";
    }
    this.allSatellitesList = this.allSatellitesList.filter(
      (el) => el.id !== satellite.id
    );
  };

  //   Add satellite to group
  // remove

  //   addSatelliteToGroup = (satellite, groupId) => {
  //     Validator.validateSatellite(satellite);

  //     // find group by id
  //     const groupToAdd = this.allSatellitesGroups.find((el) => el.id === groupId);
  //     console.log("GROUP TO ADD", groupToAdd);
  //     groupToAdd.addToGroup(satellite);
  //   };

  //   REMOVE SATELLITE FROM GROUP

  // ********** MANAGE GROUPS **********

  //   GROUPS HANDLING

  createNewSatelliteGroup = (name) => {
    Validator.validateString(name);
    const newGroup = new GroupOfSatellites(name);
    this.allSatellitesGroups.push(newGroup);
  };

  setGroupHeight = (groupId, height) => {
    // find satellites in group id
    const satelliteIdsToFind = this.allSatellitesGroups.find(
      (el) => el.id === groupId
    );
    console.log(satelliteIdsToFind);
  };
  setGroupCoordinates = (coordinates) => {
    Validator.validateCooridnatesObject(coordinates);
    this.location.coordinates = coordinates;
  };

  setGroupCoordinateX = (coordinate) => {
    Validator.validateString(coordinate);
    this.location.coordinates.x = coordinate;
  };

  setGroupCoordinateY = (coordinate) => {
    Validator.validateString(coordinate);
    this.location.coordinates.y = coordinate;
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
