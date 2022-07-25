// *********************************************************
// *********************** GROUP ****************************
// *********************************************************

import Validator from "../Validator.js";
import Utilities from "../Utilities.js";

export default class Group {
  // Ma mieć: listę kontaktów oraz nazwę grupy oraz uuid
  // Ma umożliwiać: zmianę nazwy grupy, można dodać lub usunac kontakt z grupy, można sprawdzić czy kontakt istnieje w grupie
  constructor(groupName) {
    Validator.validateString(groupName);
    this.id = Utilities.idGenerator();
    this.name = groupName;
    this.groupContactList = [];
  }

  isInGroup = (contact) => {
    Validator.validateContact(contact);
    console.log(contact.id);
    console.log(this.groupContactList);

    return Boolean(
      Validator.findByIdInArray(this.groupContactList, contact.id)
    );
  };

  setName = (groupName) => {
    Validator.validateString(groupName);
    this.name = groupName;
  };

  addContact = (contact) => {
    // validate
    Validator.validateContact(contact);

    if (this.isInGroup(contact))
      throw new Error("Contact already exists in the group");

    this.groupContactList.push(contact);
  };

  removeContact = (contact) => {
    Validator.validateContact(contact);

    if (!Validator.findByIdInArray(this.groupContactList, contact.id))
      throw new Error("User not found");

    this.groupContactList = this.groupContactList.filter(
      (el) => el.id !== contact.id
    );
  };
  cleanGroupList = () => (this.groupContactList = []);
}
