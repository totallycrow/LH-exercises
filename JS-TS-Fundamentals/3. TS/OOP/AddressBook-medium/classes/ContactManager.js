"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ?????
// @ts-ignore
const Validator_js_1 = require("../Validator.js");
class ContactManager {
    constructor() {
        this.isInList = (contact) => {
            return Boolean(Validator_js_1.Validator.findByIdInArray(this.allContacts, contact.id));
        };
        this.findByPhrase = (phrase) => {
            Validator_js_1.Validator.validateString(phrase);
            const result = this.allContacts.filter((el) => el.toString().toUpperCase().includes(phrase.toUpperCase()));
            return result;
        };
        this.addToList = (contact) => {
            if (this.isInList(contact)) {
                throw new Error("Contact already in the list!");
            }
            // // immutability principle
            // const copy = this.allContacts.slice(0);
            // this.allContacts = Utilities.addItemToArray(contact, copy);
            this.allContacts.push(contact);
        };
        this.createNew = (contact) => {
            // const newContact = new Contact(contactObject, Utilities.idGenerator());
            this.addToList(contact);
        };
        this.removeFromList = (contactId) => {
            if (!Validator_js_1.Validator.findByIdInArray(this.allContacts, contactId))
                throw new Error("Contact Not Found in the List");
            // const copy = this.allContacts.slice(0);
            // this.allContacts = Utilities.filterById(id, copy);
            this.allContacts = this.allContacts.filter((el) => el.id !== contactId);
        };
        this.allContacts = [];
    }
}
exports.default = ContactManager;
