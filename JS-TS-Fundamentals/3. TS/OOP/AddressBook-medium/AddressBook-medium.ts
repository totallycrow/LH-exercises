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
  contactManager: ContactManager;
  groupManager: GroupManager;

  // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
  // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup
  constructor() {
    this.contactManager = new ContactManager();
    this.groupManager = new GroupManager();
  }

  findContactByPhrase = (phrase: string) => {
    if (phrase.length < 2) {
      return [];
    }
    return this.contactManager.findByPhrase(phrase);
  };

  // ******* HANDLE CONTACTS *******
  addContactToList = (contact: Contact) => {
    this.contactManager.addToList(contact);
  };

  createNewContact = (contact: Contact) => {
    this.contactManager.createNew(contact);
  };

  removeContactFromList = (contactId: string) => {
    this.contactManager.removeFromList(contactId);
    this.groupManager.removeContactFromAllGroups(contactId);
  };

  addContactToGroup(contactId: string, groupId: string) {
    this.contactManager.removeFromList(contactId);
  }

  removeContactFromGroup = (contactId: string) => {
    this.contactManager.removeFromList(contactId);
    // Garbage collection? Remove from lists & groups to remove all references?
    this.groupManager.removeContactFromAllGroups(contactId);
  };

  modifyContact = (contact: Contact, key: string, newValue: string | Date) => {
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

      case "modificationDate":
        if (newValue instanceof Date) contact.setModificationDate(newValue);
        break;

      default:
        throw new Error("Invalid Key");
    }
  };

  // ******* HANDLE GROUPS *******
  addGroupToList = (group: Group) => {
    this.groupManager.addToList(group);
  };

  createNewGroup = (name: string) => {
    this.groupManager.createNew(name);
  };

  setGroupName = (group: Group, newName: string) => {
    this.groupManager.setName(group, newName);
  };

  removeGroupFromList = (group: Group) => {
    this.groupManager.removeFromList(group);
  };
}
