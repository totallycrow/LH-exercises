"use strict";
// *********************************************************
// *********************** CONTACT *************************
// *********************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
class Contact {
    constructor(obj, id) {
        this.setModificationDate = (newDate) => {
            this.modificationDate = newDate;
        };
        this.setName = (name) => {
            this.name = name;
        };
        this.setSurname = (surname) => {
            this.surname = surname;
        };
        this.setEmail = (email) => {
            this.email = email;
        };
        this.toString = () => {
            const result = Object.values(this)
                .filter((el) => typeof el === "string" ||
                Object.prototype.toString.call(el) === "[object Date]")
                .join(" ");
            return result;
        };
        this.id = id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.email = obj.surname;
        this.creationDate = new Date();
        this.modificationDate = new Date();
    }
}
exports.Contact = Contact;
