"use strict";
// Stwórz strukturę danych związaną z biblioteką, pełen opis znajduję się w kodzie poniżej
//  Wypracuj obiekt charakteryzujący pojedyńczy kontakt
//  Wypracuj obiekt charakteryzujący grupę kontakt
//  Wypracuj obiekt charakteryzujący książkę adresową
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContactManager_js_1 = __importDefault(require("./classes/ContactManager.js"));
const GroupManager_js_1 = __importDefault(require("./classes/GroupManager.js"));
// import Validator from "./Validator.js";
// *********************************************************
// *********************** ADDRESSBOOK *********************
// *********************************************************
class AddressBook {
    // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
    // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup
    constructor() {
        this.findContactByPhrase = (phrase) => {
            if (phrase.length < 2) {
                return [];
            }
            return this.contactManager.findByPhrase(phrase);
        };
        // ******* HANDLE CONTACTS *******
        this.addContactToList = (contact) => {
            this.contactManager.addToList(contact);
        };
        this.createNewContact = (contact) => {
            this.contactManager.createNew(contact);
        };
        this.removeContactFromList = (contactId) => {
            this.contactManager.removeFromList(contactId);
            // Garbage collection? Remove from lists & groups to remove all references?
            this.groupManager.removeContactFromAllGroups(contactId);
        };
        this.removeContactFromGroup = (contactId) => {
            this.contactManager.removeFromList(contactId);
            // Garbage collection? Remove from lists & groups to remove all references?
            this.groupManager.removeContactFromAllGroups(contactId);
        };
        this.modifyContact = (contact, key, newValue) => {
            switch (key) {
                case "name":
                    if (typeof newValue === "string")
                        contact.setName(newValue);
                    break;
                case "surname":
                    if (typeof newValue === "string")
                        contact.setSurname(newValue);
                    break;
                case "email":
                    if (newValue === "string")
                        contact.setEmail(newValue);
                    break;
                case "modificationDate":
                    if (newValue instanceof Date)
                        contact.setModificationDate(newValue);
                    break;
                default:
                    throw new Error("Invalid Key");
            }
        };
        // ******* HANDLE GROUPS *******
        this.addGroupToList = (group) => {
            this.groupManager.addToList(group);
        };
        this.createNewGroup = (name) => {
            this.groupManager.createNew(name);
        };
        this.setGroupName = (group, newName) => {
            this.groupManager.setName(group, newName);
        };
        this.removeGroupFromList = (group) => {
            this.groupManager.removeFromList(group);
        };
        this.contactManager = new ContactManager_js_1.default();
        this.groupManager = new GroupManager_js_1.default();
    }
    addContactToGroup(contactId, groupId) {
        this.contactManager.removeFromList(contactId);
    }
}
// *********************************************************
// *********************** TESTING *************************
// *********************************************************
// const testBook = new AddressBook();
// const testGroup = new Group("Test Group");
// const contactObj = {
//   name: "John",
//   surname: "Doe",
//   email: "john@gmaill.com",
//   creationDate: "1/2/1990",
//   modificationDate: "1/2/2022",
// };
// const contact = new Contact(contactObj, "1233");
// console.log(testBook.contactManager.allContacts);
// testBook.addContactToList(contact);
// console.log(testBook.contactManager);
// testBook.addGroupToList(testGroup);
// console.log(testBook.groupManager);
// testGroup.addContact(contact);
// console.log("TEST GROUP *******", testGroup);
// testBook.removeContactFromList(contact);
// console.log("TEST GROUP ******* REMOVE ", testGroup);
// 1. testing AddressBook
// - zostało dodanych kolku ludzi
// - potem zostali przypisani do jakiejś grupy
// - potem ktoś dołączył do drugiej grupy
// - ktoś przeszedł z jednej grupy do drugiej
// - ktoś został usunięty
// happy path / falsy
// BDD
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
