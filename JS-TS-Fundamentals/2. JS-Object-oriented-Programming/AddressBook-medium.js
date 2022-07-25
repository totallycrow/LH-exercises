// Stwórz strukturę danych związaną z biblioteką, pełen opis znajduję się w kodzie poniżej
//  Wypracuj obiekt charakteryzujący pojedyńczy kontakt
//  Wypracuj obiekt charakteryzujący grupę kontakt
//  Wypracuj obiekt charakteryzujący książkę adresową

// *********************************************************
// *********************** CONTACT *************************
// *********************************************************

class Contact {
  // Ma mieć: Imie, Nazwisko, adres-emial, datę modyfikacji i utworzenia, uuid
  // Ma umożliwiać: aktualizację datę modyfikacji, pozwalac na modyfikację imienia, nazwiska oraz adresu email

  constructor({ name, surname, email }, id) {
    Validator.validateNewUser(name, surname, email);

    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.creationDate = new Date();
    this.modificationDate = new Date();
  }

  //   setCreationDate = (newDate) => {
  //     validateDate(newDate);
  //     this.creationDate = newDate;
  //   };
  setModificationDate = (newDate) => {
    validateDate(newDate);
    this.modificationDate = newDate;
  };
  setName = (name) => {
    Validator.validateString(name);
    this.name = name;
  };
  setSurname = (surname) => {
    Validator.validateString(surname);
    this.surname = surname;
  };
  setEmail = (email) => {
    Validator.validateEmail(email);
    this.email = email;
  };

  toString = () => {
    const result = Object.values(this)
      .filter(
        (el) =>
          typeof el === "string" ||
          Object.prototype.toString.call(el) === "[object Date]"
      )
      .join(" ");
    return result;
  };

  //   setValue = (key, value) => {
  //     this.key = value;
  //   };
}

// *********************************************************
// *********************** GROUP ****************************
// *********************************************************

class Group {
  // Ma mieć: listę kontaktów oraz nazwę grupy oraz uuid
  // Ma umożliwiać: zmianę nazwy grupy, można dodać lub usunac kontakt z grupy, można sprawdzić czy kontakt istnieje w grupie
  constructor(groupName) {
    Validator.validateString(groupName);
    this.id = idGenerator();
    this.name = groupName;
    this.groupContactList = [];
  }

  setName = (groupName) => {
    Validator.validateString(groupName);
    this.name = groupName;
  };

  addContact = (contact) => {
    // validate
    Validator.validateContact(contact);
    this.groupContactList.push(contact);
  };

  removeContact = (contact) => {
    Validator.validateContact(contact);

    if (!Validator.findByIdInArray(this.groupContactList, contact.id))
      throw new Error("User not found");

    this.groupContactList = this.groupContactList.filter(
      (el) => el.id !== contact.id
    );
  };

  isInGroup = (contact) => {
    Validator.validateContact(contact);
    console.log(contact.id);
    console.log(this.groupContactList);

    return Boolean(
      Validator.findByIdInArray(this.groupContactList, contact.id)
    );
  };
}

// *********************************************************
// *********************** ADDRESSBOOK *********************
// *********************************************************

class AddressBook {
  // Ma mieć: listę wszystkich kontaktów, listę grup kontaktów
  // Ma umożliwiać: szukanie kontaktu po frazie, dodawanie/usuwanie/modyfikacje nowych kontaktów, dodawanie/usuwanie/modyfikacje nowych grup
  constructor() {
    this.allContacts = [];
    this.allGroups = [];
  }

  findContactByPhrase = (phrase) => {
    Validator.validateString(phrase);
    const result = this.allContacts.filter((el) =>
      el.toString().toUpperCase().includes(phrase.toUpperCase())
    );
    return result;
  };

  //   Handle contacts

  addContactToList = (contact) => {
    Validator.validateContact(contact);
    this.allContacts.push(contact);
  };

  createNewContact = (contactObject) => {
    const newContact = new Contact(contactObject, idGenerator());
    this.addContactToList(newContact);
  };

  removeContactFromList = (contact) => {
    Validator.validateContact(contact);
    this.allContacts = this.allContacts.filter((el) => el.id !== contact.id);
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

    // if (key === "name") {
    //   contact.setName(newValue);
    // } else if (key === "surname") {
    //   contact.setSurname(newValue);
    // } else if (key === "email") {
    //   contact.setEmail(newValue);
    // } else {
    //   throw new Error("Invalid Key");
    // }
  };

  //   HANDLE GROUPS
  addGroupToList = (group) => {
    Validator.validateGroup(group);
    this.allGroups.push(group);
  };

  createNewGroup = (name) => {
    const newGroup = new Group(name);
    this.addGroupToList(newGroup);
  };

  setGroupName = (group, newName) => {
    Validator.validateGroup(group);
    Validator.validateString(newName);
    group.setName(newName);
  };
}

// VALIDATOR
class Validator {
  constructor() {}

  //   FIND USER BY ID
  //   ********
  static findByIdInArray = (array, id) => {
    const lookupArray = array.slice(0);

    const resultIndex = lookupArray.findIndex((el) => el.id === id);
    if (resultIndex >= 0) return true;
    return false;
  };

  static validateString = (value) => {
    if (typeof value == "string" && value.length > 0) {
      return true;
    }
    return false;
  };

  static validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  static validateDate = (date) => {
    const typeOfDate = Object.prototype.toString.call(date);
    // Validate input data type and assign birth year as string
    if (typeOfDate !== "[object String]" && typeOfDate !== "[object Date]") {
      throw new Error("Incorrect input type");
    }
    return true;
  };

  static validateNewUser = (name, surname, email) => {
    if (!this.validateString(name)) throw new Error("Invalid User Name");
    if (!this.validateString(surname)) throw new Error("Invalid User Surname");
    if (!this.validateEmail(email)) throw new Error("Invalid User Email");
  };

  static validateContact = (contact) => {
    if (!(contact instanceof Contact)) {
      throw new Error("Invalid Object Type");
    }
    return true;
  };

  static validateGroup = (group) => {
    if (!(group instanceof Group)) {
      throw new Error("Invalid Object Type");
    }
    return true;
  };

  static validateValueType = (value) => {
    if (
      this.validateDate(value) ||
      this.validateString(value) ||
      this.validateEmail(value)
    )
      return true;
    return false;
  };
}

// Helper functions
const idGenerator = () => {
  const numberId =
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36);
  return numberId;
};

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
console.log("CONTACT OBJECT");
console.log(contact);

testGroup.addContact(contact);
console.log(testGroup);
console.log(testGroup.isInGroup(contact));

testGroup.removeContact(contact);
console.log(testGroup.isInGroup(contact));
// console.log(testGroup);

console.log(contact.toString().includes(""));

testBook.addContactToList(contact);
console.log(testBook);
console.log(testBook.findContactByPhrase("john"));

testBook.modifyContact(contact, "surname", "TEST");
console.log(contact);

console.log(testGroup);
testBook.setGroupName(testGroup, "TEST-GROUP-NAME-OVERWRITE");
console.log(testGroup);

console.log(typeof contact);
console.log(Validator.validateContact(contact));
