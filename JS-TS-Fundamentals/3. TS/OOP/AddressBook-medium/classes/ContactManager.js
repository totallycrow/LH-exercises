"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ?????
// @ts-ignore
const Validator_js_1 = require("../Validator.js");
class ContactManager {
    allContacts;
    constructor() {
        this.allContacts = [];
    }
    isInList = (contact) => {
        return Boolean(Validator_js_1.Validator.findByIdInArray(this.allContacts, contact.id));
    };
    findByPhrase = (phrase) => {
        Validator_js_1.Validator.validateString(phrase);
        const result = this.allContacts.filter((el) => el.toString().toUpperCase().includes(phrase.toUpperCase()));
        return result;
    };
    addToList = (contact) => {
        if (this.isInList(contact)) {
            throw new Error("Contact already in the list!");
        }
        this.allContacts.push(contact);
    };
    createNew = (contact) => {
        // const newContact = new Contact(contactObject, Utilities.idGenerator());
        this.addToList(contact);
    };
    removeFromList = (contactId) => {
        if (!Validator_js_1.Validator.findByIdInArray(this.allContacts, contactId))
            throw new Error("Contact Not Found in the List");
        this.allContacts = this.allContacts.filter((el) => el.id !== contactId);
    };
}
exports.default = ContactManager;
