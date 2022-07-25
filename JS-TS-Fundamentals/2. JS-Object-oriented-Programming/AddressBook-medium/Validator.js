// VALIDATOR
import Contact from "./classes/contact.js";
import Group from "./classes/group.js";

export default class Validator {
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
