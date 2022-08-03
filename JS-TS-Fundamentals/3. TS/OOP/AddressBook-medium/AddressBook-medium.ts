// Stwórz strukturę danych związaną z biblioteką, pełen opis znajduję się w kodzie poniżej
//  Wypracuj obiekt charakteryzujący pojedyńczy kontakt
//  Wypracuj obiekt charakteryzujący grupę kontakt
//  Wypracuj obiekt charakteryzujący książkę adresową

import { Contact, Person } from "./classes/contact.js";
import ContactManager from "./classes/ContactManager.js";
import Group from "./classes/group.js";
import GroupManager from "./classes/GroupManager.js";
// import Validator from "./Validator.js";

// *********************************************************
// *********************** ADDRESSBOOK *********************
// *********************************************************

class AddressBook {
  private contactManager: ContactManager;
  private groupManager: GroupManager;

  // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
  // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup
  constructor() {
    this.contactManager = new ContactManager();
    this.groupManager = new GroupManager();
  }

  findContactByPhrase = (phrase: string): Contact[] => {
    if (phrase.length < 2) {
      throw new Error("Provided phrase is too short");
    }
    return this.contactManager.findByPhrase(phrase);
  };

  // ******* HANDLE CONTACTS *******
  addContactToList = (contact: Contact): void => {
    this.contactManager.addToList(contact);
  };

  createNewContact = (contact: Contact): void => {
    this.contactManager.createNew(contact);
  };

  removeContactFromList = (contactId: string): void => {
    this.contactManager.removeFromList(contactId);
    this.groupManager.removeContactFromAllGroups(contactId);
  };

  addContactToGroup(contactId: string, groupId: string): void {
    this.contactManager.removeFromList(contactId);
  }

  removeContactFromGroup = (contactId: string): void => {
    this.contactManager.removeFromList(contactId);
    this.groupManager.removeContactFromAllGroups(contactId);
  };

  modifyContact = (contact: Contact, key: string, newValue: string): void => {
    switch (key) {
      case "name":
        if (typeof newValue === "string") contact.setName(newValue);
        break;

      case "surname":
        if (typeof newValue === "string") contact.setSurname(newValue);
        break;

      case "email":
        if (newValue === "string") contact.setEmail(newValue);
        break;

      default:
        throw new Error("Invalid Key");
    }
    contact.setModificationDate(new Date());
  };

  // ******* HANDLE GROUPS *******
  addGroupToList = (group: Group): void => {
    this.groupManager.addToList(group);
  };

  createNewGroup = (name: string): void => {
    this.groupManager.createNew(name);
  };

  setGroupName = (group: Group, newName: string): void => {
    this.groupManager.setName(group, newName);
  };

  removeGroupFromList = (group: Group): void => {
    this.groupManager.removeFromList(group);
  };
}
