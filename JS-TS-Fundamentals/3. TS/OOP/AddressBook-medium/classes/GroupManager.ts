// @ts-ignore
import Validator from "../Validator.js";
import Group from "./group.js";
import { Contact } from "./contact.js";

export default class GroupManager {
  allGroups: Group[];
  constructor() {
    this.allGroups = [];
  }

  addToList = (group: Group) => {
    if (Validator.findByIdInArray(this.allGroups, group.id))
      throw new Error("Group already in All Groups list");

    this.allGroups.push(group);
  };

  createNew = (name: string) => {
    const newGroup = new Group(name);
    this.addToList(newGroup);
  };

  setName = (group: Group, newName: string) => {
    group.setName(newName);
  };

  removeFromList = (group: Group) => {
    Validator.validateGroup(group);

    if (!Validator.findByIdInArray(this.allGroups, group.id))
      throw new Error("Group Not Found in the List");

    this.allGroups = this.allGroups.filter((el) => el.id !== group.id);
  };

  removeContactFromAllGroups = (contactId: string) => {
    this.allGroups.forEach((group) => group.removeContact(contactId));
  };
}
