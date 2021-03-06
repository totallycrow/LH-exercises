import Validator from "../Validator.js";
import Utilities from "../Utilities.js";

export default class ContactManager {
  constructor() {
    this.allContacts = [];
  }

  isInList = (contact) => {
    Validator.validateContact(contact);
    console.log(contact.id);
    console.log(this.groupContactList);

    return Boolean(Validator.findByIdInArray(this.allContacts, contact.id));
  };

  findByPhrase = (phrase) => {
    Validator.validateString(phrase);

    const result = this.allContacts.filter((el) =>
      el.toString().toUpperCase().includes(phrase.toUpperCase())
    );
    return result;
  };

  addToList = (contact) => {
    if (this.isInList(contact)) {
      throw new Error("Contact already in the list!");
    }

    // immutability principle
    const copy = this.allContacts.slice(0);
    this.allContacts = Utilities.addItemToArray(contact, copy);
  };

  createNew = (contactObject) => {
    const newContact = new Contact(contactObject, Utilities.idGenerator());
    this.addToList(newContact, this.allContacts);
  };

  removeFromList = (contact) => {
    Validator.validateContact(contact);

    if (!Validator.findByIdInArray(this.allContacts, contact.id))
      throw new Error("Contact Not Found in the List");

    // const copy = this.allContacts.slice(0);
    // this.allContacts = Utilities.filterById(id, copy);
    this.allContacts = this.allContacts.filter((el) => el.id !== contact.id);
  };
}
