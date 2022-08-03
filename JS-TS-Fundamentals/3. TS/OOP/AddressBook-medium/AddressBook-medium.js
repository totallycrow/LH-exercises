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
                throw new Error("Provided phrase is too short");
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
            this.groupManager.removeContactFromAllGroups(contactId);
        };
        this.removeContactFromGroup = (contactId) => {
            this.contactManager.removeFromList(contactId);
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
                default:
                    throw new Error("Invalid Key");
            }
            contact.setModificationDate(new Date());
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
