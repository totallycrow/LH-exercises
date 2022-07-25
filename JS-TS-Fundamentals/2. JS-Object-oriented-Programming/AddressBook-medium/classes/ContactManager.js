import Validator from "../Validator.js";
import Utilities from "../Utilities.js";

export default class ContactManager {
  constructor() {
    this.allContacts = [];
  }

  findByPhrase = (phrase) => {
    Validator.validateString(phrase);
    const result = this.allContacts.filter((el) =>
      el.toString().toUpperCase().includes(phrase.toUpperCase())
    );
    return result;
  };

  addToList = (contact) => {
    Utilities.addItemToArray(contact, this.allContacts);
  };

  createNew = (contactObject) => {
    const newContact = new Contact(contactObject, Utilities.idGenerator());
    this.addToList(newContact, this.allContacts);
  };

  removeFromList = (contact) => {
    Validator.validateContact(contact);

    if (!Validator.findByIdInArray(this.allContacts, contact.id))
      throw new Error("Contact Not Found in the List");

    this.allContacts = this.allContacts.filter((el) => el.id !== contact.id);
  };

  removeFromGroups = (contact, groupsList) => {};
}
