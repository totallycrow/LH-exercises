// Stwórz strukturę danych związaną z biblioteką, pełen opis znajduję się w kodzie poniżej
//  Wypracuj obiekt charakteryzujący pojedyńczy kontakt
//  Wypracuj obiekt charakteryzujący grupę kontakt
//  Wypracuj obiekt charakteryzujący książkę adresową

import Contact from "./classes/contact.js";
import ContactManager from "./classes/ContactManager.js";
import Group from "./classes/group.js";
import GroupManager from "./classes/GroupManager.js";
import Validator from "./Validator.js";

// *********************************************************
// *********************** ADDRESSBOOK *********************
// *********************************************************

class AddressBook {
  // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
  // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup
  constructor() {
    this.contactManager = new ContactManager();
    this.groupManager = new GroupManager();
  }

  findContactByPhrase = (phrase) => {
    Validator.validateString();

    if (phrase.length < 2) {
      return [];
    }
    return this.contactManager.findByPhrase(phrase);
  };

  // ******* HANDLE CONTACTS *******
  addContactToList = (contact) => {
    this.contactManager.addToList(contact);
  };

  createNewContact = (contactObject) => {
    this.contactManager.createNew(contactObject);
  };

  removeContactFromList = (contact) => {
    this.contactManager.removeFromList(contact);

    // Garbage collection? Remove from lists & groups to remove all references?
    this.groupManager.removeContactFromAllGroups(contact);
  };

  modifyContact = (contact, key, newValue) => {
    Validator.validateContact(contact);
    Validator.validateValueType(newValue);

    switch (key) {
      case "name":
        contact.setName(newValue);
        break;

      case "surname":
        contact.setSurname(newValue);
        break;

      case "email":
        contact.setEmail(newValue);
        break;

      case "modificationDate":
        contact.setModificationDate(newValue);
        break;

      default:
        throw new Error("Invalid Key");
    }
  };

  // ******* HANDLE GROUPS *******
  addGroupToList = (group) => {
    this.groupManager.addToList(group);
  };

  createNewGroup = (name) => {
    this.groupManager.createNew(name);
  };

  setGroupName = (group, newName) => {
    this.groupManager.setName(group, newName);
  };

  removeGroupFromList = (group) => {
    this.GroupManager.removeFromList(group);
  };
}

// *********************************************************
// *********************** TESTING *************************
// *********************************************************
const testBook = new AddressBook();
const testGroup = new Group("Test Group");

const contactObj = {
  name: "John",
  surname: "Doe",
  email: "john@gmaill.com",
  creationDate: "1/2/1990",
  modificationDate: "1/2/2022",
};
const contact = new Contact(contactObj, "1233");

console.log(testBook.contactManager.allContacts);

testBook.addContactToList(contact);

console.log(testBook.contactManager);

testBook.addGroupToList(testGroup);

console.log(testBook.groupManager);

testGroup.addContact(contact);
console.log("TEST GROUP *******", testGroup);

testBook.removeContactFromList(contact);
console.log("TEST GROUP ******* REMOVE ", testGroup);

// console.log("CONTACT OBJECT");
// console.log(contact);

// testGroup.addContact(contact);
// console.log(testGroup);
// console.log(testGroup.isInGroup(contact));

// testGroup.removeContact(contact);
// console.log(testGroup.isInGroup(contact));
// // console.log(testGroup);

// console.log(contact.toString().includes(""));

// testBook.addContactToList(contact);
// console.log(testBook);
// console.log(testBook.findContactByPhrase("john"));

// testBook.modifyContact(contact, "surname", "TEST");
// console.log(contact);

// console.log(testGroup);
// testBook.setGroupName(testGroup, "TEST-GROUP-NAME-OVERWRITE");
// console.log(testGroup);

// console.log(typeof contact);
// console.log(Validator.validateContact(contact));

// testBook.addGroupToList(testGroup);
// // testGroup.addContact(contact);

// console.log("ALL GROUPS ^^^^", testBook.groupManager.allGroups);

// // console.log("ALL GROUPS ^^^^", testBook.groupManager.allGroups);

// // testBook.setGroupName(testGroup, "TEST-GROUP-OVERWRITE-NAME-TEST2");
// // console.log("TEST GROUP *******", testGroup);
