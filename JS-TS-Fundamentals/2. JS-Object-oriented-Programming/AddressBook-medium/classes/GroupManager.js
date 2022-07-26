import Validator from "../Validator.js";

export default class GroupManager {
  constructor() {
    this.allGroups = [];
  }

  addToList = (group) => {
    Validator.validateGroup(group);

    if (Validator.findByIdInArray(this.allGroups, group.id))
      throw new Error("Group already in All Groups list");

    this.allGroups.push(group);
  };

  createNew = (name) => {
    const newGroup = new Group(name);
    this.addToList(newGroup);
  };

  setName = (group, newName) => {
    Validator.validateGroup(group);
    Validator.validateString(newName);
    group.setName(newName);
  };

  removeFromList = (group) => {
    Validator.validateGroup(group);

    if (!Validator.findByIdInArray(this.allGroups, group.id))
      throw new Error("Group Not Found in the List");

    this.allGroups = this.allGroups.filter((el) => el.id !== group.id);
  };

  removeContactFromAllGroups = (contact) => {
    Validator.validateContact(contact);
    this.allGroups.forEach((group) => group.removeContact(contact));
  };
}
