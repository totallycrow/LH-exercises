// import Utilities from "../Utilities.js";
import { Contact } from "./contact.js";

// ?????
// @ts-ignore
import { Validator } from "../Validator.js";

export default class ContactManager {
  private allContacts: Contact[];
  constructor() {
    this.allContacts = [];
  }

  isInList = (contact: Contact) => {
    return Boolean(Validator.findByIdInArray(this.allContacts, contact.id));
  };

  findByPhrase = (phrase: string) => {
    Validator.validateString(phrase);

    const result = this.allContacts.filter((el) =>
      el.toString().toUpperCase().includes(phrase.toUpperCase())
    );
    return result;
  };

  addToList = (contact: Contact) => {
    if (this.isInList(contact)) {
      throw new Error("Contact already in the list!");
    }

    // // immutability principle
    // const copy = this.allContacts.slice(0);
    // this.allContacts = Utilities.addItemToArray(contact, copy);

    this.allContacts.push(contact);
  };

  createNew = (contact: Contact) => {
    // const newContact = new Contact(contactObject, Utilities.idGenerator());
    this.addToList(contact);
  };

  removeFromList = (contactId: string) => {
    if (!Validator.findByIdInArray(this.allContacts, contactId))
      throw new Error("Contact Not Found in the List");

    // const copy = this.allContacts.slice(0);
    // this.allContacts = Utilities.filterById(id, copy);
    this.allContacts = this.allContacts.filter((el) => el.id !== contactId);
  };
}
