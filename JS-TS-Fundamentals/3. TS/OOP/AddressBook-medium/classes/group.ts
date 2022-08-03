// @ts-ignore
import { Validator } from "../Validator.js";
// @ts-ignore
import Utilities from "../Utilities.js";
import { Contact } from "./contact.js";

// *********************************************************
// *********************** GROUP ****************************
// *********************************************************

export default class Group {
  // Ma mieć: listę kontaktów oraz nazwę grupy oraz uuid
  // Ma umożliwiać: zmianę nazwy grupy, można dodać lub usunac kontakt z grupy, można sprawdzić czy kontakt istnieje w grupie
  private name: string;
  readonly id: string;
  private groupContactList: string[];
  constructor(groupName: string) {
    Validator.validateString(groupName);
    this.id = Utilities.idGenerator();
    this.name = groupName;
    this.groupContactList = [];
  }

  isInGroup = (contact: string) => {
    Validator.validateContact(contact);

    return Validator.findByIdInArray(this.groupContactList, contact);
  };

  setName = (groupName: string) => {
    Validator.validateString(groupName);
    this.name = groupName;
  };

  addContact = (contactId: string) => {
    Validator.validateContact(contactId);

    if (this.isInGroup(contactId))
      throw new Error("Contact already exists in the group");

    this.groupContactList.push(contactId);
  };

  removeContact = (contactId: string) => {
    if (!this.isInGroup) {
      throw new Error("User not found");
    }

    this.groupContactList = this.groupContactList.filter(
      (el) => el !== contactId
    );
  };
  cleanGroupList = () => (this.groupContactList = []);
}
