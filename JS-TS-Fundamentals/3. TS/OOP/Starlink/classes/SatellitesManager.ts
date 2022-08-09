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

interface ISatellitesManager {
  // getInstance(): ISatellitesManager;
}

export default class SatellitesManager implements ISatellitesManager {
  private static instance: SatellitesManager;

  private allSatellitesList: Satellite[] = [];

  private constructor() {}

  public static getInstance(): SatellitesManager {
    if (!SatellitesManager.instance) {
      this.instance = new SatellitesManager();
    }
    return this.instance;
  }

  modifiers = {
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

  getSatellitesList = () => {
    return this.allSatellitesList;
  };

  findSatellite = (satelliteId: string) => {
    Validator.validateString(satelliteId);
    return this.allSatellitesList.find((el) => el.id === satelliteId);
  };

  // ********** MANAGEMENT **********
  // SETTERS

  // satelliteId: string,
  // property: number,
  // newProperty: number

  public modifyProperty({
    property,
    value,
    id,
  }: THeightSetter | TStatusSetter) {
    const modifier = this.modifiers[property];
    modifier(value as never, id);
  }

  setHeight = (satelliteId: string, newHeight: number) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setHeight(newHeight);
    }
  };

  setCoordinates = (satelliteId: string, newCoordinates: ICoordinates) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setCoordinates(newCoordinates);
    }
    // this.findSatellite(satelliteId).location.setCoordinates(newCoordinates);
  };

  setSailStatus = (satelliteId: string, status: string) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setSolarSailStatus(status);
    }
  };

  setEmitterStatus = (satelliteId: string, status: string) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setSignalEmitterStatus(status);
    }
    // this.findSatellite(satelliteId).setSignalEmitterStatus(status);
  };

  setOnOffStatus = (satelliteId: string, status: string) => {
    const sat = this.findSatellite(satelliteId);
    if (sat) {
      sat.setPoweredStatus(status);
    }
    // this.findSatellite(satelliteId).setPoweredStatus(status);
  };

  turnOffAllSatellites = () => {
    this.allSatellitesList.forEach((sat) => sat.setPoweredStatus("off"));
  };

  turnOnAllSatellites = () => {
    this.allSatellitesList.forEach((sat) => sat.setPoweredStatus("on"));
  };

  // MANAGEMENT

  // L
  createNewSatellite = (locationObj: ILocation) => {
    const newSat = new Satellite(locationObj);
    this.allSatellitesList.push(newSat);
  };

  addSattelliteToList = (satellite: Satellite) => {
    this.allSatellitesList.push(satellite);
  };

  // invalidate

  removeSatelliteFromList = (satelliteId: string) => {
    if (!Validator.findByIdInArrayOfIds(this.allSatellitesList, satelliteId)) {
      throw "Satellite not found in the list";
    }

    const map = new Map();

    map.delete(satelliteId);
    this.allSatellitesList = this.allSatellitesList.filter(
      (el) => el.id !== satelliteId
    );
  };

  //  addSatelliteToGroup = (
  //   satelliteId: Satellite,
  //   groupId: string,
  //   groupList: GroupOfSatellites[]
  // ) => {
  //   // find group by id
  //   const groupToAdd = groupList.find((el) => el.id === groupId);
  //   console.log("GROUP TO ADD", groupToAdd);

  //   if (groupToAdd) groupToAdd.addToGroup(satelliteId);
  // };

  //  removeSatelliteFromGroup = (
  //   satelliteId: string,
  //   groupId: string,
  //   groupList: GroupOfSatellites[]
  // ) => {
  //   // find group by id
  //   const groupToRemoveFrom = groupList.find((el) => el.id === groupId);
  //   if (groupToRemoveFrom) groupToRemoveFrom.removeFromGroup(satelliteId);
  // };
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
