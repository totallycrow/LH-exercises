// *********************************************************
// *********************** CONTACT *************************
// *********************************************************

import Validator from "../Validator.js";

export default class Contact {
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
}
